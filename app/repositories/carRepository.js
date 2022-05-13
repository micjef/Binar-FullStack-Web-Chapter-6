const { Car } = require("../models");

module.exports = {
  create(createArgs) {
    return Car.create(createArgs);
  },

  update(id, updateArgs) {
    return Car.update(updateArgs, {
      where: {
        id,
      },
    });
  },

  isCarDeleted(id, updateArgs) {
    return Car.update(updateArgs, {
      where: {
        id,
      },
    });
  },

  delete(id) {
    return Car.destroy({
      where: {
        id,
      },
    });
  },

  find(id) {
    return Car.findOne({
      where: {
        id,
      },
    });
  },

  findAll(args) {
    return Car.findAll(args);
  },

  getTotalCar(args) {
    return Car.count(args);
  },
};
