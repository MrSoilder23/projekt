import React from 'react';
import "./styles/Button.css";

function Button({
  className,
  onClick,
  text,
  key
  }) {

  return (
    <button key={key} className={className} onClick={onClick}>{text}</button>
  )
}

export default Button