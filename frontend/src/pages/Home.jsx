import React from 'react'
import { Link } from 'react-router-dom'
import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa'

function Home() {
  return (
    <>
        <section className="heading">
            <h1>Size nasıl yardımcı olabiliriz?</h1>
            <p>Aşağıdaki seçeneklerden birini seçiniz</p>
        </section>

        <Link to='/new-ticket' className='btn btn-reverse btn-block'>
            <FaQuestionCircle /> Yeni bir destek talebi oluştur
        </Link>
        <Link to='/tickets' className='btn btn-block'>
            <FaTicketAlt /> Destek taleplerimi görüntüle
        </Link>
    </>
  )
}

export default Home