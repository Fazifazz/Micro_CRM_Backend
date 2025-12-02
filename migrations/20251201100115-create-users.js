'use strict'
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      org_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Organizations', key: 'id' },
      },
      name: Sequelize.STRING,
      email: { type: Sequelize.STRING, unique: true },
      password_hash: Sequelize.STRING,
      role: Sequelize.ENUM('admin', 'member'),
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Users')
  },
}
