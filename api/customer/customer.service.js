const db = require('../../config/connection');
module.exports={
    add:(data,callBack)=>{
        db.query(`insert into customer set ?`,
        [data],
        (err,results)=>{
            if(err){
                return callBack(err)
            }else{
                return callBack(null,results)
            }
        })
    },
    get:(callBack)=>{
        db.query(`select * from customer`,
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
        db.query(`select * from customer where customer_id = ?`,
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
        db.query(`select * from customer where customer_id=?`,
        [data.customer_id],
        (err,results)=>{
            if(err){
                return callBack(err)
            }else{
                db.query(`update customer set ? where customer_id = ?`,
                [
                    data,
                    data.customer_id
                ]);
                return callBack(null,results[0])
            }
        })
    },
    del:(data,callBack)=>{
        db.query(`select customer_id from customer where customer_id = ?`,
        [data],
        (err,results)=>{
            if(err){
                return callBack(err)
            }else{
                db.query(`delete from customer where customer_id = ?`,
                [data]);
                return callBack(null,results[0])
            }
        })
    }
}
