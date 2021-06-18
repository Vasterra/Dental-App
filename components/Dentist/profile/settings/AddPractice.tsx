import React, {Component, useState} from 'react';
import styled from "styled-components";
import {convertCityCoords} from "../../../../utils/search/converCityCoords";
import {API} from "aws-amplify";
import {listPractices} from "../../../../graphql/queries";
import {createPractice, deletePractice} from "../../../../graphql/mutations";

const PracticeListWrapper = styled("div")`{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 30px;
`;

const Input = styled("input")`{
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #e0e0e0;
  margin: 10px;
  width: 250px;

  &:active {
    & + span {
      width: 100%;
    }
  }
}`;

const ConfirmButton = styled("button")`{
  width: 170px;
  cursor: pointer;
  background: #fff;
  height: 37px;
  border-radius: 30px;
  border: 1px solid #0d9da6;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  color: #000;

  &:hover {
    background: #0d9da6;
    color: #fff;
  }

  &:disabled {
    background: gray;
    border: 1px solid gray;
    color: #000000;
    cursor: default;
  }
`;

const PractiseItem = styled("button")`{
  width: 250px;
  cursor: pointer;
  background: #fff;
  border-radius: 30px;
  border: 1px solid #0d9da6;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 5px;
  margin: 5px;
  color: #000;

  &:hover {
    background: #0d9da6;
    color: #fff;
  }
`;

class PractiseConfig extends Component {
  state: any = {
    practises: [],
    practise: [],
  }

  async componentDidMount() {
    const practise: any = await API.graphql({query: listPractices})
    this.setState({practises: practise.data.listPractices.items})
  }

  render() {
    const disabled = this.state.practise.length === 0
    return (
      <>
        <div style={{textAlign: 'center'}}>
          Select a practises your provide
        </div>
        <Input type="text" name="practise" onChange={event => this.setState({practise: event.target.value})}/>
        <PracticeListWrapper>
          {
            this.state.practises.map((el, key) => {
              return (
                <PractiseItem key={key} onClick={async () => {
                  await API.graphql({
                    query: deletePractice,
                    variables: {
                      input: {
                        id: Number(el.practise.id)
                      }
                    },
                  })
                }}>{el.practise.name}</PractiseItem>
              )
            })
          }
        </PracticeListWrapper>
        {
          <ConfirmButton disabled={disabled} onClick={async () => {
            await API.graphql({
              query: createPractice,
              variables: {
                input: {
                  name: this.state.practise
                }
              },
            })
          }}>Confirm</ConfirmButton>
        }
      </>
    )
  }
}

export default PractiseConfig