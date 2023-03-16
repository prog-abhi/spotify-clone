require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const csurf = require("csurf");
const cors = require("cors");

const { router } = require("./routes");
const e = require("express");

const port = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === "production";

const app = express();

app.use(cookieParser());
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "lax",
      httpOnly: true,
    },
  })
);
if (!isProduction) app.use(cors());

app.use(morgan("dev", "tiny"));
app.use(express.json());

app.get("/", (req, res) => {
  res.cookie("XSRF-TOKEN", req.csrfToken());
  res.json({
    status: "Accepted",
  });
});

app.use("/api", router);

app.use((req, res, next) => {
  const err = new Error("Invalid endpoint!");
  err.status = 402;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    status: "Error",
    msg: Array.isArray(err)
      ? err.map((e) => e.message).join("\n")
      : err.message,
    stack: !isProduction
      ? Array.isArray(err)
        ? err.map((e) => e.stack).join("\n")
        : err.stack
      : null,
  });
});

// app.listen(port, () => {
//   console.log(`Server is listening on port ${port}`);
// });
module.exports = app;
