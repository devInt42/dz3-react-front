import { makeInstaller } from "install";
import React, { useState } from "react";
import { Container, Row, Col, Collapse, Card } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import LNB from "../components/menu/LNB";
import Gnb from "../components/menu/Gnb";
import Auth from "./Auth";
const Main = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Gnb />
      <Row>
        <Col xs={3} style={{ height: "100vh" }}>
          <LNB />
        </Col>
        <Col xs={9}>
          <Auth />
        </Col>
      </Row>
    </>
  );
};
export default Main;
