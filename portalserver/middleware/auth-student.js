const jwt = require('jsonwebtoken')
const User = require('../models/user')

const studentAuth = async (req, res, next) => {
    try {
        const token = req.header('authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'StudentPortal')
        const student = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        if (!student) {
            throw new Error()
        }
        req.student = student
        req.token = token
        next()
    } catch (e) {
        console.log(e)
        res.status(401).send({'error': 'Please authenticate!'})
    }
}

module.exports = studentAuth