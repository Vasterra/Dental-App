import React, {useEffect, useState} from "react";
import {useServicesQuery} from "../../generated/apolloComponents";
import styled from "styled-components";
import {API} from "aws-amplify";
import {listServices} from "../../graphql/queries";


const ServiceWrapper = styled("div")`
  //margin: 10px 0;
`;

type Props = {
  getDentist: Function,
  dentists?: Array<string | boolean | number>
  searchDentistsLocations?: Array<string | boolean | number>
  searchCoords?: Object
}

const ServicesComponent: React.FunctionComponent<Props> = ({getDentist, searchDentistsLocations, searchCoords}) => {
  const [services, setServices] = useState([])
  const [service, setService] = useState();

  useEffect(() => {
    fetchServices()
  }, [])

  async function fetchServices() {
    const servicesData : any = await API.graphql({
      query: listServices
    })
    setServices(servicesData)
    console.log(servicesData)
  }

  if (services.length === 0) {
    return (
      <>Services not found</>
    )
  }
  // @ts-ignore
  const handleChange = async (e) => {
    let distanceDent: any[] = [];
    if (e.target.value === 'choose service') {
      getDentist(searchDentistsLocations)
    }
    setService(e.target.value)
    // @ts-ignore
    services.forEach((value) => {
      if (value.id === e.target.value) {
        value.dentistConnection.map(val => val.dentist).map((dent: { lng: any; lat: any; }) => {
          // @ts-ignore
          const a = {'Longitude': searchCoords?.lng, 'Latitude': searchCoords?.lat};
          const b = {'Longitude': dent.lng, 'Latitude': dent.lat};
          const distanceCur = (111.111 *
            (180 / Math.PI) * (
              Math.acos(Math.cos(a.Latitude * (Math.PI / 180))
                * Math.cos(b.Latitude * (Math.PI / 180))
                * Math.cos((a.Longitude - b.Longitude) * (Math.PI / 180))
                + Math.sin(a.Latitude * (Math.PI / 180))
                * Math.sin(b.Latitude * (Math.PI / 180)))))
          if (distanceCur < 100) {
            distanceDent.push(dent)
          }
        })
        getDentist(distanceDent);
      }
    })
  }

  return (
 <ServiceWrapper>
      <select className="input-checkbox space-between" value={service} onChange={handleChange}>
        <option value='choose service'>choose service</option>
        {services.map((data) => {
            return (
              <option key={data.id} value={data.id}>{data.service}</option>
            )
          }
        )}
      </select>
      <style jsx>{`
        .input-checkbox {
          appearance: none;
          width: 100%;
          //max-width: 100%;
          height: 47px;
          background: #FFFFFF 0 0 no-repeat padding-box;
          border-radius: 30px;
          border: 1px solid #0d9da6;
          text-align: left;
          font: normal normal normal 16px/21px Segoe UI;
          letter-spacing: 0;
          color: #000000;
          display: flex;
          align-items: center;
          padding: 0 15px;
          //margin-right: 30px;
        }

        .input-checkbox:focus {
          outline: none;
        }

        .input-checkbox::before {
          width: 100%;
        }

      `}</style>
    </ServiceWrapper>
  )
}

export default ServicesComponent;
