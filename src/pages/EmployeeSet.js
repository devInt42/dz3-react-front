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
import EmpAlert from "../components/alert/EmpAlert";
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
  const [notRequire, setNotRequire] = useState('');
  const [departmentCheck, setDepartmentCheck] = useState(true);
  const [employeeCodeCheck, setEmployeeCodeCheck] = useState(true);
  const [joinDateCheck, setJoinDateCheck] = useState(true);
  const [returnId, setReturnId] = useState(0);
  const [returnCmail, setReturnCmail] = useState(0);
  const [dupliCheck, setDupliCheck] = useState(0);
  const [companyList, setCompanyList] = useState([]);
  const [insertFlag, setInsertFlag] = useState(false);
  const [insertSeqFlag, setInsertSeqFlag] = useState(false);
  const [deleteFlag, setDeleteFlag] = useState(false);
  
  useEffect(() => {
    axios.get(`${baseUrl}/company/info`)
      .then(res => setCompanyList(res.data))
      .catch(error => console.log(error))
  }, [])
  useEffect(() => {
    console.log(employeeSeq);
    axios
      .get(baseUrl + "/employee/emplist/" + employeeSeq)
      .then((response) => { setBasicData(response.data[0]); setBasicFirstData(response.data[0]) })
      .catch((error) => console.log(error));

    axios
      .get(`${baseUrl}/department-employee/belong`, {
        params: {
          employeeSeq: employeeSeq,
        },
      })
      .then((res) => {
        console.log(res.data);
        setGroupData(res.data);
        setGroupFirstData(res.data);
      })
      .catch((error) => console.log(error));
    setNotRequire('');
    setDupliCheck(0);
    
     if(insertFlag) {
     let copyBasicData = {...basicData, ...{employeeSeq: employeeSeq}};
      setBasicData(copyBasicData);
      setInsertSeqFlag(true);
   }
    setInsertFlag(false);
    setDeleteFlag(false);
  }, [employeeSeq, deleteFlag]);

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
    setInsertFlag(true);
    setInsertSeqFlag(false);
    setBasicData({
      employeeSeq: 0,
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
      approvalPwd: "",
      insertData: "Y",
    });
    setBasicFirstData({
      employeeSeq: 0,
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
      approvalPwd: "",
      insertData: "Y",
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
      duty: "팀원",
      position: "사원",
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
      dutyCode: "1",
      positionCode: "1",
      employeeCode: "",
      employeeJoin: null,
      employeeLeave: null,
      employeeClassification: "J01",
      companyHomepage: null,
      page: 0,
      insertData: "Y",
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
      duty: "팀원",
      position: "사원",
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
      dutyCode: "1",
      positionCode: "1",
      employeeCode: "",
      employeeJoin: null,
      employeeLeave: null,
      employeeClassification: "J01",
      companyHomepage: null,
      page: 0,
      insertData: "Y",
    }])
  }

  const AllCheck = () => {
    const notInput = "필수 값이 입력되지 않았습니다.";
    const checkError = "중복된 값이 있습니다.";
    const basicCheckError = `[기본 정보] ${checkError}`;
    const groupCheckError = `[조직 정보] ${checkError}`;
    const basicError = `[기본 정보] ${notInput}`;
    const groupError = `[조직 정보] ${notInput}`;

    //기본정보 필수값 확인
    if (!basicData.employeeName) {
      setNotRequire(<EmpAlert title={basicError} text="이름을 입력해 주십시오." icon="error"
        successButton="확인" />)
      return false;
    }


    if (!basicData.employeeBirth) {
      setNotRequire(<EmpAlert title={basicError} text="생년월일을 입력해 주십시오." icon="error"
        successButton="확인" />)
      return false;
    }

    if (!basicData.employeePwd) {
      setNotRequire(<EmpAlert title={basicError} text="비밀번호를 입력해 주십시오." icon="error"
        successButton="확인" />)
      return false;
    }

    if (!basicData.approvalPwd) {
      setNotRequire(<EmpAlert title={basicError} text="결재 비밀번호를 입력해 주십시오." icon="error"
        successButton="확인" />)
      return false;
    }

    if (!basicData.employeeId) {
      setNotRequire(<EmpAlert title={basicError} text="아이디를 입력해 주십시오." icon="error"
        successButton="확인" />)
      return false;
    }

    if (!basicData.employeeCmail) {
      setNotRequire(<EmpAlert title={basicError} text="메일 ID를 입력해 주십시오." icon="error"
        successButton="확인" />)
      return false;
    }
    if (!departmentCheck) {
      setNotRequire(<EmpAlert title={groupError} text="부서를 선택해 주십시오." icon="error"
        successButton="확인" />)
      return false;
    }
    if (!employeeCodeCheck) {
      setNotRequire(<EmpAlert title={groupError} text="사번을 입력해 주십시오." icon="error"
        successButton="확인" />)
      return false;
    }
    if (!joinDateCheck) {
      setNotRequire(<EmpAlert title={groupError} text="입사일을 입력해 주십시오." icon="error"
        successButton="확인" />)
      return false;
    }
    if (returnId.length > 0) {
      setNotRequire(<EmpAlert title={basicCheckError} text="로그인 ID가 중복되었습니다." icon="error"
        successButton="확인" />)
      return false;
    }
    if (returnCmail.length > 0) {
      setNotRequire(<EmpAlert title={basicCheckError} text="메일 ID가 중복되었습니다." icon="error"
        successButton="확인" />)
      return false;
    }
    if (JSON.stringify(groupFirstData) == JSON.stringify(groupData) &&
      JSON.stringify(basicFirstData) == JSON.stringify(basicData)) {
      setNotRequire(<EmpAlert title="수정된 사항이 없습니다." icon="error" successButton="확인" />);
      return false;
    }
    if (dupliCheck > 0) {
      console.log(dupliCheck);
      setNotRequire(<EmpAlert title={groupCheckError} text="사번이 중복되었습니다." icon="error"
        successButton="확인" />)
      return false;
    }
    if (!insertFlag) {
      setNotRequire(<EmpAlert title="수정하시겠습니까?" icon="warning" successButton="수정" functionText="수정" cancleButton="true" Update={Update} />);
    }
    if (insertFlag) {
      setNotRequire(<EmpAlert title = "저장하시겠습니까?" icon= "info" successButton="저장" functionText="저장" 
      cancleButton = "true" Insert = {Insert}/>)
    }
  }
  const Insert = async() => {
    const data = {...basicData, groupData}
    let res = await axios.post(`${baseUrl}/department-employee/joinemp`, data)
    if(res.status == 200) {
      let getSeq = await axios.get(`${baseUrl}/department-employee/findempseq`, 
      {
        params: {
          employeeId: data.employeeId,
          employeeName: data.employeeName
        }
      })
      setEmpSeq(getSeq.data);
    }
  }
  useEffect (() => {
    if(insertSeqFlag) {
      if(employeeSeq != 0) {
        Update();
      }
    }
  }, [insertSeqFlag])
  const Update = () => {
    const data = { ...basicData, groupData }
    const empData = { ...data, groupFirstData }
    axios.post(`${baseUrl}/department-employee/addupdateemp`, empData)
  }
  const selectDelete = (obj) => {
    console.log(obj);
    axios.get(`${baseUrl}/department-employee/selectdelete`, 
    {
      params : {
        employeeSeq: obj.employeeSeq,
        departmentSeq: obj.departmentSeq,
        isEmpDelete: false
      }
    })
  }
  const deleteEmp = () => {
    axios.get(`${baseUrl}/department-employee/selectdelete`,
    {
      params : {
        employeeSeq: basicData.employeeSeq,
        departmentSeq: 0,
        isEmpDelete: true
      }
    })
  }
  const delEmp = () => {
    setNotRequire(<EmpAlert title = "삭제하시겠습니까?" icon= "warning" successButton="확인" functionText="회원삭제" 
    cancleButton = "true" Delete = {deleteEmp} setDeleteFlag = {setDeleteFlag}/>)
  }
  return (
    <div>
      {notRequire}
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
                  <button onClick={() => EmpInsertForm()}>입사처리</button>
                  <button onClick={() => AllCheck()}>저장</button>
                  <button onClick={() => delEmp()}>삭제</button>
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
                  firstData={basicFirstData}
                  returnId={returnId}
                  setReturnId={setReturnId}
                  returnCmail={returnCmail}
                  setReturnCmail={setReturnCmail}
                />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <EmpDept employeeSeq={employeeSeq} setData={setGroupData} setFirstData={setGroupFirstData}
                  data={groupData} firstData={groupFirstData} setDepartmentCheck={setDepartmentCheck}
                  setEmployeeCodeCheck={setEmployeeCodeCheck} setJoinDateCheck={setJoinDateCheck}
                  dupliCheck={dupliCheck} setDupliCheck={setDupliCheck} companyList={companyList} 
                  setNotRequire = {setNotRequire} selectDelete = {selectDelete} setDeleteFlag = {setDeleteFlag}/>
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
