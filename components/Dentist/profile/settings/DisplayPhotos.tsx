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
  currentDentist: any,
}

const AddSettings: React.FunctionComponent<Props> = ({currentDentist}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPersonName(event.target.value as string[]);
  };

  const initialValues = {
    id: currentDentist.id,
    firstName: currentDentist.firstName,
    lastName: currentDentist.lastName,
    bio: currentDentist.bio,
    email: currentDentist.email,
    website: currentDentist.website,
    city: currentDentist.city,
    street: currentDentist.street,
    postIndex: currentDentist.postIndex,
    phone: currentDentist.phone,
    qualifications: currentDentist.qualifications,
    name: currentDentist.firstName + ' ' + currentDentist.lastName
  }

  return (
    <div className="profile-box-form">
      <p className="form-login-title green px20">Display Photos</p>
      <p className="form-login-subtitle gray px12 ">Information For Patients</p>
      <div className="box-2-box">
        <div className="profile-block-box">
          <div>
            <p className="form-profile-label">
              <label className="form-profile-label">Profile Picture</label>
            </p>
            <p className="row-content">
              <img  src="../../../../images/profile-image.jpg" alt="profile image" />
            </p>
          </div>
          <p className="row-content">
            <label className="button-green-file">Upload</label>
            <input type="file" className="input-file" name="profile_picture" id="profile_picture" />
          </p>
        </div>
        <div className="profile-block-box">
          <div>
            <p className="form-profile-label">
              <label className="form-profile-label">Cover</label>
            </p>
            <p className="profile-photo-box">
              <img className="image" src="../../../../images/cover-image.jpg" alt="cover image" />
            </p>
            <p className="row-content">
              <label className="button-green-file">Upload</label>
              <input type="file" className="input-file" name="cover_image" id="cover_image" />
            </p>
          </div>
          <div className="mt-30">
            <p className="form-profile-label">
              <label className="form-profile-label">Watermark</label>
            </p>
            <p className="profile-photo-box">
              <img className="image" src="../../../../images/empty-image.jpg" alt="watermark" />
            </p>
            <p className="row-content">
              <label className="button-green-file" >Upload</label>
              <input type="file" className="input-file" name="watermark" id="watermark" />
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddSettings
