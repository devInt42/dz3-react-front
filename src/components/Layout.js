import { Outlet, useNavigate } from "react-router-dom";
import LNB from "./LNB";
import GNB from "./GNB";
import SystemSet from "../pages/SystemSet";
import { Container, Row, Col } from "react-bootstrap";

import "../css/Layout.module.css";

function Layout() {
    return (
        <Container fluid>
            <Row>
                <Col md="auto" style={{border: "1px solid black", padding:"0px", height: "100vh"}}><LNB /></Col>

                <Col style={{ border: "1px solid black", padding:"0px"}}>
                    <Row><GNB /></Row>
                    <Row>
                        <Col className="subMenu" md="auto" style={{border: "1px solid black", padding:"0px", width: "20%", height: "100vh", margin: "20px"}}><Outlet /></Col>
                        <Col className="contents"><Outlet /></Col>
                    </Row>
                </Col>
            </Row>

        </Container>

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