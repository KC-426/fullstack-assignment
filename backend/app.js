const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors')
require("dotenv").config();


const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);


const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");

const PORT = process.env.PORT || 3000;
const { MONGOD_URI } = process.env;

app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/post", postRoutes);

mongoose
  .connect(MONGOD_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
