import React, {useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux'
import { register } from '../features/auth/authSlice';
import {useNavigate} from 'react-router-dom'
import Spinner from '../components/Spinner'

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    })
    const { name, email, password, password2 } = formData

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const { isLoading } = useSelector(state => state.auth)


    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    const onSubmit = (e) => {
        e.preventDefault()
    
        if (password !== password2) {
          toast.error('Passwords do not match')
        } else {
          const userData = {
            name,
            email,
            password,
          }
    
          dispatch(register(userData))
            .unwrap()
            .then((user) => {
              toast.success(`Hesabınız başarıyla kaydedilmiştir - ${user.name}`)
              navigate('/')
            })
            .catch(toast.error)
        }
      }

    if (isLoading) {
        return <Spinner />
    }

  return (
    <>
    <section className='heading'>
        <h1>
            <FaUser /> Kaydol
        </h1>
        <p>Yeni Bir Hesap Oluşturun</p>
    </section>

    <section className='form'>
        <form onSubmit={onSubmit}>
            <div className='form-group'>
                <input
                    type="text"
                    className='form-control'
                    id='name'
                    value={name}
                    name='name'
                    onChange={onChange}
                    placeholder='İsminizi giriniz'
                    required
                />
            </div>

            <div className='form-group'>
                <input
                    type="email"
                    className='form-control'
                    id='email'
                    value={email}
                    name='email'
                    onChange={onChange}
                    placeholder='E-mailinizi giriniz'
                    required
                />
            </div>
            <div className='form-group'>
                <input
                    type="password"
                    className='form-control'
                    id='password'
                    value={password}
                    name='password'
                    onChange={onChange}
                    placeholder='Şifrenizi giriniz'
                    required
                />
            </div>
            <div className='form-group'>
                <input
                    type="password"
                    className='form-control'
                    id='password2'
                    value={password2}
                    name='password2'
                    onChange={onChange}
                    placeholder='Şifrenizi tekrar giriniz'
                    required
                />
            </div>
            <div className="form-group">
                <button className="btn btn-block">
                    Gönder
                </button>
            </div>
        </form>
    </section>
    </>
  )
}

export default Register