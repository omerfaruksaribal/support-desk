import React from 'react'
import { Link } from 'react-router-dom'
import { FaHome } from 'react-icons/fa'
import '../index'

function PageNotFound() {
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
            <h1 className="text-base font-semibold text-indigo-600">404</h1>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Sayfa Mevcut Değil</h2>
            <p className="mt-6 text-base leading-7 text-gray-600">Aradığınız sayfa bulunamıyor...</p>
            <br />
            <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link to="/" className="btn btn-link">
                <FaHome className='homeIcon' />
                Ana Sayfa
            </Link>
            </div>
        </div>
    </main>
  )
}

export default PageNotFound