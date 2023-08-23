require("dotenv").config();

const exp = require("constants");
const cors = require("cors");
const express = require("express");
const app = express();
const port = 3001;

app.use(cors());

app.use(express.static('public'));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

const expiryRoutes = require("./routes/expiry");
app.use("/expiry", expiryRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
