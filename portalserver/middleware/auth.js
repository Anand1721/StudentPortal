const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        const token = req.header('authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'StudentPortal')
        const admin = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        if (!admin) {
            throw new Error()
        }
        req.admin = admin
        req.token = token
        next()
    } catch (e) {
        res.status(401).send({'error': 'Please authenticate!'})
    }
}

module.exports = auth