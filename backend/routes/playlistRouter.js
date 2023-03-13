const { playlist: Playlist } = require("../db/models");
const router = require("express").Router();

router.get("/", async (req, res, next) => {
  const playlists = await Playlist.findAll();
  res.json(playlists);
});

module.exports = {
  router,
};
