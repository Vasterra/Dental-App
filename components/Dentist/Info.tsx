import React from "react";
import styled from "styled-components";

const DentistInfoWrapper = styled("div")`
  display: flex;
  flex-wrap: wrap;
  background: #FFFFFF 0 0 no-repeat padding-box;
  padding: 15px;
  border-radius: 10px;
  margin-right: 10px;
  width: 420px;
  height: 259px;
  margin-bottom: 10px;
`;

const DentistInfoBlock = styled("div")`
  width: 100px;
  //padding: 0 20px;
`;


const DentistInfoLabel = styled("div")`
  color: lightslategray;
  font-size: 14px;
  //padding: 5px 0;
`;

const DentistInfoData = styled("div")`
  font-size: 14px;
  font-weight: bold;
`;


type Props = {
  data: any,
}

const AvatarProfileComponent: React.FunctionComponent<Props> = ({data}) => {
  console.log(data)
  // const { dentist } = data;
  // const labels = [
  //   'Gender',
  //   'BirthDay',
  //   'Phone Number',
  //   'Street Address',
  //   'City',
  //   'Zip Code',
  //   'Member Status',
  //   'Registered Date'
  // ]

  return (
    <DentistInfoWrapper>
      <DentistInfoBlock>
        <DentistInfoLabel>Gender</DentistInfoLabel>
        <DentistInfoData>Female</DentistInfoData>
      </DentistInfoBlock>
      <DentistInfoBlock>
        <DentistInfoLabel>BirthDay</DentistInfoLabel>
        <DentistInfoData>17.08.1976</DentistInfoData>
      </DentistInfoBlock>
      <DentistInfoBlock>
        <DentistInfoLabel>Phone Number</DentistInfoLabel>
        <DentistInfoData>{data.phone}</DentistInfoData>
      </DentistInfoBlock>
      <DentistInfoBlock>
        <DentistInfoLabel>Street Address</DentistInfoLabel>
        <DentistInfoData>73 Richmond Road London E61 4GJ</DentistInfoData>
      </DentistInfoBlock>
      <DentistInfoBlock>
        <DentistInfoLabel>City</DentistInfoLabel>
        <DentistInfoData>{data.city}</DentistInfoData>
      </DentistInfoBlock>
      <DentistInfoBlock>
        <DentistInfoLabel>Zip Code</DentistInfoLabel>
        <DentistInfoData>{data.code}</DentistInfoData>
      </DentistInfoBlock>
      <DentistInfoBlock>
        <DentistInfoLabel>Member Status</DentistInfoLabel>
        <DentistInfoData>Active</DentistInfoData>
      </DentistInfoBlock>
      <DentistInfoBlock>
        <DentistInfoLabel>Registered Date</DentistInfoLabel>
        <DentistInfoData>17.08.1976</DentistInfoData>
      </DentistInfoBlock>
    </DentistInfoWrapper>
  )
}

export default AvatarProfileComponent
