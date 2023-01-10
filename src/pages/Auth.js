import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import AuthLnb from "../components/auth/AuthLnb";
import Gnb from "../components/menu/Gnb";
import AuthEmployeeList from "../components/auth/AuthEmployeeList";

const Auth = () => {
  const baseUrl = "http://localhost:8080";
  const [companySeq, setCompanySeq] = useState(2);
  const [authSeq, setAuthSeq] = useState();
  const [menuSeq, setMenuSeq] = useState(0);
  const [empList, setEmpList] = useState([]);

  useEffect(() => {}, [authSeq]);

  const sendAuthSeq = (authSeq) => {
    setAuthSeq(authSeq);
  };
  return (
    <div>
      <Gnb />
      <Container>
        <Row>
          <Col xs={2} style={{ padding: 0 }}>
            <AuthLnb sendAuthSeq={sendAuthSeq} />
          </Col>
          <Col xs={10}>
            <AuthEmployeeList authSeq={authSeq} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Auth;
