import { withSSRContext } from "aws-amplify";
import {v4 as uuidv4} from 'uuid';
import { GetServerSideProps } from "next";
import * as React from "react";
import { listDentists, listServiceForDentals } from "src/graphql/queries";
import Search from "./search";

const IndexPage = ({dentistsData, listServiceForDentals}: any) => {

  return (
    <Search dentistsData={dentistsData} listServiceForDentals={listServiceForDentals}/>
  );
}

function generateRandomPoints(center: { lat: any; lng: any; }, radius: number, count: number) {
  var points = [];
  for (var i=0; i<count; i++) {
    points.push(generateRandomPoint(center, radius));
  }
  return points;
}


/**
 * Generates number of random geolocation points given a center and a radius.
 * Reference URL: http://goo.gl/KWcPE.
 * @param  {Object} center A JS object with lat and lng attributes.
 * @param  {number} radius Radius in meters.
 * @return {Object} The generated random points as JS object with lat and lng attributes.
 */
function generateRandomPoint(center: { lng: any; lat: any; }, radius: number) {
  var x0 = center.lng;
  var y0 = center.lat;
  // Convert Radius from meters to degrees.
  var rd = radius/111300;

  var u = Math.random();
  var v = Math.random();

  var w = rd * Math.sqrt(u);
  var t = 2 * Math.PI * v;
  var x = w * Math.cos(t);
  var y = w * Math.sin(t);

  var xp = x/Math.cos(y0);

  // Resulting point.
  return {
    address: null,
    bio: "h6н55675675каа ввтраногнагнагнаганре",
    city: null,
    createdAt: "2021-07-23T10:00:50.668Z",
    customerID: null,
    email: "kerix67585@activesniper.com",
    firstName: "еккееккекекекекее",
    hasPaidPlan: null,
    id: uuidv4(),
    images: {nextToken: null},
    lastName: null,
    lat: y+y0,
    lng: xp+x0,
    locations: {nextToken: null},
    paymentMethodID: null,
    phone: null,
    postIndex: null,
    qualifications: "апрпарапра",
    registered: true,
    services: {nextToken: null},
    street: null,
    subscriptionID: null,
    updatedAt: "2021-07-23T10:16:03.048Z",
    website: null,
  }
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const {API} = withSSRContext(context)
  let dentistsData;
  let listServiceForDentalsData;

  try {
    // dentistsData = await API.graphql({
    //   query: listDentists,
    //   // @ts-ignore
    //   authMode: "AWS_IAM",
    // });



    var randomGeoPoints: any = generateRandomPoints({'lat':55.85, 'lng':37.71}, 2000, 1000);

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
      dentistsData: randomGeoPoints ? randomGeoPoints : null,
      listServiceForDentals: listServiceForDentalsData ? listServiceForDentalsData.data.listServiceForDentals.items : null
    }
  }
}

export default IndexPage;
