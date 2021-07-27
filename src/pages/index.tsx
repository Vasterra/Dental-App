import { withSSRContext } from "aws-amplify";
import {v4 as uuidv4} from 'uuid';
import { GetServerSideProps } from "next";
import * as React from "react";
import { listDentists, listServiceForDentals } from "src/graphql/queries";
import Search from "./search";
import {generateRandomPoints} from "src/utils/generateUsers"
const IndexPage = ({dentistsData, listServiceForDentals}: any) => {
  return (
    <Search dentistsData={dentistsData} listServiceForDentals={listServiceForDentals}/>
  );
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const {API} = withSSRContext(context)
  let dentistsData;
  let listServiceForDentalsData;

  try {
    dentistsData = await API.graphql({
      query: listDentists,
      // @ts-ignore
      authMode: "AWS_IAM",
    });

    // var randomGeoPoints: any = generateRandomPoints({'lat':55.85, 'lng':37.71}, 2000, 40);

    listServiceForDentalsData = await API.graphql({
      query: listServiceForDentals,
      // @ts-ignore
      authMode: "AWS_IAM",
    });
  } catch (e) {
    console.log(e)
  }
  console.log(dentistsData)
  return {
    props: {
      // dentistsData: randomGeoPoints ? randomGeoPoints : null,
      dentistsData: dentistsData ? dentistsData.data.listDentists.items : null,
      listServiceForDentals: listServiceForDentalsData ? listServiceForDentalsData.data.listServiceForDentals.items : null
    }
  }
}

export default IndexPage;
