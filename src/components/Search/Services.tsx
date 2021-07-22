import {API} from "aws-amplify";
import React, {useState} from "react";

import {getDentist} from "src/graphql/queries";


type Props = {
  setFindDentist: Function,
  getListDentists: Function,
  dentists?: any
  searchCoords?: any
  services?: any
  setSearchService: Function
}

const ServicesComponent: React.FunctionComponent<Props> = ({
   services,
   setFindDentist,
   getListDentists,
   dentists,
   setSearchService,
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
    setSearchService(e.target.value)

    if (e.target.value === 'choose service') {
      return getListDentists(e.target.value);
    }
    console.log(dentists)
    dentists.forEach((item: any) => {
      searchDent.push(getDentistsFind(item))
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
          if (distanceCur < 50) {
            distanceDent.push(dent)
          }
        }
      })
    })
    setFindDentist(distanceDent);
  }

  const getDentistsFind = async (dentist: { id: any; }) => {
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
