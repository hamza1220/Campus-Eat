const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RestSchema = new Schema({
    restaurant_name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    num_orders: {
        type:Number,
        required: true
    }
});

const Rest = mongoose.model('rests', RestSchema);

module.exports = Rest;