import React from "react";
import { Row, Col } from "react-bootstrap";
import { useCallback, useEffect, useState } from "react";
import AllCompanyList from "./AllCompanyList";
import AllSelectList from "./AllSelectList";
import AllEmployeeList from "./AllEmployeeList";
import "../modals/OrganizationChart";
import "../modals/SearchModal.css";

const CommonModal = (props) => {
  const { open, close, header, getInfoCaLLback } = props;
  const [departmentSeq, setDepartmentSeq] = useState();
  const [checkItem, setCheckItem] = useState([]);
  const [text, setText] = useState();
  const [employeeName, setEmployeeName] = useState();
  const [authSeq, setAuthSeq] = useState();
  const [pointCompanySeq, setPointCompanySeq] = useState();
  const [selectCompanySeq, setSelectCompanySeq] = useState();
  const [checkCount, setCheckCount] = useState([]);

  //값 받아오기
  useEffect(() => {
    setAuthSeq(props.authSeq);
    setPointCompanySeq(props.pointCompanySeq);
    setSelectCompanySeq(props.selectCompanySeq);
  }, [props]);

  //함수 보냄
  const sendDepartmentSeq = (i) => {
    setDepartmentSeq(i);
  };
  const sendCheckedElement = (i) => {
    setCheckItem(i);
  };
  const onChange = (e) => {
    setText(e.target.value);
  };
  const sendCheckLength = (i) => {
    setCheckCount(i);
  };

  //버튼 누르면 값 이동
  const sendInputText = () => {
    setEmployeeName(text);
  };

  function SelelctEmplList() {
    getInfoCaLLback(checkItem);
  }

  //처음에 실행하고 바뀔때만 렌더링
  const changeDeptSeq = useCallback(() => {}, [departmentSeq]);
  const changeCheckedList = useCallback(() => {}, [checkItem]);

  //부서Seq가 바뀔때마다 실행
  useEffect(() => {
    changeDeptSeq();
    changeCheckedList();
  }, [departmentSeq]);

  //초기화
  const reset = () => {
    setText("");
  };

  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            {header}
            <button
              onClick={() => {
                close();
                reset();
              }}>
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
                    <option>사원명</option>
                  </select>
                </Col>
                <Col sm={8}>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="검색어를 입력하세요."
                      onChange={onChange}
                      value={text || ""}></input>
                  </div>
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
                <Col sm={5} className="AllCompanyList">
                  <AllCompanyList
                    sendDepartmentSeq={sendDepartmentSeq}
                    pointCompanySeq={pointCompanySeq}
                  />
                </Col>
                <Col sm={7}>
                  <Row sm={7} className="AllCheckbox">
                    <AllEmployeeList
                      departmentSeq={departmentSeq}
                      sendCheckedElement={sendCheckedElement}
                      employeeName={employeeName}
                      authSeq={authSeq}
                      pointCompanySeq={pointCompanySeq}
                    />
                  </Row>
                  <Row>
                    <div>
                      <span className="CommonBtn">
                        • 선택목록{" "}
                        <span style={{ fontWeight: "bolder" }}>
                          {checkCount}
                        </span>
                      </span>
                      <button
                        type="button"
                        class="btn btn-secondary"
                        onClick={SelelctEmplList}>
                        확인
                      </button>
                    </div>
                  </Row>
                  <Row sm={4} className="AllChoiceEmp">
                    <AllSelectList
                      checkItem={checkItem}
                      sendCheckLength={sendCheckLength}
                    />
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
