const { strict } = require("assert")
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userData = new Schema ({
    name: {type : String, required : true} ,
    email: {type : String, required : true, unique : true},
    password: {type : String, required : true}
})

const User = mongoose.model("User", userData)

module.exports = User