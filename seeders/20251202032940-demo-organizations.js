'use strict'

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Organizations', [
      {
        id: 1,
        name: 'CodeAc Technologies',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: 'Micro CRM Pvt Ltd',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: 'Fasil Test Corp',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Organizations', null, {})
  },
}
