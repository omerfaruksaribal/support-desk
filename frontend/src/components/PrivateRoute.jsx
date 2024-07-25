import React from 'react'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'

const PrivateRoute = ({ children }) => {
    const { user } = useSelector((state) => state.auth)

    if (user) return children

    return <Navigate to='/login'> {toast.error('Destek talebi oluşturmak için önce giriş yapınız.')} </Navigate>
}

export default PrivateRoute