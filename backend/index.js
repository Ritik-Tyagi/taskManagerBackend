const express = require("express")
const {connectToDB} = require('./config/dbConfig')
const {userRouter} = require("./routes/user.routes")
const {todoRouter} = require("./routes/todo.routes")
const cors = require("cors")
require("dotenv").config()

const PORT = process.env.port || 5000
const app = express()

app.use(express.json())
app.use(cors())
app.use("/users", userRouter)
app.use("/todos", todoRouter)


app.listen(PORT, ()=>{
    connectToDB()
    console.log(`Server is running at http://localhost:${PORT}`)
})