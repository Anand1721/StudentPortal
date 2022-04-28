const mongoose = require('mongoose')

const teacherBasicDetailsSchema = new mongoose.Schema({
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
    PlaceOfBirth: {
        type: String,
        required: true,
        trim: true
    },
    Religion: {
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

teacherBasicDetailsSchema.virtual('teacherprofiles', {
    ref: 'TeacherProfile',
    localField: 'Name',
    foreignField: 'Name'
})

const TeacherBasicDetail = mongoose.model('TeacherBasicDetail', teacherBasicDetailsSchema)

module.exports = TeacherBasicDetail