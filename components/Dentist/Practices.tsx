import React from "react";
import styled from "styled-components";
import {Button, Menu, MenuItem} from "@material-ui/core";


const ServiceWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  background: #FFFFFF 0 0 no-repeat padding-box;
  padding: 15px;
  height: 100%;
  border-radius: 10px;
`;

const PracticesBlock = styled("div")`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 10px 0;
  align-items: center;
`;

const Item = styled("div")`{
  width: 100%;
  max-width: 60%;
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

type Props = {
  practices: any,
}

const ServicesComponent: React.FunctionComponent<Props> = ({practices}) => {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const disabled = practices && practices.length <= 3

  return (
    <ServiceWrapper>
      <div>Practice</div>
      <PracticesBlock>
        {practices && practices.map((practice: { name: string, id: string }, key: number): any => {
            if (key < 3) {
              return (
                <Item key={practice.id}>{practice.name}</Item>
              )
            }
          }
        )}
        <Button disabled={disabled} style={{marginTop: '15px'}} aria-controls="simple-menu" aria-haspopup="true"
                onClick={handleClick}>
          Show all
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {practices && practices.map((practice: { name: string, id: string }, key: number): any => {
              if (key >= 3) {
                return (
                  <MenuItem onClick={handleClose} key={practice.id}>{practice.name}</MenuItem>
                )
              } else if (key >= 3) {
                return (
                  <p style={{padding: '0 20px'}}>Nothing</p>
                )
              }
            }
          )}
        </Menu>
      </PracticesBlock>
    </ServiceWrapper>
  )
}

export default ServicesComponent;
