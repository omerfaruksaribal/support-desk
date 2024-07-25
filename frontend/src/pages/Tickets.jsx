import React, { useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTickets } from '../features/tickets/ticketSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import TicketItem from '../components/TicketItem'
import { Link } from 'react-router-dom'
import { FaQuestionCircle } from 'react-icons/fa'

function Tickets() {
    const { tickets } = useSelector((state) => state.tickets)

    const dispatch = useDispatch()

    // NOTE: only need one useEffect

    useEffect(() => {
        dispatch(getTickets())
    }, [dispatch])
    
    if (!tickets) {
        return <Spinner />
    }

  return (
    <>
        <BackButton />
        <h1>Destek Talepleri</h1>
        <div className="tickets">
            <div className="ticket-headings">
                <div>Tarih</div>
                <div>Ürün</div>
                <div>Durum</div>
            </div>
            {tickets.map((ticket) => (
                <TicketItem key={ticket._id} ticket={ticket}/>
            ))}
            <Link to='/new-ticket' className='btn btn-reverse btn-block'>
                <FaQuestionCircle /> Yeni bir destek talebi oluştur
            </Link>
        </div>
    </>
  )
}

export default Tickets