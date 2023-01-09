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

  //함수를 보냄
  const sendDepartmentSeq = (i) => {
    setDepartmentSeq(i);
    // console.log(departmentSeq);
  };

  useEffect(() => {}, [departmentSeq]);

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
                    class="form-select"
                    aria-label="Default select example">
                    <option selected>전체</option>
                    <option value="1">회사명</option>
                    <option value="2">사업자명</option>
                    <option value="3">부서명</option>
                  </select>
                </Col>
                <Col sm={9}>
                  <div class="mb-3">
                    <textarea
                      class="form-control"
                      id="exampleFormControlTextarea1"
                      rows="1"></textarea>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col className="deptList" sm={3}>
                  <CompanyList sendDepartmentSeq={sendDepartmentSeq} />
                </Col>
                <Col sm={5} className="employeeList">
                  <EmployeeList departmentSeq={departmentSeq} />
                  <br />
                </Col>
                <Col sm={4} className="employeeDetail">
                  <EmployeeDetail />
                  {/* <Row>
                    <Col sm={9}></Col>
                    <Col sm={3}>logo</Col>
                    <Row></Row> <hr />
                    <Row> </Row>
                    <Row> </Row>
                  </Row> */}
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
