const mongoose = require('mongoose')

const teacherOtherDetailsSchema = new mongoose.Schema({
    MobileNumber: {
        type: String,
        required: true,
        trim: true
    },
    Email: {
        type: String,
        required: true,
        trim: true
    },
    PermanentAddress: {
        type: String,
        required: true,
        trim: true
    },
    BloodGroup: {
        type: String,
        required: true,
        trim: true
    },
    ID: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    EducationalQualification: {
        type: String,
        required: true,
        trim: true
    },
    TeacherPhoto: {
        type: Buffer
    },
    Resume: {
        type: Buffer
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

teacherOtherDetailsSchema.virtual('teacherprofiles', {
    ref: 'TeacherProfile',
    localField: 'ID',
    foreignField: 'ID'
})

teacherOtherDetailsSchema.virtual('teacherprofiles', {
    ref: 'TeacherProfile',
    localField: 'MobileNumber',
    foreignField: 'MobileNumber'
})

teacherOtherDetailsSchema.virtual('teacherprofiles', {
    ref: 'TeacherProfile',
    localField: 'Email',
    foreignField: 'Email'
})

const TeacherOtherDetail = mongoose.model('TeacherOtherDetail', teacherOtherDetailsSchema)

module.exports = TeacherOtherDetail