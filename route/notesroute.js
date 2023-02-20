
const express = require("express")
const {noteModel} = require("../model/notesmodel")
const jwt = require("jsonwebtoken")

const noteRouter = express.Router()


noteRouter.post("/createposts", async(req,res)=>{


try{

    let posts = new noteModel(req.body)
    await posts.save()
    res.send({"msg":"post created successfully"})



}catch(err){
    res.send({"msg":"post not created" , "err":err.message})
}

})


noteRouter.get("/", async (req,res)=>{

    let id = req.body.userID
      let query = req.query
let posts
     try{

         posts = await noteModel.find({userID:id})
        if(posts.length===0){
            return res.send({"msg":"posts not found"})
        }else{

             if(query.device){
                posts = await noteModel.find({device:query.device})
             }else if(query.device1 && query.device2){
                posts = await noteModel.find(  {device:query.device1 ,device: query.device2})
             }

            res.send(posts)
        }
      

     }
     catch(err){
        res.send({"msg":err.message})
     }


})



// noteRouter.get("/top", async (req,res)=>{

//     let id = req.body.userID


//      try{

//         const posts = await noteModel.find({userID:id})
//         if(posts.length===0){
//             return res.send({"msg":"posts not found"})
//         }
//         res.send(posts)

//      }
//      catch(err){
//         res.send({"msg":err.message})
//      }


// })



 noteRouter.patch("/update/:id" ,async(req,res)=>{


     let id = req.params.id
     const post = await noteModel.findOne({_id:id})
     

     if(!post){
        return res.send({"msg":"post not found"})
     }
     try{
     
        await noteModel.findByIdAndUpdate({_id:id}, req.body)
        res.send({"msg":"post updated successfully"})

     }catch(err){
        res.send({"msg":"post not updated"})
     }


 } )


 noteRouter.delete("/delete/:id", async (req,res)=>{

    let id = req.params.id
    const post = await noteModel.findOne({_id:id})
     

     if(!post){
        return res.send({"msg":"post not found"})
     }
     try{
     
        await noteModel.findByIdAndDelete({_id:id})
        res.send({"msg":"post deleted successfully"})

     }catch(err){
        res.send({"msg":"post not deleted"})
     }
 })

module.exports = {noteRouter}