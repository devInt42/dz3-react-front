import { Outlet, useNavigate } from "react-router-dom";
import LNB from "./LNB";
import GNB from "./GNB";
import { Container, Row, Col } from "react-bootstrap";

import "../css/Layout.module.css";

function Layout() {
    return (
        <div className="layout">
            <GNB />
            <div>
                {/* <Col><LNB /></Col> */}
                <Col>
                    <Container>
                        <Outlet />
                    </Container>
                </Col>
            </div>
        </div>
    );
}

export default Layout;