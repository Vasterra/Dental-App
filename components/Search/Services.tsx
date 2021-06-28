import {API} from "aws-amplify";
import React, {useState} from "react";
import styled from "styled-components";
import {getDentist} from "../../graphql/queries";

const ServiceWrapper = styled("div")`
  //margin: 10px 0;
`;

type Props = {
  setFindDentist: Function,
  getDentists: Function,
  dentists?: Array<string | boolean | number>
  searchDentistsLocations?: Array<string | boolean | number>
  searchCoords?: any
  services?: Array<string | boolean | number>
}

const ServicesComponent: React.FunctionComponent<Props> = ({
     services,
     setFindDentist,
     getDentists,
     dentists,
     searchDentistsLocations,
     searchCoords
   }) => {
  const [service, setService] = useState();
  const [findDentists, setFinDentists] = useState();
  const [findDentistOnService, setFindDentistOnService] = useState([]);

  if (services.length === 0) {
    return (
      <>Services not found</>
    )
  }
  const handleChange = async (e) => {
    let distanceDent: any[] = [];
    let searchDent: any[] = [];

    setService(e.target.value)

    if (e.target.value == 'choose service') {
      return getDentists(searchDentistsLocations)
    }

    dentists.forEach(item => {
      searchDent.push(getDentistsFind(item, e.target.value))
    })

    searchDent = await Promise.all(searchDent)
    searchDent.forEach(dent => {
      dent.services.items.forEach(val => {
        if (val.name == e.target.value) {
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
        }
      })
    })
    setFindDentist(distanceDent);
  }

  const getDentistsFind = async (dentist, currentService) => {
    const search = []
    const {data}: any = await API.graphql({
      query: getDentist,
      variables: {
        id: dentist.id
      },
      // @ts-ignore
      authMode: 'AWS_IAM'
    })
    // console.log('currentService', currentService)
    // data.getDentist.services.items.forEach(val => {
    //   val.name == currentService && search.push(data.getDentist)
    // })
    return data.getDentist
  }

  return (
    <ServiceWrapper>
      <select className="input-checkbox space-between" value={service} onChange={handleChange}>
        <option value='choose service'>choose service</option>
        {services.map((data: any) => {
            return (
              <option key={data.id} value={data.name}>{data.name}</option>
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
