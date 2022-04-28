const mongoose = require('mongoose')

const aboutTeacherSchema = new mongoose.Schema({
    AboutTeacher: {
        type: String,
        trim: true
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

const AboutTeacher = mongoose.model('AboutTeacher', aboutTeacherSchema)

module.exports = AboutTeacher