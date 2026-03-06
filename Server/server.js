require('dotenv').config();
const express = require("express");
const commonMiddlewares = require("./middleware/common.middleware");
const connectDb = require("./config/db");
const useRoutes = require('./routes/routes');



//main app.
const app = express();



//use all common middlewares in app
commonMiddlewares(app)

//use all common middlewares in app
useRoutes(app);

connectDb(app);
