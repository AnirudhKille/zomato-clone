const { response } = require("express");
const User = require("../Models/User");


exports.register=(req,res)=>{
    const reqBody = req.body;
    const email = reqBody.email;
    const password = reqBody.password;
    var user = new User({email:email,password:password});
    User.find({email:email}).then(response=>{
        const num = Number(response);
        var email = String(response.map(item=>item.email));
        if(num==0){
            user.save().
            then(response=>res.status(200).json({meassage:"User Register Succesfully",user:response})).
            catch(err=>res.status(500).json({message:err}));

        }else{

            res.status(200).json({meassage:"This email =  "+"  "+email+" "+"address is alerday register plz go and login directly",user:response});
           
        }

    }).catch(err => res.status(500).json({ message: err }));
   
    

}

exports.login=(req,res)=>{
    const reqBody = req.body;
    const email = reqBody.email;
    const password = reqBody.password;

    User.find({email:email}).then(response=>{
        var email_id = String(response.map(item=>item.email));
     
        var pass = String(response.map(item=>item.password));
       
        
        if(email==email_id && password==pass){
            res.status(200).json({ message: 'Sign in Succesfully', user: response });

        }else{
            res.status(200).json({ message: 'Plz Check User Id & Password'});
           
        }

    }).catch(err => res.status(500).json({ message: err }));

}