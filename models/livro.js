const mongoose = require('mongoose')
const MetaLivro = require('./metalivro');

const bookSchema = new mongoose.Schema({
    user: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String},
    author: {type: String},
    total_pages: {type: Number, required: true},
    read_pages: {type: Number},
    metaLivro: [MetaLivro],
});

const Meta = mongoose.model("Meta", bookSchema)
module.exports = Meta