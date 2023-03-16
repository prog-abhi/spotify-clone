const { playlist: Playlist } = require("../db/models");
const {
  validateIdGenerator,
  optionsGenerator,
  paginationGenerator,
} = require("./utilities");
const router = require("express").Router();

const validateId = validateIdGenerator(
  Playlist,
  (id) => `Playlist with id ${id} not found!`
);
const optionsMiddleware = optionsGenerator(["title"]);
const paginationMiddleware = paginationGenerator(Playlist);

// get all the songs of a given playlist
router.get("/:id/songs", async (req, res, next) => {
  const playlistSongs = await Playlist.findByPk(req.params.id, {
    include: "songs",
  });
  res.status(200).json(playlistSongs);
});

router.get("/:id", validateId, async (req, res, next) => {
  const playlist = await Playlist.findByPk(req.params.id);
  res.json(playlist);
});

router.get(
  "/",
  optionsMiddleware,
  paginationMiddleware,
  async (req, res, next) => {
    const { _options: options } = req;
    const playlists = await Playlist.findAll(options);
    res.json(playlists);
  }
);

module.exports = {
  router,
};
