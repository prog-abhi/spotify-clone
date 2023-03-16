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

// get all songs associated with a given artist
router.get("/:id/songs", validateArtistId, async (req, res, next) => {
  const artistSongs = await Artist.findByPk(req.params.id, {
    include: ["songs"],
  });
  res.status(200).json(artistSongs);
});

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

    res.status(200).json(artists);
  }
);

module.exports = {
  router,
};
