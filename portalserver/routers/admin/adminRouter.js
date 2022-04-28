const express = require('express')
const User = require('../../models/user')
const auth = require('../../middleware/auth')
const router = new express.Router()

router.post('/admin/add-login', auth, async (req, res) => {
    console.log(req.body)
    try {
        const user = await new User(req.body)
        await user.save()
        res.status(201).send({ user })
    } catch (e) {
        res.status(400).send()
    }
})

module.exports = router