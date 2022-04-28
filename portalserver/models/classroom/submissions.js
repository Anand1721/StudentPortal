const mongoose = require('mongoose')

const submissionsSchema = new mongoose.Schema({
    Code: {
        type: String,
        required: true
    },
    TaskCode: {
        type: String
    },
    Username: {
        type: String,
        required: true
    },
    Usertype: {
        type: String,
        required: true
    },
    SubmissionName: {
        type: String
    },
    Submission: {
        type: Buffer
    },
    SubmissionStatus: {
        type: String
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})

const Submission = mongoose.model('Submission', submissionsSchema)

module.exports = Submission