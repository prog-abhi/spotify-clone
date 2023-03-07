const { Op } = require("sequelize");
const { user: User } = require("../db/models");

const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.send("Inside the login router");
});

router.post("/", async (req, res, next) => {
  const { credential, password } = req.body;
  try {
    const userObj = await User.findOne({
      where: {
        [Op.or]: [{ username: credential }, { email: credential }],
      },
    });
    if (!userObj) {
      const err = new Error("user doesn't exist!");
      err.status = 404;
      throw err;
    } else {
      if (!User.checkPassword(password, userObj.hashed_password)) {
        const err = new Error("Wrong password!");
        err.status = 404;
        throw err;
      } else {
        res.json(userObj);
      }
    }
  } catch (error) {
    next(error);
  }
});

module.exports = {
  router,
};
