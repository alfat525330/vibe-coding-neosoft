module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('products', [
      {
        name: 'VibeBeam Wireless Headphones',
        description: 'High fidelity sound with hybrid active noise cancellation, comfort ear cushions, and 40-hour battery life.',
        price: 99.99,
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'VibeChron Smart Watch',
        description: 'Fitness tracking, heart rate monitor, sleep analysis, built-in GPS, and seamless integration with iOS & Android.',
        price: 199.99,
        imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'VibeBoom Bluetooth Speaker',
        description: 'IPX7 waterproof portable speaker with 360-degree surrounding sound, rich bass, and 12-hour continuous playtime.',
        price: 49.99,
        imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop&q=60',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Classic Leather Wallet',
        description: 'Handcrafted premium full-grain leather wallet with RFID blocking, slim design, and 8 card slots.',
        price: 29.99,
        imageUrl: 'https://images.unsplash.com/photo-1627124118304-728b49525e86?w=500&auto=format&fit=crop&q=60',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'VibeOptics Sunglasses',
        description: 'Polarized scratch-resistant designer sunglasses offering 100% UV protection and dynamic aesthetics.',
        price: 120.00,
        imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&auto=format&fit=crop&q=60',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('products', null, {});
  }
};
