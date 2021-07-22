import React from "react";
import styled from "styled-components";

type Props = {
    title: string,
}

 const ButtonFormComponent: React.FunctionComponent<Props> = ({title}) => {
    return (
        <div className="button-form-wrapper">
            <button className="button-form" type="submit">
                {title}
            </button>
        </div>
    )
}
export default ButtonFormComponent
