const {
    add,
    get,
    getId,
    update,
    del
} = require('./customer.service');
const {genSaltSync, hashSync, compareSync} = require('bcryptjs');
const { sign } = require('jsonwebtoken');
module.exports = {
    controllerAdd:(req,res)=>{
        data_customer = {
            username : req.body.username,
            phone : req.body.phone,
            address : req.body.address,
            email : req.body.email,
            password : req.body.password
        }
        const salt = genSaltSync(10);
        data_customer.password = hashSync(data_customer.password, salt);
        add(data_customer,(err,results)=>{
            if(err){
                console.log(err);
                return
            }else{
                return res.status(200).json({
                    success : 1,
                    data : results,
                    data_customer
                })
            }
        })
    },
    controllerGet:(req,res)=>{
        get((err,results)=>{
            if(err){
                console.log(err)
                return
            }else{
                return res.json({
                    success:1,
                    data:results
                })
            }
        })
    },
    controllerGetId:(req,res)=>{
        const body = req.body.customer_id
        getId(body,(err,results)=>{
            if(err){
                console.log(err)
                return
            }else{
                return res.json({
                    success:1,
                    data:results
                })
            }
        })
    },
    controllerUpdate:(req,res)=>{
        const data_customer = {
            username: req.body.username,
            phone : req.body.phone,
            address : req.body.address,
            email : req.body.email,
            password : req.body.password
        }
        
        update(data_customer,(err,results)=>{
            if(err){
                console.log(err)
                return
            }else if(!results){
                return res.json({
                    success : 0,
                    message : "Not Found"
                })
            }else{
                return res.json({
                    success:1,
                    data:results
                })
            }
        })
    },
    controllerDelete:(req,res)=>{
        const body = req.body.customer_id
        del(body,(err,results)=>{
            if(err){
                console.log(err)
                return
            }else if(!results){
                return res.json({
                    success:0,
                    message:"Not Found"
                })
            }else{
                return res.json({
                    success:1,
                    message:"Delete Success"
                })
            }
        })
    }
}
