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

router.get("/", (req, res, next) => {
  res.send("We are inside the artist router");
});

module.exports = {
  router,
};
