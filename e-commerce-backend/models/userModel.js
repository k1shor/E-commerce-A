const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true

    },
    email:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    confirmPassword: {
        type: String,
        required: true,
        trim: true,
    },
    dob: {
        type: Date,
        // required: true,
    },

    city: {
        type: String,
        enum: ['Kathmandu', 'Lalitpur', 'Pokhara', 'Bhaktapur', 'Biratnagar'],
        required: true,
    },
    image: {
        type: String,
    },
    role: {
        type: Number,
        default: 0

    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })



module.exports = mongoose.model('User', userSchema)
