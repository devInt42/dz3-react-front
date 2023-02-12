import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { Row, Col } from "react-bootstrap";
import { BsTelephonePlus, BsFillFileEarmarkPersonFill } from "react-icons/bs";
import DepartmentTree from "../auth/DepartmentTree";
const EmployeeList = (props) => {
  const baseUrl = "http://localhost:8080";
  const [companySeq, setCompanySeq] = useState();
  const [departmentSeq, setDepartmentSeq] = useState();
  const [workplaceSeq, setWorkplaceSeq] = useState();
  const [deptList, setDeptList] = useState([]);
  const [countEmployee, setCountEmployee] = useState(null);
  const [companyName, setCompanyName] = useState();
  const [employeeName, setEmployeeName] = useState();

  // 선택한 사원의 리스트 전송
  function sendPointEmpList(a) {
    props.sendPointEmpList(a);
  }

  //modal에서 값받아서 넣기
  useEffect(() => {
    async function getDeptSeq() {
      const result = await props.departmentSeq;
      setDepartmentSeq(result);
    }
    getDeptSeq();
  }, [props]);

  useEffect(() => {
    async function getWorkSeq() {
      const result = await props.workplaceSeq;
      setWorkplaceSeq(result);
    }
    getWorkSeq();
  }, [props]);

  useEffect(() => {
    async function getCompanyName() {
      const result = await props.companyName;
      setCompanyName(result);
    }
    getCompanyName();
  });

  useEffect(() => {
    async function getEmplName() {
      const result = await props.employeeName;
      setEmployeeName(result);
    }
    getEmplName();
  }, [props]);

  //해당 직원리스트
  const getAllDept = useCallback(async () => {
    if (departmentSeq == null) {
    } else {
      let deptData = {
        companySeq: companySeq,
        workplaceSeq: workplaceSeq,
        departmentSeq: departmentSeq,
      };
      try {
        const getAllDeptResult = await axios.get(
          `${baseUrl}/department-employee/employeeList`,
          {
            params: deptData,
            headers: {
              Authorization: window.sessionStorage.getItem("empInfo"),
            },
          }
        );
        setDeptList(getAllDeptResult.data);
        //부서 값 안들어옴
      } catch (error) {
        console.log(error);
      }
    }
  }, [departmentSeq]);

  const getEmplCount = useCallback(async () => {
    if (departmentSeq == null) {
    } else {
      let emplData = {
        departmentSeq,
      };
      try {
        const getEmplCountResult = await axios.get(
          `${baseUrl}/department-employee/count/${departmentSeq}`,
          { params: emplData }
        );
        setCountEmployee(getEmplCountResult.data);
      } catch (error) {
        console.log(error);
      }
    }
  }, [departmentSeq]);

  const getEmplElement = useCallback(async () => {
    if (employeeName == null) {
    } else {
      let getEmplData = {
        companySeq: companySeq,
        employeeName: employeeName,
      };
      try {
        const getEmplElementResult = await axios.get(
          `${baseUrl}/department-employee/search`,
          {
            params: getEmplData,
            headers: {
              Authorization: window.sessionStorage.getItem("empInfo"),
            },
          }
        );
        setDeptList(getEmplElementResult.data);
      } catch (error) {
        console.log(error);
      }
    }
  }, [employeeName]);

  //input값 바뀔때마다 값 받아오는 axios
  useEffect(() => {
    getEmplElement();
  }, [employeeName]);

  useEffect(() => {
    getAllDept();
    getEmplCount();
  }, [departmentSeq]);

  return (
    <div>
      {deptList &&
        deptList.map((dList) => (
          <Row
            key={`${dList.companyName}${dList.employeeSeq}`}
            onClick={() => {
              sendPointEmpList(dList);
            }}>
            <Col
              sm={3}
              className="image"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <img
                src={process.env.PUBLIC_URL + "/empimg.png"}
                style={{ width: "60%" }}
                alt=""
              />
            </Col>
            <Col sm={9}>
              <Row className="Searchname">
                {dList.employeeName} &nbsp; &#124;&nbsp;
                <span
                  style={{
                    width: "30%",
                    fontSize: "12px",
                    color: "#9f9f9f",
                    lineHeight: "27px",
                    textAlign: "left",
                    margin: "0",
                    padding: "0",
                  }}>
                  &#40;&nbsp; {dList.employeeId}&nbsp;&#41;
                </span>
              </Row>
              <Row className="Searchstage" style={{ display: "flex" }}>
                <p style={{ margin: "0", padding: "0", display: "flex" }}>
                  {dList.companyName}&gt;
                  {dList.workplaceName}
                  <DepartmentTree
                    key={`${dList.companyName}${dList.employeeSeq}`}
                    departmentSeq={dList.departmentSeq}
                  />
                </p>
              </Row>
              <Row className="Searchphnum">
                <div style={{ width: "35px", margin: "0" }}>
                  <BsTelephonePlus />
                </div>
                {dList.employeePh}
              </Row>
            </Col>
            <hr className="Searchhr" />
          </Row>
        ))}
    </div>
  );
};

export default EmployeeList;
