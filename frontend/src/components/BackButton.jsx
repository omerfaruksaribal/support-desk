import React from 'react'
import { FaArrowCircleLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const BackButton = ({url}) => {
  const navigate = useNavigate()
  return (
    <button className="btn btn-reverse btn-back" onClick={() => navigate(-1)}>
      <FaArrowCircleLeft /> Geri
    </button>
  )
}

export default BackButton
