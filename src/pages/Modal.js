import React, { useEffect } from "react";
import { useState } from "react";
import "../components/Modals/Modal.css";
import { Container, Row, Col } from "react-bootstrap";

import CompanyList from "../components/Modals/CompanyList";
import EmployeeList from "../components/Modals/EmployeeList";
import EmployeeDetail from "../components/Modals/EmployeeDetail";

const Modal = (props) => {
  const { open, close, header } = props;
  const [departmentSeq, setDepartmentSeq] = useState();
  const [workplaceSeq, setWorkplaceSeq] = useState();
  const [employeeSeq, setEmployeeSeq] = useState();

  //함수를 보냄
  const sendDepartmentSeq = (i) => {
    setDepartmentSeq(i);
  };

  //함수를 보냄
  const sendWorkplaceSeq = (i) => {
    setWorkplaceSeq(i);
  };

  //함수를 보냄
  const sendEmployeeSeq = (i) => {
    setEmployeeSeq(i);
  };

  //바뀔때마다 랜더링
  useEffect(() => {
    // console.log("departmentSeq:" + departmentSeq);
  }, [departmentSeq]);

  useEffect(() => {
    // console.log("workplaceseq:" + workplaceSeq);
  }, [workplaceSeq]);

  useEffect(() => {
    // console.log("employeeSeq 받아온 값:" + employeeSeq);
  }, [employeeSeq]);

  return (
    //open 누르면 openModal 클래스 생성
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              X
            </button>
          </header>
          <main>
            <div className="br">
              <span className="hover"> 전체그룹 </span> |{" "}
              <span className="hover">마이그룹</span>
            </div>

            <hr />

            <Container>
              <Row>
                <Col sm={3}>
                  <select
                    className="form-select"
                    aria-label="Default select example">
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
            </Container>
          </main>
        </section>
      ) : null}
    </div>
  );
};

export default Modal;
