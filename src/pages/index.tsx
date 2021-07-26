import { withSSRContext } from "aws-amplify";
import { GetServerSideProps } from "next";
import * as React from "react";
import { listDentists, listServiceForDentals } from "src/graphql/queries";
import Search from "./search";

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
      dentistsData: dentistsData ? dentistsData.data.listDentists.items : null,
      listServiceForDentals: listServiceForDentalsData ? listServiceForDentalsData.data.listServiceForDentals.items : null
    }
  }
}

export default IndexPage;
