import React from "react";
import {InputFormSettings, Label} from "../../../../styles/Form.module";

interface InputGroupProps {
  type: string
  title: string
  name: string
  placeholder: string
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
        className="input1 text-form1"
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        value={setValue}
      />
    </Label>
  )
}

export default InputGroup
