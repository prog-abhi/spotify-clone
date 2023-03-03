require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const csurf = require("csurf");
const cors = require("cors");

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

app.get("/index", (req, res) => {
  res.send("Can't see me!");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
