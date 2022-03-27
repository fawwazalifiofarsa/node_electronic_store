const db = require('../../config/connection');
module.exports = {
    add:(data,callBack)=>{
        db.query(`insert into admin set ?`,
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
        db.query(`select * from admin`,
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
        db.query(`select * from admin where admin_id = ?`,
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
        db.query(`select * from admin where admin_id=?`,
        [data.admin_id],
        (err,results)=>{
            if(err){
                return callBack(err)
            }else{
                db.query(`update admin set ? where admin_id = ?`,
                [
                    data,
                    data.admin_id
                ]);
                return callBack(null,results[0])
            }
        })
    },

    del:(data,callBack)=>{
        db.query(`select admin_id from admin where admin_id = ?`,
        [data],
        (err,results)=>{
            if(err){
                return callBack(err)
            }else{
                db.query(`delete from admin where admin_id = ?`,
                [data]);
                return callBack(null,results[0])
            }
        })
    },

    serviceGetUserByEmail: (email,callBack)=>{ 
        db.query(
            `select * from admin where email=? `,
            [email],(err,results)=>{
                if(err){
                    return callBack(err)
                }else{
                    return callBack(null,results[0])
                }
            }
        )
    }
}
