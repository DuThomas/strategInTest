import React from "react"
import "../index.css"

const Input = ({ type, placeholder, name, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      required
      className="input"
    />
  )
}

export default Input
