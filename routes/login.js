const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const User = require('../models/user')
const Post = require('../models/post')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
app.use(express.json())
var jwt = require('jsonwebtoken')
const { json } = require('body-parser')
const secret = 'RESTAPI'
const router = express.Router()

const mongoose =  require('mongoose')



router.post("/register", body("name").isAlpha(), body("email").isEmail(), body("password").isLength({
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

    router.post("/login", body("email"), body("password"),
      
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

                          res.json({
                            status : "success" ,
                             token  })
                    }

                   
                    
                })


            } catch (e) {
                res.status(500).json({
                    status: "failed",
                    message: e.message
                })
            }
        })

module.exports = router;