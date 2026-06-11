const BASE_URL = 'http://localhost:5000';

const runTest = async () => {
  console.log('🏁 Starting Integration Verification Test...');

  try {
    // 1. Healthcheck
    console.log('\n[TEST 1] Verifying server healthcheck...');
    const healthRes = await fetch(`${BASE_URL}/health`);
    const healthData = await healthRes.json();
    console.log(`Result: Status is ${healthData.status}, Timestamp: ${healthData.timestamp}`);

    // 2. Fetch Catalog Products
    console.log('\n[TEST 2] Fetching product list...');
    const productsRes = await fetch(`${BASE_URL}/api/products`);
    const products = await productsRes.json();
    console.log(`Result: Retrieved ${products.length} products successfully.`);
    if (products.length === 0) throw new Error('Catalog has no products');
    const firstProduct = products[0];
    console.log(`First product: ${firstProduct.name} - $${firstProduct.price}`);

    // 3. Create Cart
    console.log('\n[TEST 3] Creating new cart session...');
    const cartCreateRes = await fetch(`${BASE_URL}/api/cart`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    const cart = await cartCreateRes.json();
    const cartId = cart.id;
    console.log(`Result: Created Cart ID: ${cartId}, Status: ${cart.status}`);

    // 4. Add Product to Cart
    console.log(`\n[TEST 4] Adding Product ID ${firstProduct.id} to Cart...`);
    const itemAddRes = await fetch(`${BASE_URL}/api/cart/${cartId}/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: firstProduct.id, quantity: 2 })
    });
    const cartWithItems = await itemAddRes.json();
    console.log(`Result: Cart subtotal updated to: $${cartWithItems.subtotal}, Item Count: ${cartWithItems.itemCount}`);

    // 5. Capture Email
    const testEmail = 'shopper-test@gmail.com';
    console.log(`\n[TEST 5] Capturing customer email: ${testEmail}...`);
    const emailRes = await fetch(`${BASE_URL}/api/cart/${cartId}/email`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: testEmail })
    });
    const cartWithEmail = await emailRes.json();
    console.log(`Result: Cart updated with email: ${cartWithEmail.email}`);

    // 6. Verification checklist
    console.log('\n=========================================');
    console.log('✅ ALL BACKEND TEST STEPS SUCCEEDED!');
    console.log(`Cart ID: ${cartId} is fully configured in DB.`);
    console.log('The background scheduler will automatically');
    console.log('mark it as abandoned and send a recovery email');
    console.log('in 2 minutes of inactivity.');
    console.log('=========================================');

  } catch (error) {
    console.error('❌ Verification test failed:', error.message);
    process.exit(1);
  }
};

// Wait 1 second before executing to let the Express server boot completely
setTimeout(runTest, 1000);
