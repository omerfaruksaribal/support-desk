const mongoose = require('mongoose')

// If we write userSchema = new Schema instead of mongoose.Schema, we must add that line.
const { Schema } = mongoose

// const userSchema = mongoose.Schema({}) 
const noteSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
      ticket: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Ticket',
      },
      text: {
        type: String,
        required: [true, 'Not giriniz.'],
      },
      isStaff: {
        type: Boolean,
        default: false,
      },
      staffId: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
  )

const Note = mongoose.model('Note', noteSchema)

module.exports = Note
