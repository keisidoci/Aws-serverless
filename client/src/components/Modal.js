import React from 'react'
import "./modal.css"

function Modal({ isOpen, onCancel, onConfirm }) {
  return (
    <div className={isOpen ? "modalBackground" : "modalBackground hidden"}>
      <div className='modalContainer'>
        <div className='titleCloseBtn'>
        <button onClick={onCancel}> x </button>
        </div>
        <div className='title'>
            <h2>Are you sure you want to delete?</h2>
        </div>
        <div className='body'>
            <p>You can't undo the action!</p>
        </div>
        <div className='footer-m'>
            <button onClick={onConfirm}>Yes</button>
            <button onClick={onCancel} id='cancelBtn'>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default Modal
