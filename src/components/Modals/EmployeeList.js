import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import { BsTelephonePlus, BsFillFileEarmarkPersonFill } from "react-icons/bs";

const EmployeeList = (props) => {
  const [companySeq, setCompanySeq] = useState(2);
  const baseUrl = "http://localhost:8080";
  const [departmentSeq, setDepartmentSeq] = useState();
  const [workplaceSeq, setWorkplaceSeq] = useState();
  const [deptList, setDeptList] = useState([]);
  const [employeeSeq, setEmployeeSeq] = useState();
  const [countEmployee, setCountEmployee] = useState(null); // 총 사원수

  //modal.js로 값이동
  useEffect(() => {
    props.sendEmployeeSeq(employeeSeq);
  }, [employeeSeq]);

  function sendEmployeeSeq(a) {
    setEmployeeSeq(a);
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
          { params: deptData }
        );
        setDeptList(getAllDeptResult.data);
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

  useEffect(() => {
    getAllDept();
    getEmplCount();
  }, [departmentSeq]);

  return (
    <div>
      {deptList &&
        deptList.map((dList) => (
          <Row
            key={dList.employeeSeq}
            onClick={() => {
              sendEmployeeSeq(dList.employeeSeq);
            }}>
            <Col sm={3} className="image">
              {" "}
              <div style={{ padding: "25px" }}>
                {" "}
                <BsFillFileEarmarkPersonFill size="70" />
              </div>
            </Col>
            <Col sm={9}>
              <Row className="Searchname">
                {dList.employeeName} | {dList.employeeId}
              </Row>
              <Row className="Searchstage">회사명 > {dList.workplaceName}</Row>
              <Row className="Searchphnum">
                <div style={{ width: "35px" }}>
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
