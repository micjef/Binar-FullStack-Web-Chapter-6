"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "superadmin",
          email: "superadmin@gmail.com",
          password: "$2a$10$1RoTie8npGjLfy9DfID2Ou6wnwDrT.PpTOhq./5jzay2E7Z3ncxZK",
          role: "superadmin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "admin",
          email: "admin@gmail.com",
          password: "$2a$10$/fdwwuwSXkyl7mZt4okLM.CyqliPZFnJqYcb9wgDdupPOJV3NmKmK",
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "yuneda",
          email: "yuneda@gmail.com",
          password: "$2a$10$HETRBTPhM7.MbGBncNhkFelv4z9gl/jQ.shVrsZeq1n4qp4dL51oO",
          role: "member",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
