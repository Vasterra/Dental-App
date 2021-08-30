import React from 'react';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Theme, useTheme } from '@material-ui/core/styles';

type Props = {
  services: any,
  updateService: any,
  saveService: Function,
}

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    color: 'black',
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const Services: React.FunctionComponent<Props> = ({ saveService, services }) => {
  const [service, setService] = React.useState<string[]>([]);
  const theme = useTheme();
  const handleChange = (e: any) => {
    setService(e.target.value as string[]);
    saveService(e.target.value);
  };
  return (
    <Select
      multiple
      displayEmpty
      value={service}
      onChange={handleChange}
      input={<Input />}
      renderValue={(selected) => {
        if ((selected as string[]).length === 0) {
          return <em>Select from your services</em>;
        }
        return (selected as string[]).join(', ');
      }}
      MenuProps={MenuProps}
    >
      <MenuItem disabled value=''>
        <div style={{ color: 'black' }}>Select from your services</div>
      </MenuItem>
      {services.map((name: any) => (
        <MenuItem key={name.id} value={name.name} style={getStyles(name, service, theme)}>
          {name.name}
        </MenuItem>
      ))}
    </Select>
  );
};

export default Services;
