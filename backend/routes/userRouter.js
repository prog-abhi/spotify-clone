const { user: User } = require("../db/models");
const {
  validateIdGenerator,
  optionsGenerator,
  paginationGenerator,
} = require("./utilities");
const router = require("express").Router();

const validateId = validateIdGenerator(
  User,
  (id) => `user with id ${id} not found!`
);

const optionsMiddleware = optionsGenerator([
  "username",
  "first_name",
  "last_name",
]);

const paginationMiddleware = paginationGenerator(User);

router.get("/:id", validateId, async (req, res, next) => {
  const user = await User.findByPk(req.params.id);
  res.json(user);
});

router.get(
  "/",
  optionsMiddleware,
  paginationMiddleware,
  async (req, res, next) => {
    const { _options: options } = req;
    const users = await User.findAll(options);
    res.json(users);
  }
);

module.exports = {
  router,
};
