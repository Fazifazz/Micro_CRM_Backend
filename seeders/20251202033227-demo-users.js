'use strict'
import bcrypt from 'bcrypt'

export default {
  async up(queryInterface, Sequelize) {
    const passwordHash = await bcrypt.hash('12345678', 10)

    await queryInterface.bulkInsert('Users', [
      {
        id: 1,
        name: 'Admin CodeAc',
        email: 'admin@codeac.com',
        password_hash: passwordHash,
        org_id: 1,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: 'CRM Manager',
        email: 'manager@microcrm.com',
        role: 'member',
        password_hash: passwordHash,
        org_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: 'Tester Fasil',
        email: 'fasil@testcorp.in',
        password_hash: passwordHash,
        org_id: 3,
        role: 'member',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
  },
}
