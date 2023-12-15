'use strict'
const bcrypt = require('bcryptjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash('secret123', salt)

    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'admin',
        lastName: 'admin',
        email: 'admin@admin.com',
        password: hashed,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
  },
}
