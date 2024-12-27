import React from 'react'
import { LabelComponentProps } from '@/Interfaces/Label'

const LabelComponent:React.FC<LabelComponentProps> = ({
  htmlFor, 
  className = '', 
  children
}) => {
  return (
    <label
    htmlFor={htmlFor}
    className={`block text-gray-700 text-sm font-bold mb-2 ${className}`}
  >
    {children}
  </label>
  )
}

export default LabelComponent