import React from "react";
import {Formik} from "formik";
import {
  Chip,
  createStyles,
  Grid,
  makeStyles,
  MenuItem,
  Select,
  Theme,
  useTheme
} from "@material-ui/core";
import DentistProfileInput from "../componentForm/Input";
import DentistProfileArea from "../componentForm/TextArea";
import {BlockWrapperGreen} from "../../../../styles/Main.module";
import {ButtonBigGreen} from "../../../../styles/Button.module";
import {ButtonSubmitWrapper, Label} from "../../../../styles/Form.module";
import {API} from "aws-amplify";
import {updateDentist} from "../../../../graphql/mutations";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
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

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

type Props = {
  dentist: any,
}

const AddSettings: React.FunctionComponent<Props> = ({dentist}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPersonName(event.target.value as string[]);
  };

  const initialValues = {
    id: dentist.id,
    firstName: dentist.firstName,
    lastName: dentist.lastName,
    bio: dentist.bio,
    email: dentist.email,
    website: dentist.website,
    city: dentist.city,
    street: dentist.street,
    postIndex: dentist.postIndex,
    phone: dentist.phone,
    qualifications: dentist.qualifications
  }

  return (
    <BlockWrapperGreen>
      {
        <Formik
          validateOnBlur={true}
          validateOnChange={true}
          onSubmit={async (data: any, {setErrors}) => {
            console.log(dentist)
            try {
              await API.graphql({
                query: updateDentist,
                variables: {
                  input: data
                },
                // @ts-ignore
                authMode: 'AWS_IAM'
              })
            } catch (err) {
              setErrors(err);
            }
          }}
          initialValues={initialValues}
        >
          {props => (
            <form onSubmit={props.handleSubmit} style={{width: '100%'}}>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={12} lg={6}>
                  <DentistProfileInput
                    type="text"
                    title="Title"
                    setValue="Dr"
                    placeholder="Title"
                    name="title"
                    props={props}
                  />
                  <DentistProfileInput
                    type="text"
                    title="FirstName"
                    name='firstName'
                    setValue={props.values.firstName}
                    props={props}
                    placeholder="FirstName"
                  />
                  <DentistProfileInput
                    type="text"
                    title="LastName"
                    name='lastName'
                    setValue={props.values.lastName}
                    props={props}
                    placeholder="LastName"
                  />
                  <DentistProfileInput
                    type="text"
                    title="Contact Email"
                    name="email"
                    setValue={props.values.email}
                    props={props}
                    placeholder="Contact Email"
                  />
                  <DentistProfileArea
                    title="Profile Bio"
                    name='bio'
                    setValue={props.values.bio}
                    props={props}
                    placeholder="Profile Bio"
                  />
                </Grid>
                <Grid item xs={12} sm={12} lg={6}>
                  <DentistProfileInput
                    type="text"
                    title="Account Email"
                    name="email"
                    setValue={props.values.email}
                    props={props}
                    placeholder="Account Email"
                  />
                  <DentistProfileInput
                    type="text"
                    title="Dentist ID"
                    name='Dentist ID'
                    setValue="123456"
                    props={props}
                    placeholder="Dentist ID"
                  />
                  <DentistProfileInput
                    type="text"
                    title="Website Name"
                    name='website'
                    setValue={props.values.website}
                    props={props}
                    placeholder="Website Name"
                  />
                  <DentistProfileInput
                    type="text"
                    title="Website Name"
                    name='website'
                    setValue={props.values.website}
                    props={props}
                    placeholder="Website Name"
                  />
                  {/*<Label>Qualifications</Label>*/}
                  <Label style={{display: 'flex', flexDirection: 'column'}}>Qualifications
                    <Select
                      multiple
                      value={personName}
                      onChange={handleChange}
                      renderValue={(selected) => (
                        <div className={classes.chips}>
                          {(selected as string[]).map((value) => (
                            <Chip key={value} label={value} className={classes.chip}/>
                          ))}
                        </div>
                      )}
                      MenuProps={MenuProps}
                    >
                      {names.map((name) => (
                        <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </Label>
                </Grid>
              </Grid>
              <ButtonSubmitWrapper>
                <ButtonBigGreen onClick={() => {
                  props.resetForm()
                }}>Cancel</ButtonBigGreen>
                <ButtonBigGreen type="submit">Update Profile</ButtonBigGreen>
              </ButtonSubmitWrapper>
            </form>
          )}
        </Formik>
      }
    </BlockWrapperGreen>
  )
}

export default AddSettings
