const {UserModel} = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const registerUser = async (req,res) => {
    const {name, username, email, pass} = req.body
    try {
        bcrypt.hash(pass, Number(process.env.saltRounds), async (err, hash) => {
            if(err) {
                res.json({msg: "Something went wrong!", err})
            } else {
                const user = new UserModel({name, username, email, pass: hash})
                await user.save()
                res.json({msg: "You have been successfully registered!"})
            }
        })
    } catch(error) {
        res.json({msg: "Something went wrong!", error})
    }
}

const loginUser = async (req,res) => {
    const {username, pass} = req.body
    try {
        const user = await UserModel.findOne({username})
        if(user) {
            bcrypt.compare(pass, user.pass, (err, result) => {
                if(result) {
                    const token = jwt.sign({userId: user._id, username: user.username}, process.env.secret)
                    res.json({msg:"Successfully LoggedIn!", token})
                } else {
                    res.json({msg: "Wrong credentials!", err})
                }
            })
        } else {
            res.json({msg:"User does not exist!"})
        }
    } catch(error) {
        res.json({msg: "Something went wrong!", error})
    }
}

module.exports = {registerUser, loginUser}