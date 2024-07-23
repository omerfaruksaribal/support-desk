import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import {useAuthStatus} from  '../hooks/useAuthStatus'
import Spinner from './Spinner'
import { toast } from 'react-toastify'

const PrivateRoute = () => {
    const { loggedIn, loading } = useAuthStatus()

    if (loading) {
        return <Spinner />
    }



  return loggedIn ? <Outlet />
    : <Navigate to='/login'> {toast.error('Destek talebi oluşturmak için önce giriş yapınız.')} </Navigate>
}

export default PrivateRoute