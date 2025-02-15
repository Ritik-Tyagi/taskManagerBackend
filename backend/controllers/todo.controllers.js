const {TodoModel} = require("../models/todo.model")

const addTodo = async (req,res) => {
    const {title, des, status, userId, username} =req.body
    try {
        const todo = new TodoModel({
            title,
            des,
            status,
            userId, 
            username
        })
        await todo.save()
        res.json({msg:"New Todo has been added", todo})
    } catch(error) {
        res.json({msg:"Something went wrong", error})
    }
}

const getAllTodos = async (req,res) => {
    try {
        const todos = await TodoModel.find({userId: req.body.userId})
        res.json({todos})
    } catch(error) {
        res.json({msg:"Something went wrong", error})
    }
}

const getCompletedTodos = async (req,res) => {
    try {
        const todos = await TodoModel.find({userId: req.body.userId, status: true})
        res.json({todos})
    } catch(error) {
        res.json({msg:"Something went wrong", error})
    }
}
const getPendingTodos = async (req,res) => {
    try {
        const todos = await TodoModel.find({userId: req.body.userId, status: false})
        res.json({todos})
    } catch(error) {
        res.json({msg:"Something went wrong", error})
    }
}

const toggleStatus = async (req,res) => {
    const {todoId} = req.params
    try {
        const todo = await TodoModel.findOne({_id: todoId})
        const newStatus = !todo.status
        await TodoModel.findByIdAndUpdate({_id: todoId}, {status: newStatus})
        res.json({msg: `Task has been updated as ${newStatus ? 'completed' : 'pending'}`})
    } catch(error) {
        res.json({msg:"Something went wrong", error})
    }
}

const updateTodo = async(req,res) => {
    const {todoId} = req.params
    try {
        await TodoModel.findByIdAndUpdate({_id: todoId}, req.body)
        res.json({msg: "Task has been updated"})
    } catch(error) {
        res.json({msg:"Something went wrong", error})
    }
}

const deleteTodo = async (req,res) => {
    const {todoId} = req.params
    try {
        await TodoModel.findByIdAndDelete({_id: todoId})
        res.json({msg: "Task has been deleted"})
    } catch(error) {
        res.json({msg:"Something went wrong", error})
    }
}

const getTodoById = async (req,res) => {
    const {todoId} = req.params
    try {
        const todo = await TodoModel.findOne({_id: todoId})
        res.json({todo})
    } catch(error) {
        res.json({msg:"Something went wrong", error})
    }
}

module.exports = {
    addTodo, 
    getAllTodos, 
    getCompletedTodos, 
    getPendingTodos, 
    toggleStatus, 
    updateTodo, 
    deleteTodo, 
    getTodoById
}