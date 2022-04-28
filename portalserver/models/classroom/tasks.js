const mongoose = require('mongoose')

const tasksSchema = new mongoose.Schema({
    TaskCode: {
        type: String,
        unique: true,
        required: true
    },
    TaskTitle: {
        type: String,
        required: true
    },
    TaskDescription: {
        type: String,
        trim: true
    },
    CreatedOn : {
        type: String
    },
    Code: {
        type: String,
        required: true
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})

const Task = mongoose.model('Task', tasksSchema)

module.exports = Task