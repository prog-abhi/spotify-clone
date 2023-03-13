const router = require("express").Router();
const { router: loginRouter } = require("./loginRouter");
const { router: signupRouter } = require("./signupRouter");
const { router: albumRouter } = require("./albumRouter");
const { router: artistRouter } = require("./artistRouter");
const { router: playlistRouter } = require("./playlistRouter");
const { router: userRouter } = require("./userRouter");

router.use("/login", loginRouter);
router.use("/signup", signupRouter);
router.use("/albums", albumRouter);
router.use("/artists", artistRouter);
router.use("/playlists", playlistRouter);
router.use("/users", userRouter);

module.exports = {
  router,
};
