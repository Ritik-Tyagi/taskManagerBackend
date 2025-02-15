const express = require("express")
const {auth} = require("../middlewares/auth.middleware")
const {
    addTodo, 
    getAllTodos, 
    getCompletedTodos, 
    getPendingTodos, 
    toggleStatus, 
    updateTodo, 
    deleteTodo, 
    getTodoById
} = require("../controllers/todo.controllers")

const todoRouter = express.Router()

todoRouter.post("/", auth, addTodo)
todoRouter.get("/", auth, getAllTodos)
todoRouter.get("/:todoId", auth, getTodoById)
todoRouter.get("/complete", auth, getCompletedTodos)
todoRouter.get("/pending", auth, getPendingTodos)
todoRouter.patch("/toggle/:todoId", auth, toggleStatus)
todoRouter.patch("/:todoId", auth, updateTodo)
todoRouter.delete("/:todoId", auth, deleteTodo)

module.exports = {todoRouter}
