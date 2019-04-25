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

const Item = mongoose.model('items', ItemSchema);

module.exports = Item;