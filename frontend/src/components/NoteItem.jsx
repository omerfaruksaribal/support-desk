import React from 'react'
import { useSelector } from 'react-redux'

function NoteItem({ note }) {
  const { user } = useSelector((state) => state.auth)

  return (
    <div
      className='note'
      style={{
        backgroundColor: note.isStaff ? 'rgba(0,0,0,0.7)' : '#fff',
        color: note.isStaff ? '#fff' : '#000',
      }}
    >
      <h4>{note.isStaff ? <span>Yetkili</span> : <span>{user.name}</span>} tarafından not</h4>
      <p>{note.text}</p>
      <div className='note-date'>
        {new Date(note.createdAt).toLocaleString('tr-TR')}
      </div>
    </div>
  )
}

export default NoteItem



