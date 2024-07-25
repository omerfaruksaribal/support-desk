import React from 'react'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'
import { toast } from 'react-toastify'

function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        navigate('/')
        toast.success('Başarıyla Çıkış Yapıldı')
    }
  return (
    <header className='header'>
        <div className="logo">
            <Link to='/'>Yardım Masası</Link>
        </div>
        <ul>
            {user  ? (
                <ul>
                    <li>
                        <Link to='/tickets'>{user.name}</Link>
                    </li>
                    <li>
                        <button className='btn' onClick={onLogout}>
                            <FaSignOutAlt /> Çıkış Yap
                        </button>
                    </li>
                </ul>
            ) : (
                <>
                    <li>
                        <Link to='/login'>
                            <FaSignInAlt /> Giriş Yap
                        </Link>
                    </li>
                    <li>
                        <Link to='/register'>
                            <FaUser /> Kaydol
                        </Link>
                    </li>
                </>
            )}
        </ul>
    </header>
  )
}

export default Header