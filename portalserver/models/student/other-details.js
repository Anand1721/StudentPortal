const mongoose = require('mongoose')

const otherDetailsSchema = new mongoose.Schema({
    MobileNumber: {
        type: String,
        required: true,
        trim: true
    },
    ParentMobileNumber: {
        type: String,
        required: true,
        trim: true
    },
    PermanentAddress: {
        type: String,
        required: true,
        trim: true
    },
    Email: {
        type: String,
        required: true,
        trim: true
    },
    BloodGroup: {
        type: String,
        required: true,
        trim: true
    },
    Height: {
        type: String,
        required: true,
        trim: true
    },
    Weight: {
        type: String,
        required: true,
        trim: true
    },
    StudentPhoto: {
        type: Buffer
    },
    SchoolMarksheet: {
        type: Buffer
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

otherDetailsSchema.virtual('studentprofiles', {
    ref: 'StudentProfile',
    localField: 'StudentPhoto',
    foreignField: 'StudentPhoto'
})

otherDetailsSchema.virtual('studentprofiles', {
    ref: 'StudentProfile',
    localField: 'MobileNumber',
    foreignField: 'MobileNumber'
})

const OtherDetail = mongoose.model('OtherDetail', otherDetailsSchema)

module.exports = OtherDetail