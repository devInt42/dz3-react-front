import { Outlet, useNavigate, Route, Routes } from "react-router-dom";
import LNB from "./LNB";
import GNB from "./GNB";
import { Container, Row, Col } from "react-bootstrap";
import "../css/Layout.module.css";
import React, { useState, useCallback } from "react";
import SubMenu from "../pages/SubMenu";

function Layout() {
  // const [test, setTest] = useState("");
  // const getTest = (text) => {setTest(text);}

  const [menuSeq, setMenuSeq] = useState(0);
  const [menuName, setMenuName] = useState("");
  const getMenuInfo = useCallback(
    (menuName, menuSeq) => {
      setMenuSeq(menuSeq);
      setMenuName(menuName);
    },
    [menuSeq, menuName]
  );
  // const getMenuInfo =  (menuName, menuSeq) => {
  //     setMenuSeq(menuSeq);
  //     setMenuName(menuName);
  // };

  const [lastSeq, setLastSeq] = useState(0);
  const getLastMenuSeq = (lastSeq) => {
    setLastSeq(lastSeq);
  };

  return (
    <Container fluid>
      <Row>
        <Col
          md="auto"
          style={{ border: "1px solid black", padding: "0px", height: "100vh" }}
        >
          <LNB getMenuInfo={getMenuInfo} />
        </Col>

        <Col style={{ border: "1px solid black", padding: "0px" }}>
          <Row>
            <GNB menuName={menuName} />
          </Row>
          <Row>
            <Col
              md="auto"
              style={{
                border: "1px solid black",
                padding: "0px",
                width: "15%",
                height: "100vh",
                marginTop: "10px",
                marginLeft: "20px",
                backgroundColor: "rgba(221, 219, 216, 0.409)",
              }}
            >
              <SubMenu menuSeq={menuSeq} />
            </Col>
            <Col>
              <Outlet />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
    // <div><LNB getTest={getTest}/><div>{test}</div></div>
  );
}

export default React.memo(Layout);

{
  /* <div className="layout">
            <GNB />
            <div> */
}
{
  /* <Col><LNB /></Col> */
}
//         <Col>
//             <Container>
//                 <Outlet />
//             </Container>
//         </Col>
//     </div>
// </div>