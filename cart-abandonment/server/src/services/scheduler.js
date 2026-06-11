const cartRepository = require('../repositories/cartRepository');
const { EmailLog } = require('../models');

const checkAndProcessAbandonedCarts = async () => {
  try {
    // 2 minutes threshold for POC cart abandonment
    const thresholdMinutes = 2;
    const inactiveCarts = await cartRepository.getInactiveCartsToAbandon(thresholdMinutes);

    if (inactiveCarts.length === 0) {
      return;
    }

    console.log(`[SCHEDULER] Found ${inactiveCarts.length} inactive carts eligible for abandonment.`);

    for (const cart of inactiveCarts) {
      try {
        // 1. Promote cart status to 'abandoned'
        await cartRepository.updateCartStatus(cart.id, 'abandoned');
        console.log(`[SCHEDULER] Cart ID ${cart.id} promoted to 'abandoned' due to inactivity.`);

        // 2. Check if recovery email has already been sent
        const existingLog = await EmailLog.findOne({
          where: { cartId: cart.id }
        });

        if (existingLog) {
          console.log(`[SCHEDULER] Skip Email: Cart ID ${cart.id} already has a reminder log (Status: ${existingLog.status}).`);
          continue;
        }

        // Create a pending EmailLog record
        const emailLog = await EmailLog.create({
          cartId: cart.id,
          recipientEmail: cart.email,
          status: 'pending'
        });

        // 3. Compile email body
        let itemsSummary = '';
        let subtotal = 0;
        cart.items.forEach(item => {
          const name = item.product ? item.product.name : 'Unknown Product';
          const price = item.product ? parseFloat(item.product.price) : 0;
          const total = price * item.quantity;
          subtotal += total;
          itemsSummary += `  - ${name} (Qty: ${item.quantity}) - $${price.toFixed(2)} each (Subtotal: $${total.toFixed(2)})\n`;
        });

        const recoveryUrl = `http://localhost:5173/checkout?cartId=${cart.id}`;

        const emailHeader = `==========================================================\n` +
                            `✉️  ABANDONED CART REMINDER EMAIL (SIMULATED)\n` +
                            `==========================================================\n` +
                            `To:      ${cart.email}\n` +
                            `Subject: Complete your purchase at VibeShop!\n` +
                            `----------------------------------------------------------\n`;

        const emailBody = `Hello,\n\n` +
                          `We noticed you left some items in your shopping cart. Don't miss out on these great products!\n\n` +
                          `Your Cart Items:\n` +
                          `${itemsSummary}\n` +
                          `Total Cart Value: $${subtotal.toFixed(2)}\n\n` +
                          `👉 Resume your checkout here: ${recoveryUrl}\n\n` +
                          `Thank you for shopping with VibeShop!\n`;

        const emailFooter = `==========================================================`;

        // Output email to server logs/stdout
        console.log(`\n${emailHeader}${emailBody}${emailFooter}\n`);

        // 4. Update EmailLog status to 'sent'
        emailLog.status = 'sent';
        emailLog.sentAt = new Date();
        await emailLog.save();

        console.log(`[SCHEDULER] Email sent log updated successfully for Cart ID ${cart.id}.`);
      } catch (innerError) {
        console.error(`[SCHEDULER ERROR] Failed to process Cart ID ${cart.id}: ${innerError.message}`);
        // Log failure in EmailLog if possible
        try {
          await EmailLog.create({
            cartId: cart.id,
            recipientEmail: cart.email,
            status: 'failed'
          });
        } catch (dbLogErr) {
          console.error(`[SCHEDULER ERROR] Failed to record failure log: ${dbLogErr.message}`);
        }
      }
    }
  } catch (error) {
    console.error(`[SCHEDULER CRITICAL ERROR] Execution failed: ${error.stack || error.message}`);
  }
};

const startScheduler = () => {
  // Execute checks every 10 seconds for rapid POC testing/feedback loop
  console.log('[SCHEDULER] Initializing 10-second background checker loop...');
  setInterval(checkAndProcessAbandonedCarts, 10000);
};

module.exports = {
  startScheduler
};
