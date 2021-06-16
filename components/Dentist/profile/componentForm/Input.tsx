import React from "react";

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

    <label className="label">{title}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="input1 text-form1"
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        value={setValue}
      />
      <style jsx>{`
        .label {
          text-align: left;
          font: normal normal normal 11px/15px Segoe UI;
          letter-spacing: 0px;
          color: #000000;
        }

        .input1 {
          outline: none;
          margin: 0 0 15px 0;
          width: 100%;
          height: 24px;
          background: #FFFFFF 0% 0% no-repeat padding-box;
          border: 1px solid #0d9da6;
          padding-left: 10px;
          display: flex;
          align-items: center;
          border-radius: 10px;
        }

        .input1:focus {
          background: #0d9da6;
          color: #fff;
        }

        .big-input {
          height: 51px;
        }

      `}</style>
    </label>
  )
}

export default InputGroup
