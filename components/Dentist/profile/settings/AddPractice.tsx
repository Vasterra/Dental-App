import React, {useState} from 'react';
import {API} from "aws-amplify";
import {createPractice, deletePractice} from "../../../../graphql/mutations";
import {ListWrapper, Input, Item, ConfirmButton} from "../../../../styles/Profile.module";

type Props = {
  practices: any,
  getPractices: Function,
}

const PractiseConfig: React.FunctionComponent<Props> = ({practices, getPractices}) => {
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
          practices.map((el, key) => {
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
                getPractices();
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
                name: practice
              }
            },
            // @ts-ignore
            authMode: 'AWS_IAM'
          })
          getPractices();
        }}>Confirm</ConfirmButton>
      }
    </>
  )
}

export default PractiseConfig