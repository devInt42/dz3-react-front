import React, { useEffect } from "react";
import { useState } from "react";
import "../Modals/Modal.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { BsTelephonePlus } from "react-icons/bs";

const Modal = (props) => {
  const { open, close, header } = props;
  const baseUrl = "http://localhost:8080";
  const [deptNameList, setDeptNameList] = useState([]);
  const [deptList, setDeptList] = useState([]);

  useEffect( ()=> {
   
        const url = baseUrl + "/department/deptnamelist";
        axios({
          method: "get",
          url: url,
        }).then((res) => {
          setDeptNameList(res.data);
        });

  },[]);

//부서값에 해당되는 직원 list로 출력하는 함수
    function test() {

        const url = baseUrl + "/department/deptnamelist";
        axios({
          method: "get",
          url: url,
        }).then((res) => {
            // console.log(res.data)
            setDeptList(res.data);
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
                        <div key={i}>- <span onClick={ (() => test())}>{deptNameList.departmentName}</span></div>
                        // <div key={i}>- {deptNameList.departmentName}</div>
                      )
                    );
                  })}

                  {/* {JSON.stringify(deptNameList.deptName)} */}
                  {/* {JSON.stringify(deptNameList)} */}
                </Col>

                <Col sm={5} className="test2">
                 {/* {JSON.stringify(deptList)} */}

                 {deptList.map ( (deptList, i) => {
                    return(
                        deptList && (
                            <div key={i}>

                                <Container>
                                    <Row>
                                    <Col sm={3} > image </Col>
                                    <Col sm={9}>
                                        <Row className="name">위치 : {deptList.departmentLoc}</Row>
                                        <Row className="stage">카테고리 : {deptList.departmentCategory}</Row>
                                        <Row className="phnum"><div style={{width:'30px', marginRight:'5px'}}><BsTelephonePlus /></div>{deptList.departmentCall} </Row>
                                     </Col>
                                    </Row>
                                <hr />
                                </Container>
                            </div>
                        )
                    )

                 })}

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
