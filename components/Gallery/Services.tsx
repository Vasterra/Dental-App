import {API} from "aws-amplify";
import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {getDentist, listServiceForDentals} from "../../graphql/queries";

type Props = {
  services: any,
  saveService: Function,
}

const Services: React.FunctionComponent<Props> = ({saveService, services}) => {
  const [service, setService]: any = useState();

  const handleChange = async (e: any) => {
    setService(e.target.value)
    saveService(e.target.value)
  }
  console.log(services)
  return (
    <select className="gallery-select" name="services" id="services" value={service} onChange={handleChange}>
      <option value="" disabled selected>Select from your services</option>
      {services.map((data: any) => {
          return (
            <option key={data.id} value={data.name}>{data.name}</option>
          )
        }
      )}
    </select>
  )
}

export default Services;
