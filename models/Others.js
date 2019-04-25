const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    item_id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    restaurant_name: {
        type:String,
        required: true
    }
});


const OrderSchema = new Schema({
    orderID: {
        type: Number,
        required: true
    },
    customer_email: {
        type: String,
        required: true
    },
    restaurant_name: {
        type: String,
        required: true
    },
    items: {
        type: [ItemSchema],
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
        type: Date,
        default: Date.now 
    },
    status:{
        type: String,
        required:true
    },
    instructions:{
        type: String,
        required: true
    }
});

const RestSchema = new Schema({
    name: {
        type: Number,
        required: true
    },
    },
    number: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },
    number: {
        type: String,
        required: true
    },
    password: {
        type: String,
    rating: {
        type: Number,
        required: true
    },
    restaurant_name: {
        type: String,
        required: true
    },
    menu:{
        type: [ItemSchema],
        required: true
    },
    number: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },
    number: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },
    num_orders: {
        type:Number,
        required: true
    }
});

const Order = mongoose.model('orders', OrderSchema);
const Item = mongoose.model('items', ItemSchema);
const Rest = mongoose.model('rests', RestSchema);

module.exports = Order;
module.exports = Item;
module.exports = Rest;