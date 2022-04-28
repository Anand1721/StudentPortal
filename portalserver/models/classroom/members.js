const mongoose = require('mongoose')

const membersSchema = new mongoose.Schema({
    Code: {
        type: String,
        required: true
    },
    Username: {
        type: String,
        required: true
    },
    Usertype: {
        type: String,
        required: true
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})

const Member = mongoose.model('Member', membersSchema)

module.exports = Member