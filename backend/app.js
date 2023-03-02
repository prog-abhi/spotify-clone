require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

const port = process.env.PORT || 5000;

const app = express();

app.use(morgan("dev", "tiny"));

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "Accepted",
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
