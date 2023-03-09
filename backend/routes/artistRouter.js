const { artist: Artist } = require("../db/models");
const { validateIdGenerator } = require("./utilities");

const router = require("express").Router();

// validation middleware
const validateArtistId = validateIdGenerator(
  Artist,
  (id) => `Artist with id ${id} not found!`
);

router.get("/:id", validateArtistId, async (req, res, next) => {
  const { id } = req.params;
  const artist = await Artist.findByPk(id);
  res.json(artist);
});

router.get("/", async (req, res, next) => {
  const artists = await Artist.findAll();
  res.json(artists);
});

module.exports = {
  router,
};
