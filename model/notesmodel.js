const mongoose = require("mongoose")

const noteSchema = mongoose.Schema({
    title : String,
    body: String ,
    device : String ,
    no_if_comments: Number,
    userID : String

})

const noteModel = mongoose.model("note" , noteSchema)

module.exports = {noteModel}