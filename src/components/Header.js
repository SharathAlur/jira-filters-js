import React, { useState } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
// import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

const useSelectData = (initialValue) => {
  const [data, setData] = useState(initialValue);
  const handleChange = event => setData(event.target.value);

  return [data, handleChange];
}

const buildSelect = (items, value, onChange, label) => (
  <FormControl style={{
    margin: '10px',
    minWidth: 120,
  }}>
    <InputLabel id="status-label">{label}</InputLabel>
    <Select
      labelId="status-label"
      value={value}
      onChange={onChange}
      displayEmpty
    >
      <MenuItem value={0} key={0}>
        <em>None</em>
      </MenuItem>
      {items.map(item => <MenuItem value={item} key={item}>{item}</MenuItem>)}
    </Select>
  </FormControl>
)
const Header = ({ statusList, typeList, priorityList, setFilter }) => {
  const [status, setStatus] = useSelectData(0);
  const [type, setType] = useSelectData(0);
  const [priority, setPriority] = useSelectData(0);

  const handleApplyChanges = () => setFilter({
    status,
    type,
    priority
  })


  return (<>
    {statusList && buildSelect(statusList, status, setStatus, 'Status')}
    {typeList && buildSelect(typeList, type, setType, 'Issue Type')}
    {priorityList && buildSelect(priorityList, priority, setPriority, 'Priority')}
    <Button
      size="small"
      variant="outlined"
      color="primary"
      style={{
        marginTop: '30px'
      }}
      onClick={handleApplyChanges}
    >
      Apply
    </Button>
  </>);
}



export default Header;