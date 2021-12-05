const mongoose = require('mongoose')

const metalivroSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String},
    total_pages: {type: Number, required: true},
    read_pages: {type: Number},
    deadline: {type: Date, required: true}
});

const MetaLivro = mongoose.model("MetaLivro", metalivroSchema)
module.exports = MetaLivro