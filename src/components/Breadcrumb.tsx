import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import styled from "styled-components";

const BreadCrumbsBlock = styled("div")`{
  display: flex;
  align-items: center;
  background: #F0F0F0 0 0 no-repeat padding-box;
  padding: 20px;
`;

function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  event.preventDefault();
}

type Props = {
  point: string,
}
const Breadcrumb: React.FunctionComponent<Props> = ({point}) => {
  return (
    <BreadCrumbsBlock>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small"/>} aria-label="breadcrumb">
        <Link color="inherit" href="/" onClick={handleClick} style={{color: 'blue'}}>
          Main
        </Link>
        <Typography color="textPrimary">{point}</Typography>
      </Breadcrumbs>
    </BreadCrumbsBlock>
  )
}

export default Breadcrumb;
