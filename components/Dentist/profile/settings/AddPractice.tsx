import React, {useState} from 'react';
import styled from "styled-components";
import {
  CreatePracticeComponent, DeletePracticeComponent,
  useMeQuery
} from "../../../../generated/apolloComponents";

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

  const [newPractice, setNewPractice] = useState('')

  return (
    !loading ?
      <>
        <div style={{textAlign: 'center'}}>
          Add the services the dentists can select from:
        </div>
        <Input type="text" name="service" onChange={event => setNewPractice(event.target.value)}/>
        <PracticeListWrapper>
          <DeletePracticeComponent>
            {/*//@ts-ignore*/}
            {(mutate: (arg0: { variables: { practiceId: number }; }) => any) => (
              data?.me?.practices?.map((el, key) => {
                return (
                  <PracticeItem key={key} onClick={async () => {
                    await mutate({variables: {practiceId: Number(el.practice.id)}});
                    refetch()
                  }}>{el.practice.name}</PracticeItem>
                )
              })
            )}
          </DeletePracticeComponent>
        </PracticeListWrapper>
        <CreatePracticeComponent>
          {(mutate: (arg0: { variables: { practice: string; dentistId: number }; }) => any) => (
            <ConfirmButton onClick={async () => {
              await mutate({variables: {practice: newPractice, dentistId: Number(data?.me?.id)}});
              refetch()
            }}>Confirm</ConfirmButton>
          )}
        </CreatePracticeComponent>
      </>
:
  <>...Loading</>
);
}

export default ServiceConfig