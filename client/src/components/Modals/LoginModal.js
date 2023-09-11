import React from 'react'
import "../modal.css"
import { Link } from "react-router-dom"

function Modal({ isOpen, onCancel, onConfirm }) {
  return (
    <div className={isOpen ? "modalBackground" : "modalBackground hidden"}>
      <div className='modalContainer'>
        <div className='titleCloseBtn'>
        <button onClick={onCancel}> x </button>
        </div>
        <div className='title'>
            <h2>Login to access this page!</h2>
        </div>
        <div className='footer'>
           <Link to="/signup"><button onClick={onConfirm}>Login</button></Link>
            <button onClick={onCancel} id='cancelBtn'>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default Modal
