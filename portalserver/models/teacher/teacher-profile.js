const mongoose = require('mongoose')

const teacherProfileSchema = new mongoose.Schema({
    TeacherPhoto: {
        type: String
    },
    ID: {
        type: String,
        required: true,
        trim: true,
        ref: 'OtherDetail'
    },
    Name: {
        type: String,
        required: true,
        trim: true,
        ref: 'BasicDetail'
    },
    MobileNumber: {
        type: String,
        required: true,
        trim: true,
        ref: 'OtherDetail'
    },
    Email: {
        type: String,
        required: true,
        trim: true,
        ref: 'OtherDetail'
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

const TeacherProfile = mongoose.model('TeacherProfile', teacherProfileSchema)

module.exports = TeacherProfile