import React, {useEffect, useState} from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { login, reset } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const { email, password } = formData
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user, isError, isLoading, isSuccess, message } = useSelector((state) => state.auth)

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    const onSubmit = (e) => {
        e.preventDefault()

        const userData = {
            email,
            password,
        }

        dispatch(login(userData))
    }

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        // Redirect 
        if (isSuccess || user) {
            navigate('/')
            toast.success('Başarıyla giriş yapıldı.')
        }

        dispatch(reset())
    }, [isError, isSuccess, user, message, navigate, dispatch])

    if (isLoading) {
        return <Spinner />
    }

  return (
    <>
    <section className='heading'>
        <h1>
            <FaSignInAlt /> Giriş Yap
        </h1>
        <p>Hesabınıza Giriş Yapın</p>
    </section>

    <section className='form'>
        <form onSubmit={onSubmit}>

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

export default Login