import { Row, Col } from "react-bootstrap";
import { useCallback, useEffect, useState } from "react";
import "./SearchModal.css";
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
  const [employeeName, setEmployeeName] = useState();
  const [pointList, setPointList] = useState([]);
  const [selectEmp, setSelectEmp] = useState(null);

  // emplist에서 선택한 사원의 모든 정보 받아오기
  const sendPointEmpList = (i) => {
    setSelectEmp(i);
  };

  useEffect(() => {}, [selectEmp]);

  const sendCompanyName = (i) => {
    setCompanyName(i);
  };
  const sendPointList = (e) => {
    setPointList(e);
  };
  const onChange = (e) => {
    setText(e.target.value);
  };

  //버튼 누르면 값 이동
  const sendInputText = () => {
    setEmployeeName(text);
  };

  //초기화
  const reset = () => {
    setText("");
  };

  //처음에 실행하고 바뀔때만 렌더링
  const changeDeptSeq = useCallback(() => {}, [departmentSeq]);
  const changeWorkSeq = useCallback(() => {}, [workplaceSeq]);
  const changeEmplSeq = useCallback(() => {}, [employeeSeq]);

  useEffect(() => {
    setWorkplaceSeq(pointList.workplaceSeq);
    setDepartmentSeq(pointList.departmentSeq);
  }, [pointList]);

  useEffect(() => {
    changeDeptSeq();
  }, [departmentSeq]);

  useEffect(() => {
    changeWorkSeq();
  }, [workplaceSeq]);

  useEffect(() => {
    changeEmplSeq();
  }, [employeeSeq]);

  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            {header}

            <button
              className="OrganicBtn"
              onClick={() => {
                close();
                reset();
              }}
            >
              X
            </button>
          </header>
          <main>
            <div>
              <div>
                <Row>
                  <Col sm={3}>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                    >
                      <option>사원명</option>
                    </select>
                  </Col>
                  <Col sm={8}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="검색어를 입력하세요."
                      onChange={onChange}
                      value={text || ""}
                    ></input>
                  </Col>
                  <Col sm={1}>
                    <button
                      className="btn btn-secondary"
                      onClick={sendInputText}
                    >
                      검색
                    </button>
                  </Col>
                </Row>
                <Row>
                  <Col className="SearchdeptList" sm={3}>
                    <CompanyList
                      sendPointList={sendPointList}
                      sendCompanyName={sendCompanyName}
                    />
                  </Col>
                  <Col sm={5} className="SearchemployeeList">
                    <EmployeeList
                      departmentSeq={departmentSeq}
                      workplaceSeq={workplaceSeq}
                      companyName={companyName}
                      employeeName={employeeName}
                      sendPointEmpList={sendPointEmpList}
                    />
                    <br />
                  </Col>
                  <Col sm={4} className="SearchemployeeDetail">
                    <EmployeeDetail
                      employeeSeq={employeeSeq}
                      companyName={companyName}
                      selectEmp={selectEmp}
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
