import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTicket, closeTicket } from '../features/tickets/ticketSlice'
import { getNotes, createNote } from '../features/notes/noteSlice'
import { useParams, useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import NoteItem from '../components/NoteItem'
import { toast } from 'react-toastify'
import Modal from 'react-modal'

const customStyles = {
    content: {
      width: '600px',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      position: 'relative',
    },
}

Modal.setAppElement('#root')


function Ticket() {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [noteText, setNoteText] = useState('')
    const { ticket } = useSelector((state) => state.tickets)
    const { notes } = useSelector((state) => state.notes)
    const { user } = useSelector((state) => state.auth)


    const dispatch = useDispatch()

    const {ticketId} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getTicket(ticketId)).unwrap().catch(toast.error)
        dispatch(getNotes(ticketId)).unwrap().catch(toast.error)
      }, [ticketId, dispatch])

  // Close ticket
  const onTicketClose = () => {
    dispatch(closeTicket(ticketId))
      .unwrap()
      .then(() => {
        toast.success('Destek başarıyla kapatıldı')
        navigate('/tickets')
      })
      .catch(toast.error)
  }

  // Create note submit
  const onNoteSubmit = (e) => {
    e.preventDefault()
    dispatch(createNote({ noteText, ticketId }))
      .unwrap()
      .then(() => {
        setNoteText('')
        closeModal()
      })
      .catch(toast.error)
  }
    // Open/Close modal
    const openModal = () => setModalIsOpen(true)
    const closeModal = () => setModalIsOpen(false)

    if (!ticket) {
        return <Spinner />
    }

  return (
    <div className="ticket-page">
        <header className="ticket-header">
            <BackButton url='/tickets'/>
            <h2>
                Destek ID: {ticket._id}
                <span className={`status status-${ticket.status}`}>
                    {ticket.status}
                </span>
            </h2>
            <h3>Talebi açan: {user.name}</h3>
            <h3>Talebin Açıldığı Tarih: {new Date(ticket.createdAt).toLocaleString('tr-TR')}</h3>
            <h3>Ürün: {ticket.product}</h3>
            <hr />
            <div className="ticket-desc">
                <h3>Hatanın Açıklaması:</h3>
                <p>{ticket.description}</p>
            </div>
            <h2>Notlar</h2>
        </header>

        {ticket.status !== 'kapalı' && (
            <button onClick={openModal} className='btn'>Not ekle</button>
        )}

        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel='Not Ekle'
        >
            <h2>Not Ekle</h2>
            <button className='btn-close' onClick={closeModal}>X</button>
            <form onSubmit={onNoteSubmit}>
                <div className="form-group">
                    <textarea
                        name="noteText"
                        id="noteText"
                        className='form-control'
                        placeholder='Not'
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                    ></textarea>
                </div>
                <div className="form-group">
                    <button className='btn' type='submit'>Gönder</button>
                </div>
            </form>
        </Modal>
        {notes ? (
            notes.map((note) => <NoteItem key={note._id} note={note}/>)
        ) : (
            <Spinner />
        )}

        {ticket.status !== 'kapalı' && (
            <button onClick={onTicketClose} className='btn btn-block btn-danger'>Desteği Kapat</button>
        )}
    </div>
  )
}

export default Ticket