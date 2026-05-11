const mongoose = require('mongoose')
const connectDb = async()=>{
    try {
       await mongoose.connect(process.env.MONGO_URI)
       console.log("MongoDB connected successfully")
    } catch (error) {
        console.log("Error connecting to MongoDB",)
        setTimeout(connectDb, 5000) 
    }
    
}

module.exports = connectDb