const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({

    dproduct_i: String,
    product_name: String,

    price: Number,
    qty: Number,
    total: Number,

    size: String,

    payment_method: String,

    order_date:{
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('Order', OrderSchema)






