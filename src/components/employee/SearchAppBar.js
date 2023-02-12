import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";

export default function SearchAppBar(props) {
  const baseUrl = "http://localhost:8080";
  const [companyList, setCompanyList] = useState([]);
  const [employeeName, setEmployeeName] = useState("");
  const [employeementStatus, setEmployeementStatus] = useState("");

  useEffect(() => {
    axios
      .get(baseUrl + "/company/info")
      .then((response) => setCompanyList(response.data))
      .catch((error) => console.log(error));
  }, []);

  //이름/id/mail id
  const searchChange = (e) => {
    setEmployeeName(e.target.value);
  };

  //회사
  const companyChange = (e) => {
    props.setSelectCompany(e.target.value);
  };

  //재직상태
  const employmentStatus = (e) => {
    setEmployeementStatus(e.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off">
      <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label">회사</InputLabel>

        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="회사"
          value={props.selectCompany}
          onChange={companyChange}>
          <MenuItem value={0}>전체</MenuItem>
          {companyList.map((comli) => {
            return (
              <MenuItem value={comli.companySeq} key={comli.companySeq}>
                {comli.companyName}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label">재직구분</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={employeementStatus}
          label="재직구분"
          onChange={employmentStatus}>
          <MenuItem value={"J00"}>전체</MenuItem>
          <MenuItem value={"J01"}>J01.재직</MenuItem>
          <MenuItem value={"J05"}>J05.퇴직</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="이름/ID/Mail ID"
        variant="outlined"
        size="small"
        value={employeeName}
        onChange={searchChange}
      />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Box>
  );
}
