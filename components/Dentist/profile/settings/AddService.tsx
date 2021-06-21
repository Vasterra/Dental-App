import React, {useState} from 'react';
import {API} from "aws-amplify";
import {createService, deleteService} from "../../../../graphql/mutations";
import {ListWrapper, Input, Item, ConfirmButton} from "../../../../styles/Profile.module";

type Props = {
  services: any,
  getServices: Function,
}

const ServiceConfig: React.FunctionComponent<Props> = ({services, getServices}) => {
  const [service, setService] = useState('');
  const disabled = service.length === 0;

  return (
    <>
      <div style={{textAlign: 'center'}}>
        Select a services your provide
      </div>
      <Input type="text" name="practise" onChange={event => setService(event.target.value)}/>
      <ListWrapper>
        {
          services.map((el, key) => {
            return (
              <Item key={key} onClick={async () => {
                await API.graphql({
                  query: deleteService,
                  variables: {
                    input: {
                      id: el.id
                    }
                  },
                  // @ts-ignore
                  authMode: 'AWS_IAM'
                })
                getServices();
              }}>{el.name}</Item>
            )
          })
        }
      </ListWrapper>
      {
        <ConfirmButton disabled={disabled} onClick={async () => {
          await API.graphql({
            query: createService,
            variables: {
              input: {
                name: service
              }
            },
            // @ts-ignore
            authMode: 'AWS_IAM'
          })
          getServices();
        }}>Confirm</ConfirmButton>
      }
    </>
  )
}

export default ServiceConfig;