import React, {useState} from 'react';
import {API} from "aws-amplify";
import {createService, deleteService} from "../../../../graphql/mutations";
import {ListWrapper, Input, Item, ConfirmButton} from "../../../../styles/Profile.module";
import {Chip, createStyles, FormControl, InputLabel, makeStyles, MenuItem, Select, Theme, useTheme} from '@material-ui/core';
import { listServiceForDentals } from '../../../../graphql/queries';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%'
    },
    formControl: {
      margin: theme.spacing(1),
      width: '100%',
      minWidth: 120,
      maxWidth: 300,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  }),
);

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

type Props = {
  dentist: any,
  getDentist: Function,
}

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

const ServiceConfig: React.FunctionComponent<Props> = ({dentist, getDentist}) => {
  console.log(dentist.services.items)
  const classes = useStyles();
  const theme = useTheme();
  const [service, setService] = useState([]);
  const disabled = service.length === 0;
  const [personName, setPersonName] = useState();

  React.useEffect(() => {
    getListServiceForDentals()
    console.log(getServices())
  }, []);

  const getServices = () => {
    setPersonName(dentist.services.items.map(item => item.name))
  }

  const handleChange = async (event) => {
    setPersonName(event.target.value);
  };

  const getListServiceForDentals = async () => {
    const {data}: any = await API.graphql({
      query: listServiceForDentals,
      // @ts-ignore
      authMode: 'AWS_IAM'
    });
    setService(data.listServiceForDentals.items)
  }

  return (
    <>
      <div style={{textAlign: 'center'}}>
        Select a services your provide
      </div>
      <FormControl className={classes.formControl}>
        <Select
          variant="outlined"
          className={classes.root}
          onChange={handleChange}
        >
          {service.map((item: any) => (
            <MenuItem key={item.id} value={item.name} style={getStyles(item.name, personName, theme)}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <ListWrapper>
        {
          dentist.services.items.map((el, key) => {
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
                getDentist();
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
                name: personName,
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

export default ServiceConfig;

function theme(name: string, personName: string[], theme: any): React.CSSProperties {
  throw new Error('Function not implemented.');
}
