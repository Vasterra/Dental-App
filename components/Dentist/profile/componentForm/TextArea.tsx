import React from "react";
import styled from "styled-components";

const TextArea = styled("textarea")`{
  outline: none;
  margin: 0 0 15px 0;
  width: 100%;
  height: 90px;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  border: 1px solid #0d9da6;
  padding-left: 10px;
  display: flex;
  align-items: center;
  border-radius: 10px;
  &:focus {
    background: #0d9da6;
    color: #fff;
  }
`;

const Label = styled("label")`{
  text-align: left;
  font: normal normal normal 11px/15px Segoe UI;
  letter-spacing: 0;
  color: #000000;
`;

interface AreaGroupProps {
  title: string
  name: string
  placeholder: string
  props: any
  setValue: any
}

const AreaGroup: React.FC<AreaGroupProps> = ({
   title,
   name,
   placeholder,
   props,
   setValue,
 }) => {
  return (

    <Label>{title}
      <TextArea
        name={name}
        placeholder={placeholder}
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        value={setValue === null ? setValue = '' : setValue}
      />
    </Label>
  )
}

export default AreaGroup
