const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const classroomSchema = new mongoose.Schema({
    Code: {
        type: String,
        required: true,
        unique: true
    },
    SubjectName: {
        type: String,
        required: true
    },
    FacultyName: {
        type: String,
        required: true
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})

const Classroom = mongoose.model('Classroom', classroomSchema)

module.exports = Classroom