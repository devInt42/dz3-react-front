import React, { useEffect } from "react";
import { useState } from "react";
import "../Modals/Modal.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { BsTelephonePlus } from "react-icons/bs";
import { BsFillFileEarmarkPersonFill } from "react-icons/bs";
const Modal = (props) => {
  const { open, close, header } = props;
  const baseUrl = "http://localhost:8080";
  const [deptNameList, setDeptNameList] = useState([]);
  const [deptList, setDeptList] = useState([]);
  const [deptDetail, setDeptDetail] = useState([]);

  //부서 전체 출력
  useEffect(() => {
    const url = baseUrl + "/department/list";
    axios({
      method: "get",
      url: url,
    }).then((res) => {
      setDeptNameList(res.data);
    });
  }, []);

  //부서값에 해당되는 직원 list로 출력하는 함수
  function test() {
    const url = baseUrl + "/department/list";
    axios({
      method: "get",
      url: url,
    }).then((res) => {
      // console.log(res.data)
      setDeptList(res.data);
    });
  }

  //리스트값에 해당되는 직원의 상세페이지
  function test2() {
    const url = baseUrl + "/department/list";
    axios({
      method: "get",
      url: url,
    }).then((res) => {
      // console.log(res.data)
      setDeptDetail(res.data);
      console.log(deptDetail);
    });
  }
  // useEffect( ()=> {
  //     const url = baseUrl + "/department/deptnamelist";
  //     axios({
  //         method: "get",
  //         url: url,
  //       }).then((res) => {
  //         setDeptList(res.data);
  //         console.log(res.data);
  //       });
  //     },[]);

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
            전체그룹 | 마이그룹
            <hr />
            <Container>
              <Row>
                {/* <Button variant="primary" onClick={DeptNameList}>DeptNameList</Button>{' '} */}
                <Col sm={3} className="test1">
                  {/* {props.children} */}

                  {deptNameList.map((deptNameList, i) => {
                    return (
                      deptNameList && (
                        <div key={i}>
                          -{" "}
                          <span onClick={() => test()}>
                            {deptNameList.departmentName}
                          </span>
                        </div>
                        // <div key={i}>- {deptNameList.departmentName}</div>
                      )
                    );
                  })}

                  {/* {JSON.stringify(deptNameList.deptName)} */}
                  {/* {JSON.stringify(deptNameList)} */}
                </Col>

                <Col sm={5} className="test2">
                  {/* {JSON.stringify(deptList)} */}
                  {deptList.map((deptList, i) => {
                    return (
                      deptList && (
                        <div key={i}>
                          <Container>
                            <Row onClick={() => test2()}>
                              <Col sm={3} classname="image">
                                {" "}
                                <div style={{ padding: "25px" }}>
                                  {" "}
                                  <BsFillFileEarmarkPersonFill size="70" />
                                </div>
                              </Col>
                              <Col sm={9}>
                                <Row className="name">
                                  위치 : {deptList.departmentLoc}
                                </Row>
                                <Row className="stage">
                                  카테고리 : {deptList.departmentCategory}
                                </Row>
                                <Row className="phnum">
                                  <div style={{ width: "35px" }}>
                                    <BsTelephonePlus />
                                  </div>
                                  {deptList.departmentCall}{" "}
                                </Row>
                              </Col>
                            </Row>
                            <hr />
                          </Container>
                        </div>
                      )
                    );
                  })}
                </Col>

                {deptDetail && (
                  <Col sm={4} className="test3">
                    <div>
                      <Row>
                        <Col sm={9}>이미지1</Col>
                        <Col sm={3}>이미지2</Col>
                      </Row>
                      <Row>
                        {
                          <div>
                            {JSON.stringify(Object.values(deptDetail[0])[1])}
                          </div>
                        }
                        {/* {JSON.stringify(Object.values(Object.values(deptDetail)))} */}
                      </Row>
                      <Row>a</Row>
                      <Row>a</Row>
                    </div>
                    <hr />
                    <div>
                      <Row>a</Row>
                      <Row>a</Row>
                      <Row>a</Row>
                      <Row>a</Row>
                    </div>
                  </Col>
                )}
              </Row>
            </Container>
          </main>
        </section>
      ) : null}
    </div>
  );
};

export default Modal;
