import React, {useState} from 'react';
import styled from "styled-components";
import {CreateServiceComponent, DeleteServiceComponent, useMeQuery} from "../../../../generated/apolloComponents";

const PracticeListWrapper = styled("div")`{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 30px;
`;

const Input = styled("input")`{
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #e0e0e0;
  margin: 10px;
  width: 250px;

  &:active {
    & + span {
      width: 100%;
    }
  }
}
`;

const ConfirmButton = styled("button")`{
  width: 170px;
  cursor: pointer;
  background: #fff;
  height: 37px;
  border-radius: 30px;
  border: 1px solid #0d9da6;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  color: #000;

  &:hover {
    background: #0d9da6;
    color: #fff;
  }
`;

const PracticeItem = styled("button")`{
  width: 250px;
  cursor: pointer;
  background: #fff;
  border-radius: 30px;
  border: 1px solid #0d9da6;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 5px;
  margin: 5px;
  color: #000;

  &:hover {
    background: #0d9da6;
    color: #fff;
  }
`;

const ServiceConfig = () => {

  const {data, loading, error, refetch} = useMeQuery();

  if (error) {
    return (
      <>Error</>
    )
  }

  const [newService, setNewService] = useState('')

  return (
    !loading ?
      <>
        <div style={{textAlign: 'center'}}>
          Select a service your provide
        </div>
        <Input type="text" name="service" onChange={event => setNewService(event.target.value)}/>
        <PracticeListWrapper>
          <DeleteServiceComponent>
            {/*//@ts-ignore*/}
            {(mutate: (arg0: { variables: { serviceId: number }; }) => any) => (
              data?.me?.services?.map((el, key) => {
                return (
                  <PracticeItem key={key} onClick={async () => {

                    await mutate({variables: {serviceId: Number(el.service.id)}});
                    refetch()
                  }}>{el.service.name}</PracticeItem>
                )
              })
            )}
          </DeleteServiceComponent>
        </PracticeListWrapper>
        <CreateServiceComponent>
          {(mutate: (arg0: { variables: { service: string; dentistId: number }; }) => any) => (
            <ConfirmButton onClick={async () => {
              await mutate({variables: {service: newService, dentistId: Number(data?.me?.id)}});
              refetch()
            }}>Confirm</ConfirmButton>
          )}
        </CreateServiceComponent>
      </>
:
  <>...Loading</>
);
}

export default ServiceConfig