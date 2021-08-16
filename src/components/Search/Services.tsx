import React, { useState } from 'react';

type Props = {
  services: any
  setServiceForSearch: any
}

const ServicesComponent: React.FunctionComponent<Props> = ({
     services,
     setServiceForSearch
   }) => {
  const [service, setService] = useState();

  if (services.length === 0) {
    return (
      <>Services not found</>
    );
  }

  const handleChange = (e: any) => {
    setService(e.target.value);
    setServiceForSearch(e.target.value);
  };

  return (
    <select className='index-select arrows' name='services' id='services' value={service} onChange={handleChange}>
      <option value='choose service'>choose service</option>
      {services.map((data: any) => {
          return (
            <option key={data.id} value={data.name}>{data.name}</option>
          );
        }
      )}
    </select>
  );
};

export default ServicesComponent;