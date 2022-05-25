const mongoose = require('mongoose');

const printSchema = new mongoose.Schema({
    name: String,
    Artist: String,
    time:String,
    short: String,
    trailer: String,
    image: String,
    like: {type: Boolean, default: false},
    author:{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});

module.exports = mongoose.model('Print', printSchema);