import React from "react";
import styled from "styled-components";
import {Button, Menu, MenuItem} from "@material-ui/core";

const ServiceWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  background: #FFFFFF 0 0 no-repeat padding-box;
  padding: 21px 15px;
  border-radius: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
`;

const ServicesBlock = styled("div")`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 10px 0;
  align-items: center;
`;

const Item = styled("div")`{
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

type Props = {
  data: any,
}

const ServicesComponent: React.FunctionComponent<Props> = ({data}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ServiceWrapper>
      <div>Services</div>
      <ServicesBlock>
        {data?.services.map((data: { service: { name: string, id: string } }, key: number): any => {
            if (key < 2) {
              return (
                <Item key={data.service.id}>{data.service.name}</Item>
              )
            }
          }
        )}
        <Button style={{marginTop: '15px'}} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          Show all
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {data?.services.map((data: { service: { name: string, id: string } }, key: number): any => {
              if (key >= 2) {
                return (
                  <MenuItem onClick={handleClose} key={data.service.id}>{data.service.name}</MenuItem>
                )
              } else if (key >= 2) {
                return (
                  <p style={{padding: '0 20px'}}>Nothing</p>
                )
              }
            }
          )}
        </Menu>
      </ServicesBlock>
    </ServiceWrapper>
  )
}

export default ServicesComponent;
