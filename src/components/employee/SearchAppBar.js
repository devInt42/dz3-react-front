import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';

import { FcSearch } from "react-icons/fc";

export default function SearchAppBar(props) {

  const baseUrl = "http://localhost:8080";
  const [companyList, setCompanyList] = useState([]);
  useEffect(() => {
    axios.get(baseUrl + '/company/info').then(response => setCompanyList(response.data)).catch(error => console.log(error))
  }, []);

  const [search, setSearch] = useState("");
  const searchChange = (e) => {
    setSearch(e.target.value);
  };

  const companyChange = (e) => {
    props.setSelectCompany(e.target.value);
  }

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
          value={props.selectCompany}
          onChange={companyChange}
        >
          <MenuItem value={0}>전체</MenuItem>
          {
            companyList.map((comli) => {
              return (<MenuItem value={comli.companySeq} key={comli.companySeq}>{comli.companyName}</MenuItem>)
            })
          }
        </Select>
      </FormControl>

      {/* <FormControl size="small">
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
      </FormControl> */}

      <TextField label="이름/ID/Mail ID" variant="outlined" size="small" value={search} onChange={searchChange} />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Box>
  );
}