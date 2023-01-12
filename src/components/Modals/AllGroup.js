import { Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import CompanyList from "../Modals/CompanyList";
import EmployeeList from "../Modals/EmployeeList";
import EmployeeDetail from "../Modals/EmployeeDetail";

const AllGroup = (props) => {
  const [departmentSeq, setDepartmentSeq] = useState();
  const [workplaceSeq, setWorkplaceSeq] = useState();
  const [employeeSeq, setEmployeeSeq] = useState();

  //함수 보냄
  const sendDepartmentSeq = (i) => {
    setDepartmentSeq(i);
  };
  const sendWorkplaceSeq = (i) => {
    setWorkplaceSeq(i);
  };
  const sendEmployeeSeq = (i) => {
    setEmployeeSeq(i);
  };

  //바뀔때마다 랜더링
  useEffect(() => {}, [departmentSeq]);
  useEffect(() => {}, [workplaceSeq]);
  useEffect(() => {}, [employeeSeq]);

  return (
    <div>
      <Row>
        <Col sm={3}>
          <select className="form-select" aria-label="Default select example">
            <option>전체</option>
            <option value="1">회사명</option>
            <option value="2">사업자명</option>
            <option value="3">부서명</option>
          </select>
        </Col>
        <Col sm={9}>
          <div className="mb-3">
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="1"></textarea>
          </div>
        </Col>
      </Row>

      <Row>
        <Col className="deptList" sm={3}>
          <CompanyList
            sendDepartmentSeq={sendDepartmentSeq}
            sendWorkplaceSeq={sendWorkplaceSeq}
          />
        </Col>
        <Col sm={5} className="employeeList">
          <EmployeeList
            sendEmployeeSeq={sendEmployeeSeq}
            departmentSeq={departmentSeq}
            workplaceSeq={workplaceSeq}
          />
          <br />
        </Col>
        <Col sm={4} className="employeeDetail">
          <EmployeeDetail employeeSeq={employeeSeq} />
        </Col>
      </Row>
    </div>
  );
};

export default AllGroup;
