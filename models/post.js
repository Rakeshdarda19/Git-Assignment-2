const mongoose = require('mongoose')

//mongoose.connect(('mongodb://localhost/restapi'))

const Schema = mongoose.Schema;

const postData = new Schema ({
    title: {type : String, required : true} ,
    body: {type : String, required : true},
    image: {data:Buffer, type : String, required : true},
    user: {type: Schema.Types.ObjectId, ref: "User"}
})

const Post = mongoose.model("Post", postData)

module.exports = Post