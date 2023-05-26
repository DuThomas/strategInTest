import React from "react"
import "../index.css"

const EmailInput = ({ placeholder, name, value, onChange }) => {
  return (
    <input
      type="email"
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      required
      className="input"
    />
  )
}

export default EmailInput
