
  const authentication = (req,res,next)=>{
    const jwt = require("jsonwebtoken")
     const token = req.headers.authorization
     
     if(token){

        const decoded = jwt.verify(token, 'linkdin')

        if(decoded){

           const id = decoded.userID  

           req.body.userID = id
        next()
        }else{
            res.send({"msg":"please login first"})
        }

         
        

     }else{
        res.send({"msg":"please login first"})
     }



  }

  module.exports = {authentication}