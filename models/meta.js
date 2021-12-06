const mongoose = require('mongoose')

const metaSchema = new mongoose.Schema({
    user: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, default: ''},
    total_books: {type: Number, default: 1, required: true},
    read_books: {type: Number, default: 0},
    deadline: {type: Date, required: true}
});

const Meta = mongoose.model("Meta", metaSchema)
module.exports = Meta