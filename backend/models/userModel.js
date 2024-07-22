const mongoose = require('mongoose')

// If we write userSchema = new Schema instead of mongoose.Schema, we must add that line.
const { Schema } = mongoose

// const userSchema = mongoose.Schema({}) 
const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'İsim gerekli.']
    },
    email: {
        type: String,
        required: [true, 'E-posta gerekli.'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Şifre gerekli.']
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
}, 
    {
        timestamps: true,
    }   
)

const User = mongoose.model('User', userSchema)

module.exports = User
