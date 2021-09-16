import React from "react";
import { withSSRContext } from 'aws-amplify';
import { GetServerSideProps } from 'next';
import { getDentist } from '../graphql/queries';

const CurrentDentistContext = React.createContext('defaultValue');

const CurrentDentistProvider = ({ children, dentist }: any) => {
  console.log(dentist);
  return (
    <CurrentDentistContext.Provider value={dentist}>
      {children}
    </CurrentDentistContext.Provider>
  );
};

// @ts-ignore
export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const { API } = withSSRContext(context);
  let dentistData;
  try {
    if (context.params.slug[0] === null) return;
    dentistData = await API.graphql({
      query: getDentist,
      variables: {
        id: context.params.slug[0]
      },
      authMode: 'AWS_IAM'
    });
  } catch (e: any) {
    console.log(e);
  }
  return {
    props: {
      dentist: dentistData ? dentistData.data.getDentist : null
    }
  };
};

export { CurrentDentistContext, CurrentDentistProvider };