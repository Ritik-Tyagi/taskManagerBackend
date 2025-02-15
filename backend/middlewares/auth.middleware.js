const jwt = require("jsonwebtoken")
require("dotenv").config()

const auth = (req,res,next) => {
    const token = req.headers.authorization?.split(" ")[1]
    if(token){
        try {
            const decoded = jwt.verify(token, process.env.secret)
            if(decoded) {
                req.body.userId = decoded.userId
                req.body.username = decoded.username
                next()
            } else {
                res.json({msg:"You are not authorized!"})
            }
        } catch(error) {
            res.json({msg:"Something went wrong!", error})
        }
    } else {
        res.json({msg:"You are not authorized!"})
    }
}

module.exports = {auth}