import { Row, Col } from "react-bootstrap";
import { useCallback, useEffect, useState } from "react";
import React from "react";
import "../components/Modals/SearchModal.css";
import AllCompanyList from "../components/CommonModal/AllCompanyList";
import AllSelectList from "../components/CommonModal/AllSelectList";
import AllEmployeeList from "../components/CommonModal/AllEmployeeList";

const CommonModal = (props) => {
  const { open, close, header } = props;
  const [departmentSeq, setDepartmentSeq] = useState();
  const [checkedList, setCheckedLists] = useState([]);

  console.log("렌더링");
  //함수 보냄
  const sendDepartmentSeq = (i) => {
    setDepartmentSeq(i);
  };

  const sendCheckedList = (i) => {
    setCheckedLists(i);
  };

  //처음에 실행하고 바뀔때만 렌더링

  const changeDeptSeq = useCallback(() => {}, [departmentSeq]);
  const chagngeCheckedList = useCallback(() => {}, [checkedList]);

  useEffect(() => {
    changeDeptSeq();
  }, [departmentSeq]);

  useEffect(() => {
    chagngeCheckedList();
  }, [checkedList]);

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
            <div>
              <Row>
                <Col sm={3}>
                  <select
                    className="form-select"
                    aria-label="Default select example">
                    <option>사원명(ID)</option>
                    <option value="1">TEST</option>
                    <option value="2">TEST</option>
                    <option value="3">TEST</option>
                  </select>
                </Col>
                <Col sm={9}>
                  <div className="mb-3">
                    <textarea
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      placeholder="검색어를 입력하세요."
                      rows="1"></textarea>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col sm={5} className="AllCompanyList">
                  <AllCompanyList sendDepartmentSeq={sendDepartmentSeq} />
                </Col>
                <Col sm={7}>
                  <Row sm={7} className="AllCheckbox">
                    <AllEmployeeList
                      departmentSeq={departmentSeq}
                      sendCheckedList={sendCheckedList}
                    />
                  </Row>
                  <Row>• 선택목록</Row>
                  <Row sm={4} className="AllChoiceEmp">
                    <AllSelectList />
                  </Row>
                </Col>
              </Row>
            </div>
          </main>
        </section>
      ) : null}
    </div>
  );
};

export default CommonModal;
