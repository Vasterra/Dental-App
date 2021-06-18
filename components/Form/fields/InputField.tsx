import {FieldProps} from "formik";
import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";
import styled from "styled-components";

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;


const Input = styled("input")`{
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #e0e0e0;
  margin: 10px;
  width: 300px;
  &:active {
    & + span {
      width: 100%;
    }
  }
  } 
`;

const Span = styled("div")` {
  transform: translate(1.55rem,100%) scale(0.8);
  width:  ${props => props.title ? props.title.length + 10 : 10}%;
  padding: 0 10px;
  background: #fff;
  text-align: center;
  }
`;


export const InputField = ({
  field,
  form: { errors, touched },
  ...props
}: FieldProps & InputProps) => {
  const errorMessage = touched[field.name] && errors[field.name];


  return (
    // @ts-ignore
    <div><Span {...props}>{props.title}</Span><Input {...field} {...props} />
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
    </div>
  );
};
