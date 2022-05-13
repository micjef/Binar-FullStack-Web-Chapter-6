/**
 * @file contains request handler of post resource
 * @author Fikri Rahmat Nurhidayat
 */
const carService = require("../../../services/carService");

module.exports = {
  list(req, res) {
    carService
      .list({
        where: { isDeleted: false },
      })
      .then(({ data, count }) => {
        res.status(200).json({
          status: "OK",
          data: { cars: data },
          meta: { total: count },
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  listArgs(args) {
    return async (req, res) => {
      carService
        .list(args)
        .then(({ data, count }) => {
          res.status(200).json({
            status: "OK",
            data: { cars: data },
            meta: { total: count },
          });
        })
        .catch((err) => {
          res.status(400).json({
            status: "FAIL",
            message: err.message,
          });
        });
    };
  },

  create(req, res) {
    console.log(req.body);
    req.body.createdBy = req.user.username;
    carService
      .create(req.body)
      .then((car) => {
        res.status(201).json({
          status: "OK",
          message: `Successfully created new car by ${req.user.username}`,
          data: car,
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  update(req, res) {
    console.log(req.user);
    req.body.updatedBy = req.user.username;
    carService
      .update(req.params.id, req.body)
      .then(() => {
        res.status(200).json({
          status: "OK",
          message: `Successfully updated car by ${req.user.username}`,
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  show(req, res) {
    carService
      .get(req.params.id)
      .then((post) => {
        res.status(200).json({
          status: "OK",
          data: post,
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  makeCarDeleted(req, res) {
    carService
      .isCarDeleted(req.params.id, {
        isDeleted: true,
        deletedBy: req.user.username,
      })
      .then((car) => {
        res.status(200).json({
          deletedBy: req.user.username,
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },
};
