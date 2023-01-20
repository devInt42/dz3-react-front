import { Row, Col, Button } from "react-bootstrap";
import { useCallback, useEffect, useState } from "react";
import React from "react";
import "../modals/OrganizationChart";
import AllCompanyList from "./AllCompanyList";
import AllSelectList from "./AllSelectList";
import AllEmployeeList from "./AllEmployeeList";
import "../modals/SearchModal.css";

const CommonModal = (props) => {
  const { open, close, header, getInfoCaLLback } = props;
  const [departmentSeq, setDepartmentSeq] = useState();
  const [checkItem, setCheckItem] = useState([]); //자식에서 받아올 값

  //함수 보냄
  const sendDepartmentSeq = (i) => {
    setDepartmentSeq(i);
  };
  const sendCheckedElement = (i) => {
    setCheckItem(i);
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

  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            {header}
            <Button className="close" onClick={close}>
              X
            </Button>
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
                      sendCheckedElement={sendCheckedElement}
                    />
                  </Row>
                  <Row>
                    <div>
                      <span className="CommonBtn">• 선택목록</span>
                      <button onClick={SelelctEmplList}>확인 </button>
                    </div>
                  </Row>
                  <Row sm={4} className="AllChoiceEmp">
                    <AllSelectList checkItem={checkItem} />
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
