const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const studentAuth = require('../middleware/auth-student')
const teacherAuth = require('../middleware/auth-teacher')
const router = new express.Router()

router.post('/user-login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.username, req.body.password, req.body.usertype)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

router.post('/admin-logout', auth, async (req, res) => {
    try {
        req.admin.tokens = []
        await req.admin.save()
        res.status(200).send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/student-logout', studentAuth, async (req, res) => {
    try {
        req.student.tokens = []
        await req.student.save()
        res.status(200).send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/teacher-logout', teacherAuth, async (req, res) => {
    try {
        req.teacher.tokens = []
        await req.teacher.save()
        res.status(200).send()
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router