import React from "react"
import {IconButton} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import styled from "styled-components";


const InputSearchWrapper = styled("div")`
  width: 345px;
  height: 47px;
  border-radius: 30px;
  border: 1px solid #0d9da6;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  margin-right: 100px;
  padding: 0;
`;

type Props = {
  enterKeyDown: Function,
  handlerSearch: Function,
  changeValueSearch: Function,
}

const InputSearch: React.FunctionComponent<Props> = ({enterKeyDown, handlerSearch, changeValueSearch}) => {

  return (  // @ts-ignore
    <InputSearchWrapper><IconButton
        onClick={handlerSearch}
        aria-label="search"
        style={{width: '32px', height: '32px', zoom: 1.6, color: '#0d9da6'}}>
        <SearchIcon/>
      </IconButton>

      <InputSearch
        // @ts-ignore
        style={{marginRight: '10px'}}
        placeholder="Search Google Maps"
        onChange={changeValueSearch}
        onKeyDown={enterKeyDown}
      />
    </InputSearchWrapper>
  )
}

export default InputSearch;