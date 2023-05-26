import React from 'react'

const UserForm = ({ title, inputs, handleSubmit, error_msg, success_msg, btn_text }) => {
    return (
      <form className="form_container" onSubmit={handleSubmit}>
        <h1>{title}</h1>
        {inputs.map((input, index) => (
        <React.Fragment key={index}>{input}</React.Fragment>
      ))}
        {error_msg && <div className="message error_msg">{error_msg}</div>}
        {success_msg && <div className="message success_msg">{success_msg}</div>}
        <button type="submit" className="green_btn" onClick={handleSubmit}>
          {btn_text}
        </button>
      </form>
    )
  }
  
  export default UserForm