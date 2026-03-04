require('dotenv').config();
const express = require("express");
const commonMiddlewares = require("./middleware/common.middleware");
const connectDb = require("./config/db");



//main app.
const app = express();




commonMiddlewares(app)

connectDb(app);
