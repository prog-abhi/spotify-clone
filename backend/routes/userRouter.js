const { user: User } = require("../db/models");
const router = require("express").Router();

router.get("/", async (req, res, next) => {
  res.json(await User.findAll());
});

module.exports = {
  router,
};
