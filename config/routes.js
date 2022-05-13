const express = require("express");
const res = require("express/lib/response");
const controllers = require("../app/controllers");
const apiRouter = express.Router();

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../data/swagger.json");

/**
 * TODO: Implement your own API
 *       implementations
 */

// login as superadmin, admin, or member
apiRouter.post("/api/v1/login", controllers.api.v1.userController.login);

// add admin by superadmin only
apiRouter.put(
  "/api/v1/users/:id",
  controllers.api.v1.userController.authorize,
  controllers.api.v1.userController.isSuperAdmin,
  controllers.api.v1.userController.update
);

// register as member
apiRouter.post("/api/v1/register", controllers.api.v1.userController.register);

// whoami
apiRouter.get("/api/v1/whoami", controllers.api.v1.userController.authorize, controllers.api.v1.userController.whoAmI);

// create car by admin or superadmin
apiRouter.post(
  "/api/v1/cars",
  controllers.api.v1.userController.authorize,
  controllers.api.v1.userController.isAdminOrSuperAdmin,
  controllers.api.v1.carController.create
);

// read one car by admin or superadmin
apiRouter.get(
  "/api/v1/cars/:id",
  controllers.api.v1.userController.authorize,
  controllers.api.v1.userController.isAdminOrSuperAdmin,
  controllers.api.v1.carController.show
);

// update car by admin or superadmin
apiRouter.put(
  "/api/v1/cars/:id",
  controllers.api.v1.userController.authorize,
  controllers.api.v1.userController.isAdminOrSuperAdmin,
  controllers.api.v1.carController.update
);

// delete car by admin or superadmin
apiRouter.delete(
  "/api/v1/cars/:id",
  controllers.api.v1.userController.authorize,
  controllers.api.v1.userController.isAdminOrSuperAdmin,
  controllers.api.v1.carController.makeCarDeleted
);

// read all car
apiRouter.get("/api/v1/cars", controllers.api.v1.carController.list);

// open api document
apiRouter.use("/api-docs", swaggerUi.serve);
apiRouter.get("/api-docs", swaggerUi.setup(swaggerDocument));

/**
 * TODO: Delete this, this is just a demonstration of
 *       error handler
 */
apiRouter.get("/api/v1/errors", () => {
  throw new Error("The Industrial Revolution and its consequences have been a disaster for the human race.");
});

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;
