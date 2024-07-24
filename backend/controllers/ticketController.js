const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')

// @desc    Get user ticket
// @route   GET /api/tickets
// @access  Private
const getTickets = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('Kullanıcı Bulunamadı.')
    }

    const tickets = await Ticket.find({user: req.user.id})

    res.status(200).json(tickets)
})

// @desc    Get user tickets
// @route   GET /api/tickets/:id
// @access  Private
const getTicket = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('Kullanıcı Bulunamadı.')
    }

    const ticket = await Ticket.findById(req.params.id)

    if (!ticket) {
        res.status(404)
        throw new Error('Talep bulunamadı.')
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Yetkilendirilmemiş Kullanıcı.')
    }

    res.status(200).json(ticket)
})


// @desc    Create user ticket
// @route   POST /api/tickets
// @access  Private
const createTicket = asyncHandler(async (req, res) => {
    const { product, description } = req.body

    if (!product || !description) {
        res.status(400)
        throw new Error('Lütfen bir ürün ve açıklama girinin.')
    }
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('Kullanıcı Bulunamadı.')
    }

    const ticket = await Ticket.create({
        product,
        description,
        user: req.user.id,
        status: 'yeni'
    })



    res.status(201).json(ticket)
})

// @desc    Delete user ticket
// @route   DELETE /api/tickets/:id
// @access  Private
const deleteTicket = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('Kullanıcı Bulunamadı.')
    }

    const ticket = await Ticket.findById(req.params.id)

    if (!ticket) {
        res.status(404)
        throw new Error('Talep bulunamadı.')
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Yetkilendirilmemiş Kullanıcı.')
    }

    await Ticket.findByIdAndDelete(req.params.id)

    res.status(200).json({ success: true })
})

// @desc    Update user ticket
// @route   PUT /api/tickets/:id
// @access  Private
const updateTicket = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('Kullanıcı Bulunamadı.')
    }

    const ticket = await Ticket.findById(req.params.id)

    if (!ticket) {
        res.status(404)
        throw new Error('Talep bulunamadı.')
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Yetkilendirilmemiş Kullanıcı.')
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { yeni: true })

    res.status(200).json(updatedTicket)
})

module.exports = {
    getTickets,
    getTicket,
    createTicket,
    deleteTicket,
    updateTicket,
}