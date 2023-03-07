const { user: User } = require("../db/models");
const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.send("Inside the signup router");
});

router.post("/", async (req, res, next) => {
  const { username, first_name, last_name, email, password } = req.body;
  try {
    const hashed_password = User.generateHashpassword(password);

    const userObj = await User.build({
      username,
      first_name,
      last_name,
      email,
      hashed_password,
    });

    await userObj.validate();

    await userObj.save();

    res.json({
      status: "Success",
      msg: "New user added",
      user: userObj.toJSON(),
    });
  } catch (error) {
    error.status = 401;
    next(error);
  }
});

module.exports = {
  router,
};
