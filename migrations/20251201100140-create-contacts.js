'use strict'
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Contacts', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      org_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Organizations', key: 'id' },
      },
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      phone: Sequelize.STRING,
      notes: Sequelize.TEXT,
      created_by: {
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' },
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Contacts')
  },
}
