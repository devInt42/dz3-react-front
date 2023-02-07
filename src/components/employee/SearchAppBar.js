import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicTextFields() {

  const [search, setSearch] = React.useState("");
  const searchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >

    <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label">회사</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="회사"
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small">
        <InputLabel id="demo-simple-select-label">재직구분</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="재직구분"
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>

      <TextField label="이름/ID/Mail ID" variant="outlined"  size="small" value={search} onChange={searchChange}/>
      </Box>
  );
}