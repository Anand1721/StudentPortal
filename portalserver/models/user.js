const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const BasicDetail = require('./student/basic-details')
const AdmissionDetail = require('./student/admission-details')
const OtherDetail = require('./student/other-details')
const StudentProfile = require('./student/student-profile')
const AboutStudent = require('./student/about-student')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true
    },
    usertype: {
        type: String,
        required: true,
        trim: true
    },
    tokens: [{
            token: {
            type: String,
            required: true
        }
    }]
})

userSchema.virtual('basicdetails', {
    ref: 'BasicDetail',
    localField: '_id',
    foreignField: 'userID'
})

userSchema.virtual('admissiondetails', {
    ref: 'AdmissionDetail',
    localField: '_id',
    foreignField: 'userID'
})

userSchema.virtual('otherdetails', {
    ref: 'OtherDetail',
    localField: '_id',
    foreignField: 'userID'
})

userSchema.virtual('studentprofiles', {
    ref: 'StudentProfile',
    localField: '_id',
    foreignField: 'userID'
})

userSchema.virtual('aboutstudents', {
    ref: 'AboutStudent',
    localField: '_id',
    foreignField: 'userID'
})

userSchema.virtual('teacherbasicdetails', {
    ref: 'TeacherBasicDetail',
    localField: '_id',
    foreignField: 'userID'
})

userSchema.virtual('teacherotherdetails', {
    ref: 'TeacherOtherDetail',
    localField: '_id',
    foreignField: 'userID'
})

userSchema.virtual('teacherprofiles', {
    ref: 'TeacherProfile',
    localField: '_id',
    foreignField: 'userID'
})

userSchema.virtual('aboutteachers', {
    ref: 'AboutTeacher',
    localField: '_id',
    foreignField: 'userID'
})

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject
}

userSchema.statics.findByCredentials = async (username, password, usertype) => {
    const user = await User.findOne({ username })
    if (!user) {
        throw new Error('Invalid Username/Password!')
    }
    const isMatchPassword = await bcrypt.compare(password, user.password)
    if (!isMatchPassword) {
        throw new Error('Invalid Username/Password!')
    }
    const isMatchUsertype = usertype.toString() === user.usertype.toString()
    if (!isMatchUsertype) {
        throw new Error('Invalid Username/Password!')
    }
    return user
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'StudentPortal')
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User