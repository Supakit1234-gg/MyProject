const express = require('express')
const router = express.Router()
const Order = require('../models/orders')
const Product = require('../models/products')

router.post('/checkout', async (req,res)=>{
    const product_id = req.body.product_id
    const qty = parseInt(req.body.qty)
    const price = parseInt(req.body.price)
    const size = req.body.size
    const product = await Product.findById(product_id)

    const total = price * qty

    res.render('orders/checkout',{
        product: product,
        qty: qty,
        price: price,
        total: total,
        size: size
    })
})

router.post('/payment', async (req,res)=>{

   try{

        const product_id = req.body.product_id
        const qty = parseInt(req.body.qty)

        const product = await Product.findById(product_id)

        const newOrder = new Order({

            product_id: product_id,
            product_name: req.body.product_name,
            price: req.body.price,
            qty: qty,
            total: req.body.total,
            size: req.body.size,
            payment_method: req.body.payment_method

        })

        await newOrder.save()

        // ลด stock
        if(qty > product.stock){
            return res.send("สินค้าในคลังไม่เพียงพอ")
        }
        else 
        product.stock = product.stock - qty
        await product.save()

        res.render("orders/success")

    }catch(error){

        res.status(500).json({message:error.message})

    }
})

router.get('/report', async (req, res) => {
    try {
        const { date, startDate, endDate } = req.query

        let orders
        let query = {}

        if (startDate || endDate) {
            // ใช้ช่วงวันที่
            query.order_date = {}
            if (startDate) query.order_date.$gte = new Date(startDate)
            if (endDate) {
                const end = new Date(endDate)
                end.setDate(end.getDate() + 1)
                query.order_date.$lt = end
            }
            orders = await Order.find(query)

        } else if (date) {
            // ใช้วันเดียว (เผื่อ backward compatible)
            const start = new Date(date)
            const end = new Date(date)
            end.setDate(end.getDate() + 1)
            orders = await Order.find({
                order_date: { $gte: start, $lt: end }
            })

        } else {
            orders = await Order.find()
        }

        let totalRevenue = 0
        orders.forEach(order => { totalRevenue += order.total })

        res.render("orders/report", {
            orders: orders,
            totalRevenue: totalRevenue,
            title: "Sales Report",
            startDate: startDate || '',
            endDate: endDate || ''
        })

    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = router