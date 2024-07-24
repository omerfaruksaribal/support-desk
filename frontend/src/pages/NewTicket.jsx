import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createTicket } from '../features/tickets/ticketSlice'
import BackButton from '../components/BackButton'

function NewTicket() {
  const {user} = useSelector((state) => state.auth)

  const [name] = useState(user.name)
  const [email] = useState(user.email)
  const [product, setProduct] = useState('iPhone')
  const [description, setDescription] = useState()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(createTicket({ product, description }))
      .unwrap()
      .then(() => {
        // We got a good response so navigate the user
        navigate('/tickets')
        toast.success('Destek talebi başarıyla oluşturuldu')
      })
      .catch(toast.error)
  }


  return (
    <>
        <section className='heading'>
            <h1>Yeni Destek Talebi</h1>
            <p>Lütfen gerekli tüm alanları doldurunuz</p>
        </section>

        <section className='form'>

          <div className="form-group">
            <label htmlFor="name">Müşteri İsmi</label>
            <input type="text" className="form-control" value={name} disabled />
          </div>

          <div className="form-group">
            <label htmlFor="email">Müşteri Emaili</label>
            <input type="text" className="form-control" value={email} disabled />
          </div>

          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="product">Ürün</label>
              <select name="product" id="product" value={product} onChange={(e) => setProduct(e.target.value)}>
                <option value="iPhone">iPhone</option>
                <option value="AirPods">AirPods</option>
                <option value="Macbook Air">Macbook Air</option>
                <option value="Macbook Pro">Macbook Pro</option>
                <option value="iPad">iPad</option>
                <option value="iMac">iMac</option>
            </select>
            </div>
            <div className="form-group">
              <label htmlFor="description">Problemi Açıklayınız</label>
              <textarea
                name="description"
                id="description"
                className='form-control'
                placeholder='Açıklama'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="form-group">
              <button className="btn btn-block">Gönder</button>
              <BackButton url='/'/>
            </div>
          </form>

        </section>
    </>
  )
}

export default NewTicket