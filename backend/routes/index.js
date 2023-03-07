const router = require("express").Router();
const { router: loginRouter } = require("./loginRouter");
const { router: signupRouter } = require("./signupRouter");

router.use("/login", loginRouter);
router.use("/signup", signupRouter);

module.exports = {
  router,
};
