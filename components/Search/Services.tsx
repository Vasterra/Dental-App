import React, {useState} from "react";
import styled from "styled-components";

const ServiceWrapper = styled("div")`
  //margin: 10px 0;
`;

type Props = {
  getDentist: Function,
  dentists?: Array<string | boolean | number>
  searchDentistsLocations?: Array<string | boolean | number>
  searchCoords?: any
  services?: Array<string | boolean | number>
}

const ServicesComponent: React.FunctionComponent<Props> = ({services,getDentist, searchDentistsLocations, searchCoords}) => {

  const [service, setService] = useState();

  if (services.length === 0) {
    return (
      <>Services not found</>
    )
  }
  const handleChange = async (e) => {
    let distanceDent: any[] = [];
    if (e.target.value === 'choose service') {
      getDentist(searchDentistsLocations)
    }
    setService(e.target.value)

    services.forEach((value: any) => {
      if (value.id === e.target.value) {
        console.log(value)
        value.map(val => val.dentist).map((dent: { lng: any; lat: any; }) => {
          const a = {'Longitude': searchCoords.lng, 'Latitude': searchCoords.lat};
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
        {services.map((data: any) => {
            return (
              <option key={data.id} value={data.id}>{data.name}</option>
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
