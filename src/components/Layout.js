import { Outlet, useNavigate, Route, Routes } from "react-router-dom";
import LNB from "./LNB";
import GNB from "./GNB";
import SystemSet from "../pages/SystemSet";
import Auth from "../pages/Auth";
import Login from "../pages/Login";
import { Container, Row, Col } from "react-bootstrap";

import "../css/Layout.module.css";
import { useState } from "react";

function Layout() {

    // const [test, setTest] = useState("");
    // const getTest = (text) => {setTest(text);}

    const [menuSeq, setMenuSeq] = useState("");
    const [menuName, setMenuName] = useState("")
    const getMenuInfo = (menuName, menuSeq) => {
        setMenuSeq(menuSeq);
        setMenuName(menuName);
    }

    return (
        <Container fluid>
            <Row>
                <Col md="auto" style={{border: "1px solid black", padding:"0px", height: "100vh"}}>
                    <LNB getMenuInfo={getMenuInfo}/>
                </Col>

                <Col style={{ border: "1px solid black", padding:"0px"}}>
                    <Row><GNB menuName={menuName} menuSeq={menuSeq}/></Row>
                    <Row>
                        <Col md="auto" style={{border: "1px solid black", padding:"0px", width: "20%", height: "100vh", margin: "20px"}}></Col>
                        <Col></Col>
                    </Row>
                </Col>
            </Row>

        </Container>
        // <div><LNB getTest={getTest}/><div>{test}</div></div>

    );
}

export default Layout;

{/* <div className="layout">
            <GNB />
            <div> */}
                {/* <Col><LNB /></Col> */}
        //         <Col>
        //             <Container>
        //                 <Outlet />
        //             </Container>
        //         </Col>
        //     </div>
        // </div>