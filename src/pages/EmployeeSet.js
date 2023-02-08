import React, { useEffect, useState } from "react";
import axios from "axios";
import { Nav, Form, Container, Row, Col, Pagination } from "react-bootstrap";

import { GrUserManager } from "react-icons/gr";
import { BsFilePerson } from "react-icons/bs";

import style from "../components/employee/css/EmployeeSet.module.css";
import EmpBasic from "../components/employee/EmpBasic";
import EmpDept from "../components/employee/EmpDept";
import SearchAppBar from "../components/employee/SearchAppBar";
import EmpLnb from "../components/employee/EmpLnb";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function EmployeeSet() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const baseUrl = "http://localhost:8080";

  const [employeeSeq, setEmpSeq] = useState(0);

  const [selectAct, setSelectAct] = useState(true);
  const clickEmp = () => {
    setSelectAct(false);
  };

  const [selectCompany, setSelectCompany] = useState(0);
  // const [companyEmp, setCompanyEmp] = useState([]);
  // useEffect(()=>{
  //     axios.get(`${baseUrl}/department-employee/companyemp/${selectCompany}`)
  //     .then((response) => setCompanyEmp(response.data))
  //     .catch((error) => console.log(error));
  // },[selectCompany])
  // console.log("compemp: " + companyEmp)

  return (
    <div>
      <div className={style.wrap}>
        <span style={{ fontSize: "25px" }}>
          <GrUserManager />
          &nbsp;상용직관리
        </span>
        <hr />
      </div>
      <Container fluid>
        <Row>
          <SearchAppBar
            selectCompany={selectCompany}
            setSelectCompany={setSelectCompany}
          />
        </Row>
        <Row style={{ border: "1px solid #e3e3e3" }}>
          <Col xs={2} className="menuArea">
            <EmpLnb clickEmp={clickEmp} setEmpSeq={setEmpSeq} />
          </Col>

          <Col xs={10} style={{ border: "1px solid #e3e3e3", height: "100vh" }}>
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="기본정보" {...a11yProps(0)} />
                  <Tab label="조직정보" {...a11yProps(1)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <EmpBasic
                  employeeSeq={employeeSeq}
                  clickEmp={clickEmp}
                  selectAct={selectAct}
                  setSelectAct={setSelectAct}
                />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <EmpDept />
              </TabPanel>
            </Box>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default EmployeeSet;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
