const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique:true},
    pass: {type: String, required: true}
}, {
    versionKey: false
})

const UserModel = mongoose.model("Users", userSchema)

module.exports = {UserModel}