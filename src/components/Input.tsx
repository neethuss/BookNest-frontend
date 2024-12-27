import InputComponentProps from '@/Interfaces/Input'
import { forwardRef } from 'react'

const InputComponent= forwardRef<HTMLInputElement, InputComponentProps>((props, ref) => {
  const { id, type = 'text', value, onChange, placeholder, disabled, className } = props;

  return (
    <input
    id={id}
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    disabled={disabled}
    className={className}
    ref={ref}  
  />
    )
})

InputComponent.displayName = 'InputComponent';

export default InputComponent
