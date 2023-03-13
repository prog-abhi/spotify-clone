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
