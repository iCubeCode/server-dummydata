const mongoose = require('mongoose')

const NotesSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    note: {
        type: String,
        required: true
    }
})

const Notes = mongoose.model('notes', NotesSchema)

module.exports = Notes;


