const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Item = require('./Item').schema

const OrderSchema = new Schema({
    orderID: {
        type: Number,
        required: true
    },
    customer_name: {
        type: String,
        required: true
    },
    customer_email: {
        type: String,
        required: true
    },
    customer_number: {
        type: String,
        required: true
    },
    restaurant_name: {
        type: String,
        required: true
    },
    items: {
        type: [Item],
        required: true
    },
    order_time:{
        type: Date,
        default: Date.now
    },
    del_location:{
        type: String,
        required: true
    },
    del_time:{
        type: String,
        required: true 
    },
    status:{
        type: String,
        required:true
    },
    instructions:{
        type: String,
        required: true
    },
    rating:{
        type: String,
        required: true
    }
});

const Order = mongoose.model('orders', OrderSchema);

module.exports = Order;