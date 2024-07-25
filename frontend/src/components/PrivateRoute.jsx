import React from 'react'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'

const PrivateRoute = ({ children, text }) => {
    const { user } = useSelector((state) => state.auth)

    if (user) return children

    return <Navigate to='/login'> {toast.error(text)} </Navigate>
}

export default PrivateRoute