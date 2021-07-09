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
  dentists?: any
  searchDentistsLocations?: any
  searchCoords?: any
  services?: any
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
  const handleChange = async (e: any) => {
    let distanceDent: any[] = [];
    let searchDent: any[] = [];

    setService(e.target.value)

    if (e.target.value == 'choose service') {
      return getDentists(searchDentistsLocations)
    }

    dentists.forEach((item: any) => {
      searchDent.push(getDentistsFind(item, e.target.value))
    })

    searchDent = await Promise.all(searchDent)
    searchDent.forEach(dent => {
      dent.services.items.forEach((val: { name: any; }) => {
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

  const getDentistsFind = async (dentist: { id: any; }, currentService: any) => {
    const search = []
    const {data}: any = await API.graphql({
      query: getDentist,
      variables: {
        id: dentist.id
      },
      // @ts-ignore
      authMode: 'AWS_IAM'
    })
    return data.getDentist
  }

  return (
      <select className="index-select arrows" name="services" id="services" value={service} onChange={handleChange}>
        <option value='choose service'>choose service</option>
        {services.map((data: any) => {
            return (
              <option key={data.id} value={data.name}>{data.name}</option>
            )
          }
        )}
      </select>
  )
}

export default ServicesComponent;
