const { song: Song } = require("../db/models");
const {
  optionsGenerator,
  paginationGenerator,
  validateIdGenerator,
} = require("./utilities");
const router = require("express").Router();

const validateSongId = validateIdGenerator(
  Song,
  (id) => `Song with id ${id} not found!`
);
const optionsMiddleware = optionsGenerator(["title"]);
const paginationMiddlware = paginationGenerator(Song);

// get artist associated with given song id
router.get("/:id/artists", async (req, res, next) => {
  const songArtists = await Song.findByPk(req.params.id, {
    include: "artists",
  });
  res.status(200).json(songArtists);
});

// get song by song id
router.get("/:id", validateSongId, async (req, res, next) => {
  const song = await Song.findByPk(req.params.id);
  res.status(200).json(song);
});

// get all the songs
router.get(
  "/",
  optionsMiddleware,
  paginationMiddlware,
  async (req, res, next) => {
    const songs = await Song.findAll(req._options);
    res.status(200).json(songs);
  }
);

module.exports = {
  router,
};
