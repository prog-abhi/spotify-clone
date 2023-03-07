const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.send("Inside the signup router");
});

module.exports = {
  router,
};
