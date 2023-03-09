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

  // pagination
  let { page, results } = req.query;
  page = parseInt(page);
  results = parseInt(results);
  let limit = 5;
  let offset = 0;

  if (Object.keys(req.query).includes("title")) {
    options["where"] = {
      title: req.query["title"],
    };
  }
  try {
    if (results) {
      if (results >= 1) {
        if (page) {
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
            const err = new Error("page should be greater than or equal to 0");
            err.status = 404;
            next(err);
          }
        } else {
          const err = new Error("page should be an integer");
          err.status = 404;
          next(err);
        }
      } else if (results * page === 0) {
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
  } catch (err) {
    next(err);
  }
});

module.exports = {
  router,
};
