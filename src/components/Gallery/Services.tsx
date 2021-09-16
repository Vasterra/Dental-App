import React from 'react';
import Select from "react-select";
import styled from 'styled-components'


type Props = {
  services: any,
  updateService: any,
  saveService: Function,
}

const SelectBox = styled.div``

const Services: React.FunctionComponent<Props> = ({ saveService, services }) => {
  const opts = services.map((item: any)=>{
    return {
      value: item.name, label: item.name
    }
  })
  const styles = {

    menu: (provided: any, state: any) => ({
      ...provided,
      width: state.selectProps.width,
      color: state.selectProps.menuColor,
    }),

    option: (provided: any, state: any) => ({
      ...provided,
      color: state.isSelected ? 'red' : 'black',
    }),

    control: (styles: any) => ({ ...styles, backgroundColor: 'white', minWidth: 220, maxWidth: 400 }),

    singleValue: (provided: any, state: any) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
  
      return { ...provided, opacity, transition };
    },

    multiValue: (styles: any) => {
      return {
        ...styles,
        backgroundColor: "papayawhip",
      };
    }
  };
  const handleChange = (selectedOpts: any) => {
    const opts = selectedOpts.map((item: any)=>item.value).join(', ')
    saveService(opts);
  };
  return(
    <SelectBox>
      <Select
        styles={styles}
        closeMenuOnSelect={false}
        isMulti
        options={opts}
        defaultValue={opts[0]}
        onChange={handleChange}
      />
    </SelectBox>
  )
};

export default Services;
