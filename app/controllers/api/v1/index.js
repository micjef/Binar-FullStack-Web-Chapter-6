/**
 * @file contains entry point of controllers api v1 module
 * @author Fikri Rahmat Nurhidayat
 */

const userController = require("./userController");
const carController = require("./carController");

module.exports = {
  userController,
  carController,
};
