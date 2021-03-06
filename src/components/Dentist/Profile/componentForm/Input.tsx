import React from "react";

interface InputGroupProps {
  title: any
  name: any
  placeholder: any
  props: any
  setValue: any
}

const InputGroup: React.FC<InputGroupProps> = ({
   title,
   name,
   placeholder,
   props,
   setValue,
 }) => {

  return (
    <p className="form-profile-label">
      <label className="form-profile-label" htmlFor="title">{title}</label>
      <input className="form-profile-input"
         name={name}
         placeholder={placeholder}
         onChange={props.handleChange}
         onBlur={props.handleBlur}
         maxLength={props?.maxLength}
         value={setValue === null ? setValue = '' : setValue}
      />
    </p>
  )
}

export default InputGroup
