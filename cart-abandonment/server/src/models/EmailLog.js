const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const EmailLog = sequelize.define('EmailLog', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  cartId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  recipientEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pending',
    validate: {
      isIn: [['pending', 'sent', 'failed']]
    }
  },
  sentAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'email_logs',
  timestamps: true
});

module.exports = EmailLog;
