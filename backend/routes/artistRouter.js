const validator = require("validator");
const { artist: Artist } = require("../db/models");
const { validateIdGenerator } = require("./utilities");

const router = require("express").Router();

// validation middleware
const validateArtistId = validateIdGenerator(
  Artist,
  (id) => `Artist with id ${id} not found!`
);

const optionsMiddleware = async function (req, res, next) {
  const where = {};
  const queryKeys = Object.keys(req.query);
  if (queryKeys.includes("first_name")) {
    where.first_name = req.query["first_name"];
  }
  if (queryKeys.includes("last_name")) {
    where.last_name = req.query["last_name"];
  }
  req._options = { where };
  next();
};

const paginationMiddlware = async function (req, res, next) {
  let limit = 5;
  let offset = 0;
  const queryKeys = Object.keys(req.query);
  const errorArray = [];
  const createErrorAndPushToArray = function (msg) {
    const err = new Error(msg);
    err.status = 404;
    errorArray.push(err);
  };

  if (queryKeys.includes("results")) {
    if (validator.isInt(req.query.results)) {
      results = parseInt(req.query.results);
      if (results >= 1) {
        if (validator.isInt(req.query.page)) {
          page = parseInt(req.query.page);
          if (page > 0) {
            const count = await Artist.count(req.options);
            if (page <= Math.ceil(count / results)) {
              limit = results;
              offset = (page - 1) * limit;
            } else {
              createErrorAndPushToArray(
                `page should be smaller than or equal to ${Math.ceil(
                  count / results
                )}`
              );
            }
          } else {
            createErrorAndPushToArray(
              "page should be greater than or equal to 0"
            );
          }
        } else {
          createErrorAndPushToArray(
            "page should be present with results with int value"
          );
        }
      } else if (results == 0) {
        if (validator.isInt(req.query.page)) {
          if (req.query.page == 0) {
            limit = offset = null;
          } else {
            createErrorAndPushToArray(
              "when results is 0 page should also be 0"
            );
          }
        } else {
          createErrorAndPushToArray("page should be an int!");
        }
      } else {
        createErrorAndPushToArray(
          "result should be greater than or equal to 1."
        );
      }
    } else {
      createErrorAndPushToArray("result should be an integer!");
    }
  }

  if (errorArray.length > 0) {
    next(errorArray);
  }

  req._options["limit"] = limit;
  req._options["offset"] = offset;
  next();
};

router.get("/:id", validateArtistId, async (req, res, next) => {
  const { id } = req.params;
  const artist = await Artist.findByPk(id);
  res.json(artist);
});

router.get(
  "/",
  optionsMiddleware,
  paginationMiddlware,
  async (req, res, next) => {
    const { _options: options } = req;

    const artists = await Artist.findAll(options);

    res.json(artists);
  }
);

module.exports = {
  router,
};
