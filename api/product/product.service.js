const db = require('../../config/connection');
module.exports = {
    add:(data,callBack)=>{
        db.query(`insert into product set ?`,
        [data],
        (err,results)=>{
            if(err){
                return callBack(err)
            }else{
                return callBack(null, results)
            }
        })
    },

    get:(callBack)=>{
        db.query(`select * from product`,
        [],
        (err,results)=>{
            if(err){
                return callBack(err)
            }else{
                return callBack(null, results)
            }
        })
    },

    getId:(data,callBack)=>{
        db.query(`select * from product where product_id = ?`,
        [data],
        (err,results)=>{
            if(err){
                return callBack(err)
            }else{
                return callBack(null,results)
            }
        })
    },

    update:(data,callBack)=>{
        db.query(`select * from product where product_id=?`,
        [data.product_id],
        (err,results)=>{
            if(err){
                return callBack(err)
            }else{
                db.query(`update product set ? where product_id = ?`,
                [
                    data,
                    data.product_id
                ]);
                return callBack(null,results[0])
            }
        })
    },

    del:(data,callBack)=>{
        db.query(`select product_id from product where product_id = ?`,
        [data],
        (err,results)=>{
            if(err){
                return callBack(err)
            }else{
                db.query(`delete from product where product_id = ?`,
                [data]);
                return callBack(null,results[0])
            }
        })
    }
}
