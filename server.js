require("dotenv").config();

const exp = require("constants");
const cors = require("cors");
const express = require("express");
const app = express();
const port = 3000;

app.use(cors());

app.use(express.static('public'));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

const correctiveRoutes = require("./routes/corrective");
app.use("/corrective", correctiveRoutes);

app.listen(port, () => {
  //   try {
  //     mysql
  //       .createConnection({
  //         host: process.env.DB_HOST,
  //         user: process.env.DB_USER,
  //         password: process.env.DB_PASS,
  //         database: "quality",
  //       })
  //       .connect();
  //     console.log(`Example app listening at http://localhost:${port}`);
  //   } catch (err) {
  //     console.log("Error connecting to Db");
  //     return;
  //   }
  console.log(`Example app listening at http://localhost:${port}`);
});
