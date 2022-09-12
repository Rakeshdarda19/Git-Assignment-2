const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const User = require('../models/user')
const Post = require('../models/post')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
const secret = 'RESTAPI'
const router = express.Router()

router.get("/posts", async (req,res) => {
    const posts = await Post.find()
    res.json({
        status:"Success",
        posts
    })
})

router.post("/posts", async (req,res) => {
    const posts = await Post.create({
        title : req.body.title,
        body : req.body.body,
        image : req.body.title,
        user : req.body.title        
    })
    res.json({
        status:"Success",
        posts
    })
})

router.put("/posts/:id" , async (req,res) => {
    try{
        const posts = await User.updateOne({_id: req.params.id},{title : req.body.title,
            body : req.body.body,
            image : req.body.title,});
        res.json({
            status:"success",
            posts
        }) 
    } catch(e){
        res.status(500).json({
            status:"failed",
            message : e.message
        })
    }
    
})

router.delete("/posts/:id" , async (req,res) => {
    try{
        const posts = await User.deleteOne({_id: req.params.id});
        res.json({
            status:"success",
            posts
        }) 
    } catch(e){
        res.status(500).json({
            status:"failed",
            message : e.message
        })
    }
    
})

module.exports = router