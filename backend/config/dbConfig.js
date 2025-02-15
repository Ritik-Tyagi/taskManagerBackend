const mongoose = require("mongoose")
require("dotenv").config()

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.mongoUrl)
        console.log("Connected to the DB")
    } catch(error) {
        console.log(error)
    }
}

module.exports = {connectToDB}

