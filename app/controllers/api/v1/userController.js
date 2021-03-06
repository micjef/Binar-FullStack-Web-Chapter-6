/**
 * @file contains request handler of post resource
 * @author Michael Jeffry Setiawan
 */
require("dotenv").config();
const fs = require("fs");
const userService = require("../../../services/userService");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../../../models");
const SALT = 10;

function encryptPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, SALT, (err, encryptedPassword) => {
      if (!!err) {
        reject(err);
        return;
      }

      resolve(encryptedPassword);
    });
  });
}

function checkPassword(encryptedPassword, password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, encryptedPassword, (err, isPasswordCorrect) => {
      if (!!err) {
        reject(err);
        return;
      }

      resolve(isPasswordCorrect);
    });
  });
}

function createToken(payload) {
  return jwt.sign(payload, process.env.JWT_SIGNATURE_KEY || "Rahasia", {
    // expiresIn: "10h" // it will be expired after 10 hours
    //expiresIn: "20d" // it will be expired after 20 days
    //expiresIn: 120 // it will be expired after 120ms
    expiresIn: "12h", // it will be expired after 10 hours
  });
}

module.exports = {
  async register(req, res) {
    const { username, email } = req.body;
    const password = await encryptPassword(req.body.password);
    userService
      .create({ username, email, password })
      .then((user) => {
        res.status(201).json({
          id: user.id,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        });
      })
      .catch((err) => {
        res.status(409).json({
          status: "Failed",
          message: err.message,
        });
      });
  },

  async login(req, res) {
    const email = req.body.email.toLowerCase(); // Biar case insensitive
    const password = req.body.password;

    const user = await userService.get({
      where: { email },
    });

    if (!user) {
      res.status(404).json({ message: "Email tidak ditemukan" });
      return;
    }

    const isPasswordCorrect = await checkPassword(user.password, password);

    if (!isPasswordCorrect) {
      res.status(401).json({ message: "Password salah!" });
      return;
    }

    const token = createToken({
      id: user.id,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });

    // fs.readFile("./data/token.json", (err, data) => {
    //   if (err) throw err;
    //   let student = JSON.parse(data);
    //   console.log(student.jwt);
    // });

    // let inputFile = {
    //   jwt: token,
    // };
    // inputFile = JSON.stringify(inputFile);
    // fs.writeFile("./data/token.json", inputFile, (err) => {
    //   if (err) console.log(err);
    //   else {
    //     console.log("File written successfully\n");
    //     console.log("The written has the following contents:");
    //     console.log(fs.readFileSync("./data/token.json", "utf8"));
    //   }
    // });

    res.status(201).json({
      id: user.id,
      email: user.email,
      token,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  },

  async whoAmI(req, res) {
    req.user.password = undefined;
    res.status(200).json(req.user);
  },

  async authorize(req, res, next) {
    console.log("req.headers :");
    console.log(req.headers.authorization);
    try {
      const bearerToken = req.headers.authorization;
      const token = bearerToken.split("Bearer ")[1];
      const tokenPayload = jwt.verify(
        token,
        process.env.JWT_SIGNATURE_KEY || "Rahasia"
      );
      console.log("token payload :");
      console.log(tokenPayload);
      req.user = await User.findByPk(tokenPayload.id);
      next();
    } catch (err) {
      console.error(err);
      res.status(401).json({
        message: "Unauthorized",
      });
    }
  },

  list(req, res) {
    userService
      .list()
      .then(({ data, count }) => {
        res.status(200).json({
          status: "OK",
          data: { users: data },
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

  create(req, res) {
    userService
      .create(req.body)
      .then((user) => {
        res.status(201).json({
          status: "OK",
          data: user,
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
    if (req.params.id == "1") {
      console.log("You cant change superadmin");
      res.status(422).json({
        status: "FAIL",
        message: "You cant change superadmin",
      });
      return;
    }
    req.body.role = "admin";
    userService
      .update(req.params.id, req.body)
      .then((user) => {
        console.log(user);
        res.status(200).json({
          status: "OK",
          message: "Berhasil mengubah member ke admin",
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
    userService
      .get(req.params.id)
      .then((user) => {
        res.status(200).json({
          status: "OK",
          data: user,
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  destroy(req, res) {
    userService
      .delete(req.params.id)
      .then(() => {
        res.status(204).end();
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },
};
