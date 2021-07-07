import React from "react";

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
    <p className="form-profile-label">
      <label className="form-profile-label">{title}
        <textarea
          name={name}
          className="form-profile-input"
          // @ts-ignore
          cols="30" rows="3"
          placeholder={placeholder}
          onChange={props.handleChange}
          onBlur={props.handleBlur}
          value={setValue === null ? setValue = '' : setValue}
        />
      </label>
    </p>
  )
}

export default AreaGroup
