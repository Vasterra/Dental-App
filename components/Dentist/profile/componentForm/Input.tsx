import React from "react";
import {InputFormSettings, Label} from "../../../../styles/Form.module";

interface InputGroupProps {
  type: any
  title: any
  name: any
  placeholder: any
  props: any
  setValue: any
}

const InputGroup: React.FC<InputGroupProps> = ({
   type,
   title,
   name,
   placeholder,
   props,
   setValue,
 }) => {

  return (
    <Label>{title}
      <InputFormSettings
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        value={setValue === null ? setValue = '' : setValue}
      />
    </Label>
  )
}

export default InputGroup
