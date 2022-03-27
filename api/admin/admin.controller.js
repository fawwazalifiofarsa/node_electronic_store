const {
    add,
    get,
    getId,
    update,
    del,
    serviceGetUserByEmail
 } = require('./admin.service');
 const {genSaltSync, hashSync, compareSync} = require('bcryptjs');
 const { sign } = require('jsonwebtoken');
 module.exports = {
    controllerAdd:(req,res)=>{
        data_admin = {
            username : req.body.username,
            phone : req.body.phone,
            email : req.body.email,
            password : req.body.password
        }
        const salt = genSaltSync(10);
        data_admin.password = hashSync(data_admin.password, salt);
        add(data_admin,(err,results)=>{
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
        const body = req.body.admin_id
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
        const data_admin = {
            username: req.body.username,
            phone : req.body.phone,
            email : req.body.email,
            password : req.body.password
        }
       
        update(data_admin,(err,results)=>{
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
        const body = req.body.admin_id
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
    },
 
    controllerLogin:(req,res)=>{
        const body = req.body;
        serviceGetUserByEmail(body.email,(err,results)=>{
            if(err){
                console.log(err)
            }if(!results){
                return res.json({
                    success:0,
                    message:"Invalid email"
                })
            }
            const result= compareSync(body.password,results.password)
            console.log(result);
            console.log(results.password);
            console.log(body.password);
 
            if(result ){
                results.password = undefined
                const jsonwebtoken = sign({result:results},"secretkey",{
                    expiresIn:"1h"
                })
                return res.json({
                    success:1,
                    message:"Login succesfuly, Your Acount Already Use",
                    account: results,
                    token:jsonwebtoken
                })
            }else{
                return res.json({
                    success:0,
                    message:"Password invalid"
                })
            }
        })
    }
 }
 