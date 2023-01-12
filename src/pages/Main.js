import { makeInstaller } from "install";
import React, { useState } from "react";
import { Container, Row, Col, Collapse, Card } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import LNB from "../components/menu/LNB";

const Main = () => {
  const [open, setOpen] = useState(false);

  return (
    <Row>
      <Col xs={2} style={{ height: "100vh" }}>
        <LNB />
      </Col>
      <Col xs={10}></Col>
    </Row>
  );
};
export default Main;
