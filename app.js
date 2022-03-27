require('dotenv').config();
const express = require('express');
const app = express();
const customerRouter = require("./api/customer/customer.router");
const adminRouter = require("./api/admin/admin.router");
const pinjamRouter = require("./api/transaksi/transaksi.router");
const productRouter = require("./api/product/product.router");
app.use(express.json());
app.use("/api/customer", customerRouter);
app.use("/api/admin", adminRouter);
app.use("/api/pinjam", pinjamRouter)
app.use("/api/product", productRouter)

app.listen(process.env.APP_PORT, ()=>{
    console.log("Tersambung di PORT : " + process.env.APP_PORT)
})
