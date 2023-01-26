import "./SearchModal.css";
import { Row, Col, Button } from "react-bootstrap";
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
  const [text, setText] = useState();
  const [sendText, setSendText] = useState();

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

  const onChange = (e) => {
    setText(e.target.value);
  };

  //버튼 누르면 값 이동
  const sendInputText = () => {
    setSendText(text);
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

  //

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
                      <option>사원명</option>
                    </select>
                  </Col>
                  <Col sm={8}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="검색어를 입력하세요."
                      onChange={onChange}
                      value={text}></input>
                  </Col>
                  <Col sm={1}>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={sendInputText}>
                      검색
                    </button>
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
                      sendText={sendText}
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
