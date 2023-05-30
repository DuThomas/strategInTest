import React from 'react'
import "../index.css"
import { Link } from 'react-router-dom'

const InputContainer = ({ title, inputs, handleSubmit, error_msg, success_msg, btn_text, cancelPage }) => {
    return (
      <div className='login_container'>
        <form className="form_container" onSubmit={handleSubmit}>
          <h1>{title}</h1>
          {inputs.map((input, index) => (
          <React.Fragment key={index}>{input}</React.Fragment>
        ))}
          {error_msg && <div className="message error_msg">{error_msg}</div>}
          {success_msg && <div className="message success_msg">{success_msg}</div>}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <button type="submit" className="green_btn" onClick={handleSubmit}>
              {btn_text}
            </button>
            <Link to={cancelPage} className="red_btn">Annuler</Link>
          </div>
        </form>
      </div>
    )
  }
  
  export default InputContainer