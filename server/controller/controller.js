var Userdb = require('../model/model');


exports.create=(req,res)=>{
   if(!req.body){
     res.status(400).send({message:"Cannot be emtpty"})
     return;
   }

   const user = new Userdb({
     name:req.body.name,
     email:req.body.email,
     gender:req.body.gender,
     status:req.body.status

   })
user
 .save(user)
 .then(data=>{
  //  res.send(data)
  res.redirect('/add-user')
 })
 .catch(err=>{
   res.status(500).send({
     message:err.message || "Some eroor occur while doing this"
   })
 })

}
exports.find = (req, res)=>{

  if(req.query.id){
      const id = req.query.id;

      Userdb.findById(id)
          .then(data =>{
              if(!data){
                  res.status(404).send({ message : "Not found user with id "+ id})
              }else{
                  res.send(data)
              }
          })
          .catch(err =>{
              res.status(500).send({ message: "Erro retrieving user with id " + id})
          })

  }else{
      Userdb.find()
          .then(user => {
              res.send(user)
          })
          .catch(err => {
              res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
          })
  }

  
}


exports.update=(req,res)=>{
  if(!req.body){
    res.status(400).send({message:"The updated data can't be empty"})
    return;
  }
  // Fetching the url parameter in the route :id 
  // While putting put request we have to give values
  const id = req.params.id;

  Userdb.findByIdAndUpdate(id,req.body)
  .then(data=>{
    if(!data){
      res.status(404).send({message:`Cannot be update the user with ${id}. Maybe id is wrong` })

      return;
    }
    else{
      res.send(data)
      
    }
   
  
  })
  .catch(err=>{
    res.status(500).send({message:"Error updated User Information"})
  })
}
exports.delete=(req,res)=>{
  const id = req.params.id;

  Userdb.findByIdAndDelete(id)
  .then(data=>{
    if(!data){
      res.status(404).send({message:`Cannot be delete the user with ${id}. Maybe id is wrong` })

      return;
    }
    else{
      res.send({
        message:"User was deleted!"
      })
      
    }
   
  
  })
  .catch(err=>{
    res.status(500).send({message:"Error  during  delete User Information"})
  })
}

 