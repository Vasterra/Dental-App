import React from "react";
import styled from "styled-components";
import {Grid} from "@material-ui/core";

const DentistSettingBlockWrapper = styled("div")`{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid #0d9da6;
  border-radius: 10px;
  padding: 20px;
`;

const AddWatermark = () => {
  return (
    <>
      <DentistSettingBlockWrapper>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} lg={6}>
            <p className="text-form2">Profile Thumbnail</p>
            <p><i className="fas fa-user-circle"></i></p>
            <button className="button-medium">Upload Thumbnail</button>
            <p className="stripe"></p>
            <p className="text-form2">Custom Watermark</p>
            <p className="big-square">WATERMARK IMAGE</p>
            <button className="button-medium">Upload Thumbnail</button>
          </Grid>
          <Grid item xs={12} sm={12} lg={6}>
            <p className="h2">Featured Image</p>
            <p className="water"><img className="image" src="/zub.jpeg" alt="image"/>
              <span className="watermark">watermark</span>
            </p>
            <button className="button-big">Select Featured Image</button>
          </Grid>
        </Grid>
      </DentistSettingBlockWrapper>
      <style jsx>{`

        * {
          box-sizing: border-box;

        }

        button:hover {
          box-shadow: 0 0 5px #ccc;
          cursor: pointer;
        }

        .flex-end {
          display: flex;
          justify-content: flex-end;
        }

        .container {
          margin: 0 auto;
          width: 99%;
          box-shadow: 0 0 10px #ccc;
          background: #E7E7E7;
        }

        .box {
          max-width: 100%;
        }

        .profile {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;

        }

        .main {
          width: 100%;
          padding: 10px;
          background: #F0F0F0 0% 0% no-repeat padding-box;
        }

        .h2 {
          text-align: left;
          font: normal normal normal 20px/27px Segoe UI;
          letter-spacing: 0px;
          color: #000000;
        }

        .h3 {
          text-align: left;
          font: normal normal normal 16px/21px Segoe UI;
          letter-spacing: 0px;
          color: #000000;
        }

        .text-form1 {
          text-align: left;
          font: normal normal normal 11px/15px Segoe UI;
          letter-spacing: 0px;
          color: #000000;
        }

        .text-form2 {
          text-align: left;
          font: normal normal normal 13px/17px Segoe UI;
          letter-spacing: 0px;
          color: #000000;
        }

        .block1 {
          background: transparent;
          border-radius: 10px;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          align-items: flex-start;
        }

        .block2 {
          /* width: 650px; */
          max-width: 100%;
          height: 900px;
          max-height: 100%;
          background: #FFFFFF 0% 0% no-repeat padding-box;
          margin: 60px 20px 60px 20px;
          padding: 40px;
        }

        .block1-form1,
        .block1-form2,
        .block2-form1 {
          background: #FFFFFF 0% 0% no-repeat padding-box;
          display: flex;
          width: 100%;
          border-radius: 10px;
          margin-bottom: 10px;
        }

        .block2-form2 {
          margin-top: 98px;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
        }

        .block2-form3 {
          margin-top: 80px;
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: flex-start;
        }

        .column-center {
          border: 1px solid #0d9da6;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          align-self: stretch;
          width: 48%;
          padding: 15px;
          margin: 15px 0;
          text-align: center;
          border-radius: 10px;
        }

        .column-between {
          border: 1px solid #0d9da6;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          align-self: stretch;
          width: 48%;
          padding: 15px;
          margin: 15px 0;
          text-align: center;
          border-radius: 10px;
        }

        .padding {
          padding: 15px;
        }

        .input1 {
          outline: none;
          margin: 0 0 15px 0;
          width: 230px;
          height: 24px;
          background: #FFFFFF 0% 0% no-repeat padding-box;
          border: 1px solid #0d9da6;
          padding-left: 10px;
          display: flex;
          align-items: center;
          border-radius: 10px;
        }

        .input1:focus {
          background: #0d9da6;
          color: #fff;
        }

        .input2 {
          outline: none;
          border-radius: 10px;
          margin: 0 0 15px 0;
          width: 176px;
          max-width: 100%;
          height: 26px;
          background: #FFFFFF 0% 0% no-repeat padding-box;
          border: 1px solid #0d9da6;
          padding-left: 10px;
          display: flex;
          align-items: center;
        }


        .big-input {
          height: 51px;
        }

        .super-input {
          cursor: pointer;
          border-radius: 10px;
          margin-top: 0;
          margin-left: 10px;
          width: 328px;
          max-width: 100%;
          height: 28px;
          background: #FFFFFF 0% 0% no-repeat padding-box;
          border: 1px solid #0d9da6;
          padding-left: 10px;
          display: flex;
          align-items: center;
          text-align: left;
          font: normal normal normal 16px/21px Segoe UI;
          letter-spacing: 0px;
          color: #000;
        }

        .super-input:hover {
          background: #0d9da6;
          color: #fff;
        }

        .button-small {
          cursor: pointer;
          padding: 2px 10px;
          height: 19px;
          background: #0d9da6 0% 0% no-repeat padding-box;
          border: 1px solid #0d9da6;
          text-align: left;
          font: normal normal normal 8px/10px Segoe UI;
          letter-spacing: 0px;
          color: #fff;
          border-radius: 10px;
        }

        .button-small:hover {
          background: #fff;
          color: #0d9da6;
        }

        .button-medium {
          cursor: pointer;
          width: 91px;
          height: 18px;
          background: #FFFFFF 0% 0% no-repeat padding-box;
          border: 1px solid #0d9da6;
          text-align: left;
          font: normal normal normal 9px/10px Segoe UI;
          letter-spacing: 0px;
          color: #000;
          border-radius: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .button-medium:hover {
          background: #0d9da6;
          color: #fff;
        }

        .button-big {
          cursor: pointer;
          /* width: 205px; */
          margin: 0 10px;
          padding-left: 20px;
          padding-right: 20px;
          height: 35px;
          background: #FFFFFF 0% 0% no-repeat padding-box;
          border: 1px solid #0d9da6;
          border-radius: 20px;
          text-align: left;
          font: normal normal normal 14px/21px Segoe UI;
          letter-spacing: 0px;
          color: #000;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .button-big:hover {
          background: #0d9da6;
          color: #fff;
        }

        .stripe {
          width: 229px;
          height: 0px;
          border: 1px solid #D5D5D5;

        }

        .big-square {
          width: 204px;
          height: 49px;
          background: #E1E1E1 0% 0% no-repeat padding-box;
          border: 1px solid #707070;
          text-align: left;
          font: normal normal normal 13px/17px Segoe UI;
          letter-spacing: 0px;
          color: #A2A2A2;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .fa-user-circle {
          margin: 0;
          font-size: 60px;
          color: #858585;
        }

        .image {
          width: 190px;
        }

        .water {

          position: relative;
        }

        .watermark {
          position: absolute;
          bottom: 10px;
          right: 10px;
          text-align: left;
          font: normal normal normal 13px/17px Segoe UI;
          letter-spacing: 0px;
          color: #E4E4E4;
        }

        .space-between {
          display: flex;
          justify-content: space-between;
        }

        .delete {
          padding-right: 5px;
          font-weight: bold;
          font-size: 12px;
        }

        .delete-big {
          padding-right: 5px;
          font-weight: bold;
          font-size: 20px;
        }

        .top-none {
          margin-top: 0;
          padding-top: 0;
        }

        .input-background {
          background: #0d9da6;
          color: #fff;
        }

        .flex-start {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          justify-content: flex-start;
        }

        .flex-center {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          justify-content: center;
        }

        .button-gray {
          cursor: pointer;
          width: 133px;
          height: 34px;
          background: #0d9da6 0% 0% no-repeat padding-box;
          border: 1px solid #0d9da6;
          border-radius: 26px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 10px;
          color: #fff;
        }

        .button-gray:hover {
          background: #fff;
          color: #0d9da6;
        }

        .input-checkbox {
          border-radius: 10px;
          cursor: pointer;
          margin-top: 0;
          padding-top: 0;
          width: 294px;
          height: 39px;
          background: #FFFFFF 0% 0% no-repeat padding-box;
          border: 1px solid #0d9da6;
          text-align: left;
          font: normal normal normal 16px/21px Segoe UI;
          letter-spacing: 0px;
          color: #0d9da6;
          display: flex;
          align-items: center;
          padding-left: 15px;
        }

        .fa-caret-down {
          font-size: 25px;
          padding-right: 10px;

        }

        #tab-active {
          color: #fff;
          background: #B0B0B0;
        }


        @media (max-width: 870px) {
          .profile {
            flex-wrap: wrap;
          }

          .leftmenu {
            width: 100%;
            flex-direction: row;

          }

          .leftmenu a {
            border-left: 1px solid #707070;
          }
        }

        @media (max-width: 622px) {

          .block1-form1,
          .block1-form2,
          .block2-form1 {
            flex-wrap: wrap;
          }

          .block1,
          .block2 {
            height: auto;
            width: 100%;
            margin: 5px 0;
          }


          .column-center,
          .column-between,
          .block,
          .input1,
          .block50 {
            width: 100%;
          }

          .image,
          .water {
            width: 90%;
          }

          .top-none {
            margin-top: 50px;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .input2 {
            width: 100%;
          }

          .h2 {
            text-align: center;
          }

          .block2-form2 {
            margin-top: 20px;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
          }

          .block1,
          .block2 {
            width: 100%;
          }

          .column-center,
          .column-between,
          .block,
          .input1 {
            width: 100%;
          }
        }

        @media (max-width: 584px) {
          .flex-start {
            flex-wrap: wrap;
            justify-content: space-evenly;
          }

          .leftmenu a {
            padding: 10px 5px;
            font-size: 16px;
          }

          .button-big {
            font-size: 12px;
            padding-left: 3px;
            padding-right: 3px;
          }
        }

        /* @media (max-width: 734px) {
      
            .block1,
            .block2 {
                width: 100%;
            }
      
            .column-center,
            .column-between,
            .block,
            .input1 {
                width: 100%;
            }
        } */

      `}</style>
    </>
  )
}

export default AddWatermark
