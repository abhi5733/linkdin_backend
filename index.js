require('dotenv').config()
 const express = require("express")
const {connection} = require("./config/db")
const cors = require("cors")
const {userModel} = require("./model/usermodel")
const {userRouter} = require("./route/userroute")
const {noteRouter} = require("./route/notesroute")
const {authentication} = require("./middleware/authentication")
 const app = express()
app.use(express.json())
app.use(cors())

app.use("/users" , userRouter)
app.use(authentication)
app.use("/posts", noteRouter)


 app.listen(process.env.port, async()=>{

  try{
    await connection
    console.log("connected to db")
  }catch(err){
    console.log(err)
  }

    console.log(`server started at ${process.env.port}`)
 })