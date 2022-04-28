const mongoose = require('mongoose')
const StudentProfile = require('./student-profile')

const admissionDetailsSchema = new mongoose.Schema({
    RegistrationNumber: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    AdmissionYear: {
        type: String,
        required: true,
        trim: true
    },
    CourseName: {
        type: String,
        required: true,
        trim: true
    },
    CourseDuration: {
        type: String,
        required: true,
        trim: true
    },
    AdmittedQuota: {
        type: String,
        required: true,
        trim: true
    },
    DifferentlyAbled: {
        type: String,
        required: true,
        trim: true
    },
    Sportsperson: {
        type: String,
        required: true,
        trim: true
    },
    Defence: {
        type: String,
        required: true,
        trim: true
    },
    NCC: {
        type: String,
        required: true,
        trim: true
    },
    SchoolMarks: {
        type: String,
        required: true,
        trim: true
    },
    School: {
        type: String,
        required: true,
        trim: true
    },
    Board: {
        type: String,
        required: true,
        trim: true
    },
    Percentage: {
        type: String,
        required: true,
        trim: true
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

admissionDetailsSchema.virtual('studentprofiles', {
    ref: 'StudentProfile',
    localField: 'RegistrationNumber',
    foreignField: 'RegistrationNumber'
})

admissionDetailsSchema.virtual('studentprofiles', {
    ref: 'StudentProfile',
    localField: 'CourseName',
    foreignField: 'CourseName'
})

const AdmissionDetail = mongoose.model('AdmissionDetail', admissionDetailsSchema)

module.exports = AdmissionDetail