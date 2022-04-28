const mongoose = require('mongoose')

const basicDetailsSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        trim: true
    },
    Gender: {
        type: String,
        required: true,
        trim: true
    },
    DOB: {
        type: String,
        required: true,
        trim: true
    },
    Age: {
        type: String,
        required: true,
        trim: true
    },
    Nationality: {
        type: String,
        required: true,
        trim: true
    },
    NativeState: {
        type: String,
        required: true,
        trim: true
    },
    PlaceOfBirth: {
        type: String,
        required: true,
        trim: true
    },
    Hosteler: {
        type: String,
        required: true,
        trim: true
    },
    Religion: {
        type: String,
        required: true,
        trim: true
    },
    StudentStatus: {
        type: String,
        required: true,
        trim: true
    },
    FatherName: {
        type: String,
        required: true,
        trim: true
    },
    FatherQualification: {
        type: String,
        required: true,
        trim: true
    },
    MotherName: {
        type: String,
        required: true,
        trim: true
    },
    MotherQualification: {
        type: String,
        required: true,
        trim: true
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

basicDetailsSchema.virtual('studentprofiles', {
    ref: 'StudentProfile',
    localField: 'Name',
    foreignField: 'Name'
})

const BasicDetail = mongoose.model('BasicDetail', basicDetailsSchema)

module.exports = BasicDetail