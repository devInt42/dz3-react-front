import React from "react";
import { useState } from "react";
import "../Modals/Modal.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";

const Modal = (props) => {
  const { open, close, header } = props;
  const baseUrl = "http://localhost:8080";
  const [deptNameList, setDeptNameList] = useState([]);

  function DeptNameList() {
    const url = baseUrl + "/dept/deptNameList";
    axios({
      method: "get",
      url: url,
    }).then((res) => {
      setDeptNameList(res.data);
    });
  }

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
                  {props.children}
                  {DeptNameList()}

                  {deptNameList.map((deptNameList, i) => {
                    return (
                      deptNameList && (
                        <div key={i}>- {deptNameList.deptName}</div>
                      )
                    );
                  })}

                  {/* {JSON.stringify(deptNameList.deptName)} */}
                  {/* {JSON.stringify(deptNameList)} */}
                </Col>

                <Col sm={5} className="test2">
                  값2
                </Col>

                <Col sm={4} className="test3">
                  값3
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
