const mongoose = require('mongoose')

// If we write userSchema = new Schema instead of mongoose.Schema, we must add that line.
const { Schema } = mongoose

// const userSchema = mongoose.Schema({}) 
const ticketSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Talep ismi gerekli.'],
        ref: 'User'
    },
    product: {
        type: String,
        required: [true, 'Ürün seçin.'],
        enum: ['iPhone', 'Macbook Pro', 'iMac', 'Macbook Air', 'iPad', 'AirPods'],
    },
    description: {
        type: String,
        required: [true, 'Problemle ilgili açıklama girin.']
    },
    status: {
        type: String,
        required: true,
        enum: ['new', 'open', 'closed'],
        default: 'new'
    }
}, 
    {
        timestamps: true,
    }   
)

const Ticket = mongoose.model('Ticket', ticketSchema)

module.exports = Ticket
