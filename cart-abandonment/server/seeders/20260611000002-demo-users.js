const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const salt = await bcrypt.genSalt(10);
    const adminPasswordHash = await bcrypt.hash('admin123', salt);
    const shopperPasswordHash = await bcrypt.hash('shopper123', salt);

    await queryInterface.bulkInsert('users', [
      {
        email: 'admin@vibeshop.com',
        password: adminPasswordHash,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'customer@test.com',
        password: shopperPasswordHash,
        role: 'shopper',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
