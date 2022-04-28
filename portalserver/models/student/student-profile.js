const mongoose = require('mongoose')

const studentProfileSchema = new mongoose.Schema({
    StudentPhoto: {
        type: Buffer,
        ref: 'OtherDetail'
    },
    RegistrationNumber: {
        type: String,
        required: true,
        trim: true,
        ref: 'AdmissionDetail'
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
    CourseName: {
        type: String,
        required: true,
        trim: true,
        ref: 'AdmissionDetail'
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

const StudentProfile = mongoose.model('StudentProfile', studentProfileSchema)

module.exports = StudentProfile