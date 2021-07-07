import React from "react";
import {Formik} from "formik";
import DentistProfileInput from "../componentForm/Input";
import DentistProfileArea from "../componentForm/TextArea";
import {API} from "aws-amplify";
import {updateDentist} from "../../../../graphql/mutations";

type Props = {
  currentDentist: any,
  getDentist: Function,
}

const AddSettings: React.FunctionComponent<Props> = ({currentDentist, getDentist}) => {
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
  }

  return (
    <>
      <div className="profile-box-form">
        <p className="form-login-title green px20">Bio and Contact Information</p>
        <p className="form-login-subtitle gray px12 mb-6px">Information For Patients</p>
        {
          <Formik
            validateOnBlur={true}
            validateOnChange={true}
            onSubmit={async (data: any, {setErrors}) => {
              console.log('data', data)
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

              getDentist();
            }}
            initialValues={initialValues}
          >
            {props => (
              <form onSubmit={props.handleSubmit} style={{width: '100%'}}>
                <div className="box-2-box">
                  <div className="profile-block-box">
                    <div className="double-blocks">
                      <DentistProfileInput
                        title="Title"
                        name="title"
                        placeholder="Dr."
                        setValue=""
                        props={props}
                      />
                      <DentistProfileInput
                        title="Name"
                        name="firstName"
                        placeholder="John Smith"
                        setValue={props.values.firstName}
                        props={props}
                      />
                    </div>
                    <div>
                      <DentistProfileInput
                        title="Contact Email"
                        name="email"
                        placeholder="John.smith@dental.co.uk"
                        setValue={props.values.email}
                        props={props}
                      />
                    </div>
                    <div>
                      <DentistProfileInput
                        title="Qualifications"
                        name="qualifications"
                        placeholder=""
                        setValue={props.values.qualifications}
                        props={props}
                      />
                    </div>
                    <div>
                      <DentistProfileArea
                        title="Profile Bio"
                        name='bio'
                        placeholder="Profile Bio"
                        setValue={props.values.bio}
                        props={props}
                      />
                    </div>
                  </div>
                  <div className="profile-block-box">
                    <DentistProfileInput
                      title="Website Address"
                      name="website"
                      placeholder="dental.co.uk"
                      setValue={props.values.website}
                      props={props}
                    />
                    <DentistProfileInput
                      title="Phone"
                      name="phone"
                      placeholder="0203 123 4567"
                      setValue={props.values.phone}
                      props={props}
                    />
                    <p className="form-login-buttons">
                      <button className="button-green" type="submit">Confirm</button>
                    </p>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        }
      </div>
    </>
  )
};

export default AddSettings
