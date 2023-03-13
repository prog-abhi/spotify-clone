const validator = require("validator");
const { artist: Artist } = require("../db/models");
const {
  validateIdGenerator,
  optionsGenerator,
  paginationGenerator,
} = require("./utilities");

const router = require("express").Router();

// validation middleware
const validateArtistId = validateIdGenerator(
  Artist,
  (id) => `Artist with id ${id} not found!`
);

const optionsMiddleware = optionsGenerator(["first_name", "last_name"]);

const paginationMiddlware = paginationGenerator(Artist);

router.get("/:id", validateArtistId, async (req, res, next) => {
  const { id } = req.params;
  const artist = await Artist.findByPk(id);
  res.json(artist);
});

router.get(
  "/",
  optionsMiddleware,
  paginationMiddlware,
  async (req, res, next) => {
    const { _options: options } = req;

    const artists = await Artist.findAll(options);

    res.json(artists);
  }
);

module.exports = {
  router,
};
