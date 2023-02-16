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
import SaveAlert from "../components/alert/SaveAlert";
function EmployeeSet() {
  const baseUrl = "http://localhost:8080";
  const [value, setValue] = React.useState(0);
  const [employeeSeq, setEmpSeq] = useState(0);
  const [selectAct, setSelectAct] = useState(true);
  const [searchRes, setSearchRes] = useState([]);
  const [groupData, setGroupData] = useState([]);
  const [groupFirstData, setGroupFirstData] = useState([]);
  const [basicData, setBasicData] = useState({});
  const [basicFirstData, setBasicFirstData] = useState({});
  const [notRequire,setNotRequire] = useState('');
  const [departmentCheck, setDepartmentCheck] = useState(true);
  const [employeeCodeCheck, setEmployeeCodeCheck] = useState(true);
  const [joinDateCheck, setJoinDateCheck] = useState(true);
  const [returnId, setReturnId] = useState(0);
  const [returnCmail, setReturnCmail] = useState(0);
  useEffect(() => {
    axios
      .get(baseUrl + "/employee/emplist/" + employeeSeq)
      .then((response) => {setBasicData(response.data[0]); setBasicFirstData(response.data[0])})
      .catch((error) => console.log(error));

    axios
      .get(`${baseUrl}/department-employee/belong`, {
        params: {
          employeeSeq: employeeSeq,
        },
      })
      .then((res) => {
        setGroupData(res.data);
        setGroupFirstData(res.data);
      })
      .catch((error) => console.log(error));
      setNotRequire('');
  }, [employeeSeq]);

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
  useEffect(() => { }, [searchRes]);

  // 입사처리
  const EmpInsertForm = () => {
    setBasicData({
      employeeSeq: employeeSeq,
      employeeId: "",
      employeeName: "",
      employeeBirth: "",
      employeeJoin: "",
      employeeLeave: "",
      employeeCall: "",
      employeePwd: "",
      employeePh: "",
      employeePmail: "",
      employeeCmail: "",
      employeeAddr: "",
      employeePicture: null,
      useYN: "Y",
      employeeGender: "",
      employeeLanguage: "",
      employeeHcall: "",
      approvalPwd: ""
    });
    setBasicFirstData({
      employeeSeq: employeeSeq,
      employeeId: "",
      employeeName: "",
      employeeBirth: "",
      employeeJoin: "",
      employeeLeave: "",
      employeeCall: "",
      employeePwd: "",
      employeePh: "",
      employeePmail: "",
      employeeCmail: "",
      employeeAddr: "",
      employeePicture: null,
      useYN: "Y",
      employeeGender: "",
      employeeLanguage: "",
      employeeHcall: "",
      approvalPwd: ""
    })
    setGroupData([{
      employeeSeq: 0,
      workplaceSeq: 0,
      departmentSeq: 0,
      companySeq: 0,
      companyCode: null,
      employeeName: null,
      employeeId: null,
      employeePh: null,
      employeePicture: null,
      employeeCall: null,
      employeePmail: null,
      employeeCmail: null,
      companyName: "",
      workplaceName: "",
      departmentName: "",
      employeeBirth: null,
      authSeq: 0,
      duty: "",
      position: "",
      mainCompany: null,
      mainDepartment: null,
      startPgNum: 0,
      endPgNum: 0,
      mainCompanyYN: "Y",
      mainDepartmentYN: "Y",
      departmentLoc: "",
      departmentCall: "",
      departmentFax: "",
      departmentDepth: 0,
      departmentParent: 0,
      departmentZipCode: "",
      dutyCode: "",
      positionCode: "",
      employeeCode: "",
      employeeJoin: null,
      employeeLeave: null,
      employeeClassification: null,
      companyHomepage: null,
      page: 0
    }])
    setGroupFirstData([{
      employeeSeq: 0,
      workplaceSeq: 0,
      departmentSeq: 0,
      companySeq: 0,
      companyCode: null,
      employeeName: null,
      employeeId: null,
      employeePh: null,
      employeePicture: null,
      employeeCall: null,
      employeePmail: null,
      employeeCmail: null,
      companyName: "",
      workplaceName: "",
      departmentName: "",
      employeeBirth: null,
      authSeq: 0,
      duty: "",
      position: "",
      mainCompany: null,
      mainDepartment: null,
      startPgNum: 0,
      endPgNum: 0,
      mainCompanyYN: "Y",
      mainDepartmentYN: "Y",
      departmentLoc: "",
      departmentCall: "",
      departmentFax: "",
      departmentDepth: 0,
      departmentParent: 0,
      departmentZipCode: "",
      dutyCode: "",
      positionCode: "",
      employeeCode: "",
      employeeJoin: null,
      employeeLeave: null,
      employeeClassification: null,
      companyHomepage: null,
      page: 0
    }])
  }

  //[조직정보] 필수값 입력 체크
  const requireCheck = () => {
    setDepartmentCheck(true);
    setEmployeeCodeCheck(true);
    setJoinDateCheck(true);
    for (let i = 0; i < groupData.length; i++) {
      if (
        groupData[i].employeeCode == null ||
        groupData[i].employeeCode == undefined ||
        groupData[i].employeeCode == ""
      ) {
        setEmployeeCodeCheck(false);
        return false;
      }
      if (
        groupData[i].departmentName == null ||
        groupData[i].departmentName == undefined ||
        groupData[i].departmentName == ""
      ) {
        setDepartmentCheck(false);
        return false;
      }
      if (
        groupData[i].employeeJoin == null ||
        groupData[i].employeeJoin == undefined ||
        groupData[i].employeeJoin == ""
      ) {
        setJoinDateCheck(false);
        return false;
      }
    }
  }
  const UpdateEmp = () => {
      const notInput = "필수 값이 입력되지 않았습니다."
      const basicError = `[기본 정보] ${notInput}`
      const groupError = `[조직 정보] ${notInput}`

      requireCheck();
      //기본정보 필수값 확인
      basicData.employeeName || 
      setNotRequire(<SaveAlert title = {basicError} text = "이름을 입력해 주십시오." icon = "error" 
      successButton = "확인"/>) 
      
      basicData.employeeBirth ||
      setNotRequire(<SaveAlert title = {basicError} text = "생년월일을 입력해 주십시오." icon = "error"
      successButton = "확인"/>)

      basicData.employeePwd ||
      setNotRequire(<SaveAlert title = {basicError} text = "비밀번호를 입력해 주십시오." icon = "error"
      successButton = "확인"/>)

      basicData.approvalPwd ||
      setNotRequire(<SaveAlert title = {basicError} text = "결재 비밀번호를 입력해 주십시오." icon = "error"
      successButton = "확인"/>)

      basicData.employeeId ||
      setNotRequire(<SaveAlert title = {basicError} text = "아이디를 입력해 주십시오." icon = "error"
      successButton = "확인"/>)

      basicData.employeeCmail ||
      setNotRequire(<SaveAlert title = {basicError} text = "메일 ID를 입력해 주십시오." icon = "error"
      successButton = "확인"/>)
      
      // 조직정보
      !employeeCodeCheck &&
      setNotRequire(<SaveAlert title = {groupError} text = "사번을 입력해 주십시오." icon = "error"
      successButton = "확인"/>)
      
      !departmentCheck &&
      setNotRequire(<SaveAlert title = {groupError} text = "부서를 선택해 주십시오." icon = "error"
      successButton = "확인"/>)

      !joinDateCheck &&
      setNotRequire(<SaveAlert title = {groupError} text = "입사일을 입력해 주십시오." icon = "error"
      successButton = "확인"/>)
  }
  return (
    <div>
      <div className={style.wrap}>
        <span style={{ fontSize: "25px" }}>
          <GrUserManager />
          &nbsp;상용직관리
        </span>
        <hr />
      </div>
      {notRequire}
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
                  <button onClick={() => EmpInsertForm()}>입사처리</button>
                  <button onClick = {() => UpdateEmp()}>저장</button>
                  <button>삭제</button>
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <EmpBasic
                  employeeSeq={employeeSeq}
                  clickEmp={clickEmp}
                  selectAct={selectAct}
                  setSelectAct={setSelectAct}
                  setData={setBasicData}
                  data={basicData}
                  firstData = {basicFirstData}
                  returnId = {returnId}
                  setReturnId = {setReturnId}
                  returnCmail = {returnCmail}
                  setReturnCmail = {setReturnCmail}
                />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <EmpDept employeeSeq={employeeSeq} setData={setGroupData} setFirstData={setGroupFirstData}
                  data={groupData} firstData={groupFirstData} />
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
