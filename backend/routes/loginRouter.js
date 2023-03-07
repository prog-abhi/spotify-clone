const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.send("Inside the login router");
});

module.exports = {
  router,
};
