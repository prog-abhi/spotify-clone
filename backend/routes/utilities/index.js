const validator = require("validator");

function validateIdGenerator(model, errorCb) {
  return async (req, res, next) => {
    const { id } = req.params;
    if (!validator.isInt(id)) {
      const err = new Error("Route parameter id should be an integer!");
      err.status = 404;
      next(err);
    } else {
      const Obj = await model.findByPk(parseInt(id));
      if (!Obj) {
        const err = new Error(errorCb(id));
        err.status = 404;
        next(err);
      }
      next();
    }
  };
}

function optionsGenerator(queries) {
  return (req, res, next) => {
    const where = {};
    const queryKeys = Object.keys(req.query);

    queries.forEach((query) => {
      if (queryKeys.includes(query)) {
        where[query] = req.query[query];
      }
    });

    req._options = { where };
    next();
  };
}

function paginationGenerator(model) {
  return async (req, res, next) => {
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
              const count = await model.count(req.options);
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
}

module.exports = {
  validateIdGenerator,
  optionsGenerator,
  paginationGenerator,
};
