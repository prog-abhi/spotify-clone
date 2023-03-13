require("dotenv").config();
const validator = require("validator");
const path = require("path");
const { album: Album } = require("../db/models");
const {
  validateIdGenerator,
  optionsGenerator,
  paginationGenerator,
} = require("./utilities");

const router = require("express").Router();

const validateAlbumId = validateIdGenerator(
  Album,
  (id) => `Album with id ${id} not found!`
);

const optionsMiddleware = optionsGenerator(["title"]);

const paginationMiddleware = paginationGenerator(Album);

// get specified album images
router.get("/:id/image", validateAlbumId, async (req, res, next) => {
  const album = await Album.findByPk(
    parseInt(req.params.id, { attributes: ["image_path"] })
  );
  res.sendFile(path.join(process.env.IMAGE_DIR, album.image_path));
});

// get specified album
router.get("/:id", validateAlbumId, async (req, res, next) => {
  const album = await Album.findByPk(req.params.id);
  res.json(album);
});

// get all the albums
router.get(
  "/",
  optionsMiddleware,
  paginationMiddleware,
  async (req, res, next) => {
    const { _options: options } = req;
    const albums = await Album.findAll(options);
    res.json(albums);
  }
);

module.exports = {
  router,
};
