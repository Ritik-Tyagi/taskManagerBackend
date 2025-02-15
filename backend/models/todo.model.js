const mongoose = require("mongoose")

const todoSchema = new mongoose.Schema({
    title: {type: String, required: true},
    des: {type: String, required: true},
    status: {type: Boolean, required: true},
    userId: {type: String, required: true},
    username: {type: String, required: true}
}, {
    versionKey: false
})

const TodoModel = mongoose.model("Todos", todoSchema)

module.exports = {TodoModel}