const validator = require("validator");
const { album: Album } = require("../db/models");
const router = require("express").Router();

async function validateId(req, res, next) {
  const { id } = req.params;
  if (!validator.isInt(id)) {
    const err = new Error("Route parameter id should be an integer!");
    err.status = 404;
    next(err);
  } else {
    const album = await Album.findByPk(parseInt(id));
    if (!album) {
      const err = new Error(`Album with id ${id} not found!`);
      err.status = 404;
      next(err);
    }
    res.album = album;
    next();
  }
}

// get specified album
router.get("/:id", validateId, async (req, res, next) => {
  res.json(res.album);
});

// get all the albums
router.get("/", async (req, res, next) => {
  const options = {};

  if (Object.keys(req.query).includes("title")) {
    options["where"] = {
      title: req.query["title"],
    };
  }
  try {
    const albums = await Album.findAll(options);
    res.json(albums);
  } catch (err) {
    next(err);
  }
});

module.exports = {
  router,
};
