const { user: User } = require("../db/models");
const asyncHandler = require("express-async-handler");
const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.send("Inside the signup router");
});

router.post(
  "/",
  asyncHandler(async (req, res, next) => {
    const { username, first_name, last_name, email, password } = req.body;

    const response = await User.signup({
      username,
      first_name,
      last_name,
      email,
      password,
    });

    return res.json(response);
  })
);

module.exports = {
  router,
};
