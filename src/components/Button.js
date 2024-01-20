import React, {useState} from 'react';
import "./styles/Button.css";

function Button({
  type,
  onClick,
  text
  }) {

    const [active, setActive] = useState(false);
    
    const fileBtn = () => {
      setActive(!active);
  }

  return (
    <button className={type} onClick={onClick}>{text}</button>
  )
}

export default Button