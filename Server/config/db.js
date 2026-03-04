const mongoose = require('mongoose');

const Port = process.env.PORT || 8000;

const connectDb = async(app)=>{
    const mongoUri = process.env.MONGO_URI;
    try{
        const conn = await mongoose.connect(mongoUri,{
            serverSelectionTimeoutMS:5000
        })
        console.log("Database connection successfully "+ conn.connection.host);

        await app.listen(Port, ()=> console.log(`app is running on http://localhost:${Port}`))
    }
    catch(err){
        console.log("Database connection faild "+err)
    }
}



module.exports = connectDb;