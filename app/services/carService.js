const carRepository = require("../repositories/carRepository");

module.exports = {
  create(requestBody) {
    return carRepository.create(requestBody);
  },

  update(id, requestBody) {
    return carRepository.update(id, requestBody);
  },

  isCarDeleted(id, requestBody) {
    return carRepository.isCarDeleted(id, requestBody);
  },

  delete(id) {
    return carRepository.delete(id);
  },

  async list(args) {
    try {
      const cars = await carRepository.findAll(args);
      const carCount = await carRepository.getTotalCar(args);

      return {
        data: cars,
        count: carCount,
      };
    } catch (err) {
      throw err;
    }
  },

  get(id) {
    return carRepository.find(id);
  },
};
