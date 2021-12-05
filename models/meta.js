const mongoose = require('mongoose')

const metaSchema = new mongoose.Schema({
    userId: {type: ObjectId},
    title: {type: String, required: true},
    description: {type: String},
    total_books: {type: Number, required: true},
    read_books: {type: Number},
    deadline: {type: Date, required: true}
});

const Meta = mongoose.model("Meta", metaSchema)
module.exports = Meta