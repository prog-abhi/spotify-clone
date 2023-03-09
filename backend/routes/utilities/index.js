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

module.exports = {
  validateIdGenerator,
};
