require("dotenv").config();
const validator = require("validator");
const path = require("path");
const { album: Album } = require("../db/models");
const { validateIdGenerator } = require("./utilities");

const router = require("express").Router();

const validateAlbumId = validateIdGenerator(
  Album,
  (id) => `Album with id ${id} not found!`
);

// get specified album images
router.get("/:id/image", validateAlbumId, async (req, res, next) => {
  const album = await Album.findByPk(
    parseInt(req.params.id, { attributes: ["image_path"] })
  );
  res.sendFile(path.join(process.env.IMAGE_DIR, album.image_path));
});

// get specified album
router.get("/:id", validateAlbumId, async (req, res, next) => {
  const album = await Album.findByPk(parseInt(req.params.id));
  res.json(album);
});

// get all the albums
router.get("/", async (req, res, next) => {
  const options = {};

  // pagination
  let { page, results } = req.query;
  let limit = 5;
  let offset = 0;

  if (Object.keys(req.query).includes("title")) {
    options["where"] = {
      title: req.query["title"],
    };
  }
  try {
    if (results) {
      if (validator.isInt(results)) {
        results = parseInt(results);
        if (results >= 1) {
          if (validator.isInt(page)) {
            page = parseInt(page);
            if (page > 0) {
              const count = await Album.count(options);
              if (page <= Math.ceil(count / results)) {
                limit = results;
                offset = (page - 1) * limit;

                options.limit = results;
                options.offset = offset;

                const albums = await Album.findAll(options);
                res.json(albums);
              } else {
                const err = new Error(
                  `page should be smaller than or equal to ${Math.ceil(
                    count / results
                  )}`
                );
                err.status = 404;
                next(err);
              }
            } else {
              const err = new Error(
                "page should be greater than or equal to 0"
              );
              err.status = 404;
              next(err);
            }
          } else {
            const err = new Error("page should be an integer");
            err.status = 404;
            next(err);
          }
        } else if (results + parseInt(page) === 0) {
          const albums = await Album.findAll(options);
          res.json(albums);
        } else {
          const err = new Error("results should be greater than or equal to 1");
          err.status = 404;
          next(err);
        }
      } else {
        const err = new Error("results should be an integer");
        err.status = 404;
        next(err);
      }
    } else {
      options.limit = limit;
      options.offset = offset;
      const albums = await Album.findAll(options);
      res.json(albums);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = {
  router,
};
