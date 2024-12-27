import ButtonComponentProps from '@/Interfaces/Button'
import React from 'react'

const ButtonComponent:React.FC<ButtonComponentProps> = ({children,
  onClick,
  type = "button",
  disabled = false,
  className = "",}) => {
  return (
    <button onClick={onClick} type={type} disabled={disabled} className={className}>
      {children}
    </button>
  )
}

export default ButtonComponent