const router = require("express").Router();
const { router: loginRouter } = require("./loginRouter");
const { router: signupRouter } = require("./signupRouter");
const { router: albumRouter } = require("./albumRouter");

router.use("/login", loginRouter);
router.use("/signup", signupRouter);
router.use("/albums", albumRouter);

module.exports = {
  router,
};
