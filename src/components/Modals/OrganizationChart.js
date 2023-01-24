import "./SearchModal.css";
import { Row, Col } from "react-bootstrap";
import { useCallback, useEffect, useState } from "react";
import CompanyList from "./CompanyList";
import EmployeeList from "./EmployeeList";
import EmployeeDetail from "./EmployeeDetail";

const OrganizationChart = (props) => {
  const { open, close, header } = props;
  const [departmentSeq, setDepartmentSeq] = useState();
  const [workplaceSeq, setWorkplaceSeq] = useState();
  const [employeeSeq, setEmployeeSeq] = useState();
  const [companyName, setCompanyName] = useState();

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
  const sendCompanyName = (i) => {
    setCompanyName(i);
  };

  //처음에 실행하고 바뀔때만 렌더링
  const changeDeptSeq = useCallback(() => {}, [departmentSeq]);
  const changeWorkSeq = useCallback(() => {}, [workplaceSeq]);
  const changeEmplSeq = useCallback(() => {}, [employeeSeq]);
  const changeComSeq = useCallback(() => {}, [departmentSeq]);

  useEffect(() => {
    changeDeptSeq();
  }, [departmentSeq]);

  useEffect(() => {
    changeWorkSeq();
  }, [workplaceSeq]);

  useEffect(() => {
    changeEmplSeq();
  }, [employeeSeq]);

  useEffect(() => {
    changeComSeq();
  }, [departmentSeq]);

  return (
    //open 누르면 openModal 클래스 생성
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            {header}

            <button onClick={close}>X</button>
          </header>
          <main>
            <div>
              <div>
                <Row>
                  <Col sm={3}>
                    <select
                      className="form-select"
                      aria-label="Default select example">
                      <option>전체</option>
                      <option value="1">부서명</option>
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
                  <Col className="SearchdeptList" sm={3}>
                    <CompanyList
                      sendDepartmentSeq={sendDepartmentSeq}
                      sendWorkplaceSeq={sendWorkplaceSeq}
                      sendCompanyName={sendCompanyName}
                    />
                  </Col>
                  <Col sm={5} className="SearchemployeeList">
                    <EmployeeList
                      sendEmployeeSeq={sendEmployeeSeq}
                      departmentSeq={departmentSeq}
                      workplaceSeq={workplaceSeq}
                      companyName={companyName}
                    />
                    <br />
                  </Col>
                  <Col sm={4} className="SearchemployeeDetail">
                    <EmployeeDetail
                      employeeSeq={employeeSeq}
                      companyName={companyName}
                    />
                  </Col>
                </Row>
              </div>
            </div>
          </main>
        </section>
      ) : null}
    </div>
  );
};

export default OrganizationChart;
