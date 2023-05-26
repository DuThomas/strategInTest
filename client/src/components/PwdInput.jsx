import React from "react"
import "../index.css"

const PwdInput = ({ placeholder, name, value, onChange }) => {
  return (
    <input
      type="password"
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      required
      className="input"
    />
  )
}

export default PwdInput
