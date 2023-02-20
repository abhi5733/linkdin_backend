
 const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { userModel } = require("../model/usermodel")
const userRouter = express.Router()



userRouter.post("/register" , async (req,res)=>{
  
    const {name,email,gender,password,age,city} = req.body
    try{
        bcrypt.hash(password, 10,async (err, hash)=> {
         if(err){
            console.log(err)
         }else{

             const find = await userModel.find({name:name})
            if(find.length>0){
    return  res.send("User already exist, please login")
            }
          else{
             const user = new userModel({name,email,gender,password:hash,age,city})
             await user.save()
   res.send({"msg":"new user created successfully"})
          }
        


            
         }
        })
        

    }catch(err){
res.send({"err":err.message})
    }
    
})

userRouter.post("/login" ,async (req,res)=>{

    const {email,password} =  req.body
try{

    const user = await userModel.find({email})
//  res.send(user[0].password)

    if(user.length>0){

        bcrypt.compare(password , user[0].password, (err, result)=> {
            if(result){
                const token = jwt.sign({ userID: user[0]._id }, 'linkdin');

                res.send({"msg":"login successfull" , "token":token})
            }
            
        });

    }else{
        res.send({"msg":"login failed" })
    }



}catch(err){
    res.send({"msg":"login failed" ,"err":err.message})
}

})



module.exports = {userRouter}
    