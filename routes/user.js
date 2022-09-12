const express = require('express')
const User = require("../models/user")
const Post = require("../models/post")
const router = express.Router()
const {body, validationResult} = require('express-validator')
const app = express()

router.get("/users" , async (req,res) => {
    try{
        const users = await User.find();
        res.json({
            status:"success",
            users
        }) 
    } catch(e){
        res.status(500).json({
            status:"failed",
            message : e.message
        })
    }
    
})

router.post("/users" , async (req,res) => {
    try{
        const users = await User.create(req.body);
        res.json({
            status:"success",
            users
        }) 
    } catch(e){
        res.status(500).json({
            status:"failed",
            message : e.message
        })
    }
    
})

router.put("/users/:id" , async (req,res) => {
    try{
        const users = await User.updateOne({_is: req.params.id},{name:req.body.name});
        res.json({
            status:"success",
            users
        }) 
    } catch(e){
        res.status(500).json({
            status:"failed",
            message : e.message
        })
    }
    
})

module.exports = router;