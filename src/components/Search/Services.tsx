import {API} from "aws-amplify";
import React, {useState} from "react";

import {getDentist} from "src/graphql/queries";


type Props = {
  currentService: any
  onHandleChange: any
  services?: any
}

const ServicesComponent: React.FunctionComponent<Props> = ({
   services,
   currentService,
   onHandleChange
  }) => {


  if (services && services.length === 0) {
    return (
      <>Services not found</>
    )
  }

  return (
    <select className="index-select arrows" name="services" id="services" value={currentService} onChange={onHandleChange}>
      <option value='choose service'>choose service</option>
      {services && services.map((data: any) => {
          return (
            <option key={data.id} value={data.name}>{data.name}</option>
          )
        }
      )}
    </select>
  )
}

export default ServicesComponent;
