require('dotenv').config();
const express = require('express');
const app = express();
const customerRouter = require("./api/customer/customer.router");
const adminRouter = require("./api/admin/admin.router");
const pinjamRouter = require("./api/transaksi/transaksi.router");
const bukuRouter = require("./api/product/productrouter");
app.use(express.json());
app.use("/api/customer", customerRouter);
app.use("/api/admin", adminRouter);
app.use("/api/pinjam", pinjamRouter)
app.use("/api/buku", bukuRouter)

app.listen(process.env.APP_PORT, ()=>{
    console.log("Tersambung di PORT : " + process.env.APP_PORT)
})
