import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";
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
  const [notRequire, setNotRequire] = useState("");
  const [departmentCheck, setDepartmentCheck] = useState(true);
  const [employeeCodeCheck, setEmployeeCodeCheck] = useState(true);
  const [joinDateCheck, setJoinDateCheck] = useState(true);
  const [returnId, setReturnId] = useState(0);
  const [returnCmail, setReturnCmail] = useState(0);
  const [dupliCheck, setDupliCheck] = useState(0);
  const [companyList, setCompanyList] = useState([]);
  const [insertFlag, setInsertFlag] = useState(false);
  const [insertSeqFlag, setInsertSeqFlag] = useState(false);
  const [status, setStatus] = useState(false);
  const [deleteFlag, setDeleteFlag] = useState(false);
  const [mainSeqsFlag, setMainSeqFlag] = useState(false);
  useEffect(() => {
    axios
      .get(`${baseUrl}/company/info`)
      .then((res) => setCompanyList(res.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get(baseUrl + "/employee/emplist/" + employeeSeq)
      .then((response) => {
        setBasicData(response.data[0]);
        setBasicFirstData(response.data[0]);
        console.log(response.data[0]);
      })
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
    setNotRequire("");
    setDupliCheck(0);

    if (insertFlag) {
      let copyBasicData = { ...basicData, ...{ employeeSeq: employeeSeq } };
      setBasicData(copyBasicData);
      setInsertSeqFlag(true);
    }
    setInsertFlag(false);
    setDeleteFlag(false);
    setMainSeqFlag(false);
  }, [employeeSeq, deleteFlag]);

  const clickEmp = () => {
    setSelectAct(false);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // ?????? ?????? ????????????
  const sendSearchResult = (e) => {
    setSearchRes(e);
  };

  // ??????????????? ???????????? ?????? ????????????
  useEffect(() => {}, [searchRes]);

  // ????????????
  const EmpInsertForm = () => {
    setInsertFlag(true);
    setInsertSeqFlag(false);
    setMainSeqFlag(true);
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
      employeeHCall: "",
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
      employeeHCall: "",
      approvalPwd: "",
      insertData: "Y",
    });
    setGroupData([
      {
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
        duty: "??????",
        position: "??????",
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
      },
    ]);
    setGroupFirstData([
      {
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
        duty: "??????",
        position: "??????",
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
      },
    ]);
  };

  const AllCheck = () => {
    const notInput = "?????? ?????? ???????????? ???????????????.";
    const checkError = "????????? ?????? ????????????.";
    const basicCheckError = `[?????? ??????] ${checkError}`;
    const groupCheckError = `[?????? ??????] ${checkError}`;
    const basicError = `[?????? ??????] ${notInput}`;
    const groupError = `[?????? ??????] ${notInput}`;

    //???????????? ????????? ??????
    if (!basicData.employeeName) {
      setNotRequire(
        <EmpAlert
          title={basicError}
          text="????????? ????????? ????????????."
          icon="error"
          successButton="??????"
        />
      );
      return false;
    }

    if (!basicData.employeeBirth) {
      setNotRequire(
        <EmpAlert
          title={basicError}
          text="??????????????? ????????? ????????????."
          icon="error"
          successButton="??????"
        />
      );
      return false;
    }

    if (!basicData.employeePwd) {
      setNotRequire(
        <EmpAlert
          title={basicError}
          text="??????????????? ????????? ????????????."
          icon="error"
          successButton="??????"
        />
      );
      return false;
    }

    if (!basicData.approvalPwd) {
      setNotRequire(
        <EmpAlert
          title={basicError}
          text="?????? ??????????????? ????????? ????????????."
          icon="error"
          successButton="??????"
        />
      );
      return false;
    }

    if (!basicData.employeeId) {
      setNotRequire(
        <EmpAlert
          title={basicError}
          text="???????????? ????????? ????????????."
          icon="error"
          successButton="??????"
        />
      );
      return false;
    }

    if (!basicData.employeeCmail) {
      setNotRequire(
        <EmpAlert
          title={basicError}
          text="?????? ID??? ????????? ????????????."
          icon="error"
          successButton="??????"
        />
      );
      return false;
    }
    if (!departmentCheck) {
      setNotRequire(
        <EmpAlert
          title={groupError}
          text="????????? ????????? ????????????."
          icon="error"
          successButton="??????"
        />
      );
      return false;
    }
    if (!employeeCodeCheck) {
      setNotRequire(
        <EmpAlert
          title={groupError}
          text="????????? ????????? ????????????."
          icon="error"
          successButton="??????"
        />
      );
      return false;
    }
    if (!joinDateCheck) {
      setNotRequire(
        <EmpAlert
          title={groupError}
          text="???????????? ????????? ????????????."
          icon="error"
          successButton="??????"
        />
      );
      return false;
    }
    if (returnId.length > 0) {
      setNotRequire(
        <EmpAlert
          title={basicCheckError}
          text="????????? ID??? ?????????????????????."
          icon="error"
          successButton="??????"
        />
      );
      return false;
    }
    if (returnCmail.length > 0) {
      setNotRequire(
        <EmpAlert
          title={basicCheckError}
          text="?????? ID??? ?????????????????????."
          icon="error"
          successButton="??????"
        />
      );
      return false;
    }
    if (
      JSON.stringify(groupFirstData) == JSON.stringify(groupData) &&
      JSON.stringify(basicFirstData) == JSON.stringify(basicData)
    ) {
      setNotRequire(
        <EmpAlert
          title="????????? ????????? ????????????."
          icon="error"
          successButton="??????"
        />
      );
      return false;
    }
    if (dupliCheck > 0) {
      setNotRequire(
        <EmpAlert
          title={groupCheckError}
          text="????????? ?????????????????????."
          icon="error"
          successButton="??????"
        />
      );
      return false;
    }
    if (!insertFlag) {
      setNotRequire(
        <EmpAlert
          title="?????????????????????????"
          icon="warning"
          successButton="??????"
          functionText="??????"
          cancleButton="true"
          Update={Update}
          setStatus={setStatus}
        />
      );
    }
    if (insertFlag) {
      setNotRequire(
        <EmpAlert
          title="?????????????????????????"
          icon="info"
          successButton="??????"
          functionText="??????"
          cancleButton="true"
          Insert={Insert}
          setStatus={setStatus}
        />
      );
    }
  };

  const Insert = async () => {
    const data = { ...basicData, groupData };
    const res = await axios.post(
      `${baseUrl}/department-employee/joinemp`,
      data
    );
    if (res.status == 200) {
      let getSeq = await axios.get(
        `${baseUrl}/department-employee/findempseq`,
        {
          params: {
            employeeId: data.employeeId,
            employeeName: data.employeeName,
          },
        }
      );
      setEmpSeq(getSeq.data);
    }
  };
  useEffect(() => {
    setStatus(true);
    if (insertSeqFlag) {
      if (employeeSeq != 0) {
        Update();
      }
    }
  }, [insertSeqFlag]);
  const Update = async () => {
    const data = { ...basicData, groupData };
    const empData = { ...data, groupFirstData };
    console.log(empData);
    await axios.post(`${baseUrl}/department-employee/addupdateemp`, empData);
  };
  const selectDelete = async (obj) => {
    await axios.get(`${baseUrl}/department-employee/selectdelete`, {
      params: {
        employeeSeq: obj.employeeSeq,
        departmentSeq: obj.departmentSeq,
        isEmpDelete: false,
      },
    });
  };
  const deleteEmp = async () => {
    await axios.get(`${baseUrl}/department-employee/selectdelete`, {
      params: {
        employeeSeq: basicData.employeeSeq,
        departmentSeq: 0,
        isEmpDelete: true,
      },
    });
  };
  const delEmp = () => {
    setNotRequire(
      <EmpAlert
        title="?????????????????????????"
        icon="warning"
        successButton="??????"
        functionText="????????????"
        cancleButton="true"
        Delete={deleteEmp}
        setDeleteFlag={setDeleteFlag}
        setStatus={setStatus}
      />
    );
  };
  useEffect(() => {
    setStatus(false);
  }, [status]);
  return (
    <div>
      {notRequire}
      <div className={style.wrap}>
        <span style={{ fontSize: "25px" }}>
          <GrUserManager />
          &nbsp;???????????????
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
              status={status}
              setStatus={setStatus}
              deleteFlag={deleteFlag}
            />
          </Col>

          <Col xs={10} style={{ border: "1px solid #e3e3e3", height: "100vh" }}>
            <Box sx={{ width: "100%" }}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                }}
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Tab label="????????????" {...a11yProps(0)} />
                  <Tab label="????????????" {...a11yProps(1)} />
                  <div
                    style={{
                      width: "78%",
                      display: "flex",
                      flexDirection: "row",
                      marginRight: "10px",
                      justifyContent: "flex-end",
                    }}
                  >
                    {!insertFlag && (
                      <Button
                        variant="outline-success"
                        onClick={() => EmpInsertForm()}
                        style={{ marginRight: "10px" }}
                      >
                        ?????? ??????
                      </Button>
                    )}{" "}
                    {employeeSeq && !insertFlag ? (
                      <Button
                        variant="outline-danger"
                        onClick={() => delEmp()}
                        style={{ marginRight: "10px" }}
                      >
                        ??????
                      </Button>
                    ) : (
                      <></>
                    )}
                    <Button
                      variant="outline-primary"
                      onClick={() => AllCheck()}
                    >
                      ??????
                    </Button>
                  </div>
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
                  insertFlag = {insertFlag}
                />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <EmpDept
                  employeeSeq={employeeSeq}
                  setData={setGroupData}
                  setFirstData={setGroupFirstData}
                  data={groupData}
                  firstData={groupFirstData}
                  setDepartmentCheck={setDepartmentCheck}
                  setEmployeeCodeCheck={setEmployeeCodeCheck}
                  setJoinDateCheck={setJoinDateCheck}
                  dupliCheck={dupliCheck}
                  setDupliCheck={setDupliCheck}
                  companyList={companyList}
                  setNotRequire={setNotRequire}
                  selectDelete={selectDelete}
                  setDeleteFlag={setDeleteFlag}
                  insertFlag={insertFlag}
                  mainSeqsFlag={mainSeqsFlag}
                  setStatus={setStatus}
                />
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
