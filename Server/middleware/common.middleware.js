const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");




//Configure necessary middlewares....here
const corsOption={
    origin:process.env.CLIENT_URI,
    credentials:true
}



//Resgister here 3rd party middleware which need to use like "app.use()"
const middleWareAarray = [
    cors(corsOption),
    bodyParser.json(),
    bodyParser.urlencoded({extended:true}),
    morgan("dev"),
]


const commonMiddlewares = (app) =>{
    middleWareAarray.forEach(mid => {
        app.use(mid);
    })
}

module.exports = commonMiddlewares;