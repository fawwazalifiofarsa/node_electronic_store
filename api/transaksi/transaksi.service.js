const db = require("../../config/connection");
module.exports = {
 add: (data, callBack) => {
   db.query(
     `select * from product where product_id = ?`,
     [data.product_id],
     (err, results) => {
       if (err) {
         console.log(err);
         return;
       } else if (!results[0]) {
         return callBack("BNF");
       } else if (results[0].stock < 1) {
         return callBack("Out of order");
       } else {
         db.query(
           `select customer_id from customer where customer_id = ?`,
           [data.customer_id],
           (err, results) => {
             if (err) {
               console.log(err);
               return;
             } else if (!results[0]) {
               return callBack("ANF");
             } else {
                db.query(
                  `insert into transaksi set ?`,
                  [data],
                  (err, results) => {
                    if (err) {
                      return callBack(err);
                    } else {
                      db.query(
                        `select * from product where product_id = ?`,
                        [data.product_id],
                        (err, results) => {
                          if (err) {
                            console.log(err);
                            return;
                          } else {
                            hasil = results[0].stock - 1;
                            db.query(
                              `update product set stock=? where product_id = ?`,
                              [hasil, data.product_id]
                            );
                          }
                        }
                      );
                    }
                    return callBack(null, results);
                  }
                );
             }
           }
         );
       }
     }
   );
 },
 get: (callBack) => {
   db.query(`select * from transaksi`, [], (err, results) => {
     if (err) {
       return callBack(err);
     } else {
       return callBack(null, results[0]);
     }
   });
 },
 getId: (data, callBack) => {
   db.query(
     `select * from transaksi where transaksi_id = ?`,
     [data],
     (err, results) => {
       if (err) {
         return callBack(err);
       } else {
         return callBack(null, results[0]);
       }
     }
   );
 },
 update: (data, callBack) => {
   db.query(
     `select * from transaksi where transaksi_id=?`,
     [data.transaksi_id],
     (err, results) => {
       if (err) {
         return callBack(err);
       } else {
         db.query(`update transaksi set ? where transaksi_id = ?`, [
           data,
           data.transaksi_id,
         ]);
         return callBack(null, results[0]);
       }
     }
   );
 },
 del: (data, callBack) => {
   db.query(
     `select transaksi_id from transaksi where transaksi_id = ?`,
     [data.transaksi_id],
     (err, results) => {
       if (err) {
         return callBack(err);
       } else {
         db.query(
           `delete from transaksi where no_pinjam = ?`,
           [data.no_pinjam],
           (err, result) => {
             if (err) {
               return callBack(err);
             } else {
               db.query(
                 `select * from product where product_id = ?`,
                 [data.product_id],
                 (err, results) => {
                   // console.log(!results[0]);
                   // console.log(results[0].stock);
                   // console.log(null);
                   if (err) {
                     console.log(err);
                     return callBack(err);
                   } else {
                     hasil = results[0].stock + 1;
                     db.query(`update product set stock=? where product_id = ?`, [
                       hasil,
                       data.product_id,
                     ]);
                   }
                 }
               );
               return callBack(null, result[0]);
             }
           }
         );
       }
     }
   );
 },
};
