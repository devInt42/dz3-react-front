import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import { GrUserManager } from "react-icons/gr";
import style from "../components/employee/css/EmployeeSet.module.css";
import EmpBasic from "../components/employee/EmpBasic";
import EmpDept from "../components/employee/EmpDept";
import SearchAppBar from "../components/employee/SearchAppBar";
import EmpLnb from "../components/employee/EmpLnb";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

function EmployeeSet() {
  const baseUrl = "http://localhost:8080";
  const [value, setValue] = React.useState(0);
  const [employeeSeq, setEmpSeq] = useState(0);
  const [selectAct, setSelectAct] = useState(true);
  const [searchRes, setSearchRes] = useState([]);
  const [basicData, setBasicData] = useState({});
  const [groupData, setGroupData] = useState([]);
  const clickEmp = () => {
    setSelectAct(false);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // 검색 결과 가져오기
  const sendSearchResult = (e) => {
    setSearchRes(e);
  };

  // 검색결과에 해당하는 사원 불러오기
  useEffect(() => {}, [searchRes]);

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
          <SearchAppBar sendSearchResult={sendSearchResult} />
        </Row>
        <Row style={{ border: "1px solid #e3e3e3" }}>
          <Col xs={2} className="menuArea">
            <EmpLnb
              clickEmp={clickEmp}
              setEmpSeq={setEmpSeq}
              searchRes={searchRes}
            />
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
                  setData={setBasicData}
                  data = {basicData}
                />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <EmpDept employeeSeq={employeeSeq} setData = {setGroupData}/>
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
