const { response } = require("express");
const UserOrderDetails = require("../Models/UserOrderDetails");


exports.userorderdetail=(req,res)=>{
    const reqBody = req.body;
    const email = reqBody.email;
    const number = reqBody.number;
    const postaddress = reqBody.postaddress;
    const amount = reqBody.amount;
    const orderdetails = reqBody.orderdetails;
    var userorderdeatils = new UserOrderDetails({email:email,number:number,postaddress:postaddress,amount:amount,orderdetails:orderdetails});
   
    console.log(userorderdeatils);
    userorderdeatils.save().
            then(response=>res.status(200).json({meassage:"Order details stored Succesfully",userorderdeatils:response})).
            catch(err=>res.status(500).json({message:err}));

    
}