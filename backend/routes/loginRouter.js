const { Op } = require("sequelize");
const asyncHandler = require("express-async-handler");
const { user: User } = require("../db/models");

const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.send("Inside the login router");
});

router.post(
  "/",
  asyncHandler(async (req, res, next) => {
    const { credential, password } = req.body;
    const user = await User.login({ credential, password });

    return res.json({
      user,
    });
  })
);

module.exports = {
  router,
};
