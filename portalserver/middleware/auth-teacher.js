const jwt = require('jsonwebtoken')
const User = require('../models/user')

const teacherAuth = async (req, res, next) => {
    try {
        const token = req.header('authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'StudentPortal')
        const teacher = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        if (!teacher) {
            throw new Error()
        }
        req.teacher = teacher
        req.token = token
        next()
    } catch (e) {
        res.status(401).send({'error': 'Please authenticate!'})
    }
}

module.exports = teacherAuth