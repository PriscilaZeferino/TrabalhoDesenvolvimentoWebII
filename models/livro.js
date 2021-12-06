const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    user: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String},
    author: {type: String},
    total_pages: {type: Number, required: true},
    read_pages: {type: Number},
});

const Livro = mongoose.model("Livro", bookSchema)
module.exports = Livro