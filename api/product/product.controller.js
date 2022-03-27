const {
    add,
    get,
    getId,
    update,
    del
} = require('./product.service')
module.exports = {
    controllerAdd:(req,res)=>{
        data_product = {
            name : req.body.name,
            price    : req.body.price,
            stock : req.body.stock,
            image : req.body.image
        }
        add(data_product,(err,results)=>{
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
        const body = req.body.product_id
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
        data_product = {
            product_id : req.body.product_id,
            name : req.body.name,
            price : req.body.price,
            stock : req.body.stock,
            image : req.body.image
        }
        
        update(data_product,(err,results)=>{
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
        const body = req.body.product_id
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
