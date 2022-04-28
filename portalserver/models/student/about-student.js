const mongoose = require('mongoose')

const aboutStudentSchema = new mongoose.Schema({
    AboutStudent: {
        type: String,
        trim: true
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

const AboutStudent = mongoose.model('AboutStudent', aboutStudentSchema)

module.exports = AboutStudent