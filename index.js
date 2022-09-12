const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const User = require('./models/user')
const Post = require('./models/post')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
app.use(express.json())
var jwt = require('jsonwebtoken')
const { json } = require('body-parser')
const secret = 'RESTAPI'
const router = express.Router()

const mongoose =  require('mongoose')
mongoose.connect("mongodb://localhost/restapi")
const userRoutes = require("./routes/user")
const loginRoutes = require("./routes/login")
const postRoutes = require("./routes/post")

const multer = require('multer')

app.get("*", (req,res) => {
    res.status(400).json({
        status:"failed",
            message : "Invalid API"
      })
})

const Storage = multer.diskStorage({
    destination : "uploads",
    filename: (req,res,cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer ({
    storage : Storage
}).single('testImage')

app.use("/posts",  (req,res,next) => {
    if(req.headers.authorization){
        const token = req.headers.authorization.split("test ")[1];

        jwt.verify(token, secret, async function(err, decoded){
            if(err){
                res.status(500).json({
                    status : "failed",
                    message: "Not Authenticated"
                })
            }

            const user = await User.find({_id: decoded.data})
            req.user = user._id
            next()
        })
        
    } else{
        return res.status(500).json({
            status : "failed",
            message : "Invalid token"
        })

    }
})

app.use("/users", userRoutes)
app.use("/", loginRoutes)
app.use("/posts", postRoutes)


app.listen(8080, () => console.log("App is listening at port 8080"))
    

/*
const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const User = require('./models/user')
const Post = require('./models/post')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
app.use(express.json())
var jwt = require('jsonwebtoken')
const { json } = require('body-parser')
const secret = 'RESTAPI'

app.post("/register", body("name").isAlpha(), body("email").isEmail(), body("password").isLength({
    min: 6,
    max: 15
}),

    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            }
            const { name, email, password } = req.body

            bcrypt.hash(password, 10, async function (err, hash) {

                if (err) {
                    res.status(500).json({
                        status: "Failed",
                        message: err.message
                    })
                }
                const user = await User.create({
                    name,
                    email,
                    password: hash
                })
                res.json({
                    status: "success"
                })
            })

        } catch (e) {
            res.status(500).json({
                status: "failed",
                message: e.message
            })
        }
    })

    app.post("/login", body("email"), body("password"),
      
        async (req, res) => {
            try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() })
                }
                const { email, password } = req.body
    
                const data = await User.findOne({email})

                if(!data){
                    return res.status(400).json({
                        status : "Failed",
                        message : "User is not registered"
                    })
                }
                
                bcrypt.compare(password, data.password, function(err,result) {
                    if(err){
                        res.status(500).json({
                            status:"failed",
                            message: err.message
                        })
                    }

                    if(result){
                        const token = jwt.sign({
                            exp: Math.floor(Date.now() / 1000) + (60 * 60),
                            data: data._id
                          }, secret);
                    }

                    res.json({
                        status : "success" ,
                         token
                    })
                })


            } catch (e) {
                res.status(500).json({
                    status: "failed",
                    message: e.message
                })
            }
        })



app.use("/api/v1/posts", (req,res,next) => {
    if(req.headers.authorization){
        const token = req.headers.authorization.split("test ")[1];

        jwt.verify(token, secret, function(err, decoded){
            if(err){
                res.status(500).json({
                    status : "failed",
                    message: "Not Authenticated"
                })
            }

            const user = await User.find({_id: decoded.data})
            req.user = user._id
            next()
        })
        
    }
})
        
app.get("/posts", async (req, res) => {
    res.json({

    })
})

app.post("/posts", async (req, res) => {
    res.json({

    })
})

app.put("/posts/:postId", async (retq, res) => {
    res.json({

    })
})

app.delete("/posts/:postId", async (req, res) => {
    res.json({

    })
})

app.listen(8080, () => console.log("App is listening at port 8080"))
*/