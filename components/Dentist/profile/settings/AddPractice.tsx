import React, {useState} from 'react';
import {API} from "aws-amplify";
import {createPractice, deletePractice} from "../../../../graphql/mutations";
import {ListWrapper, Input, Item, ConfirmButton} from "../../../../styles/Profile.module";

type Props = {
  dentist: any,
  getDentist: Function,
}

const PractiseConfig: React.FunctionComponent<Props> = ({dentist, getDentist}) => {
  const [practice, setPractice] = useState('');
  const disabled = practice.length === 0;

  return (
    <>
      <div style={{textAlign: 'center'}}>
        Select a practises your provide
      </div>
      <Input type="text" name="practise" onChange={event => setPractice(event.target.value)}/>
      <ListWrapper>
        {
          dentist.practices.items.map((el, key) => {
            return (
              <Item key={key} onClick={async () => {
                await API.graphql({
                  query: deletePractice,
                  variables: {
                    input: {
                      id: el.id
                    }
                  },
                  // @ts-ignore
                  authMode: 'AWS_IAM'
                })
                getDentist();
              }}>{el.name}</Item>
            )
          })
        }
      </ListWrapper>
      {
        <ConfirmButton disabled={disabled} onClick={async () => {
          await API.graphql({
            query: createPractice,
            variables: {
              input: {
                name: practice,
                dentistId: dentist.id
              }
            },
            // @ts-ignore
            authMode: 'AWS_IAM'
          })
          getDentist();
        }}>Confirm</ConfirmButton>
      }
    </>
  )
}

export default PractiseConfig