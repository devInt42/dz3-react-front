import React, { useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import AuthGroupLnb from "../components/authGroup/AuthGroupLnb";
import { useNavigate } from "react-router-dom";
import AuthMenu from "../components/authGroup/AuthMenu";
const AuthGroup = () => {
  const baseUrl = "http://localhost:8080";
  const [authSeq, setAuthSeq] = useState();
  const [selectCompanySeq, setSelectCompanySeq] = useState();
  const [pointCompanySeq, setPointCompanySeq] = useState();
  const navigate = useNavigate();
  let sessionItem;
  const InitCheck = useCallback(async () => {
    if (!window.sessionStorage.getItem("empInfo")) {
      alert("로그인 후에 이용해주세요");
      navigate("/login");
    } else {
      return;
    }
  }, []);

  useEffect(() => {
    InitCheck();
  }, []);

  useEffect(() => {}, [selectCompanySeq]);
  useEffect(() => {}, [pointCompanySeq]);

  const sendAuthSeq = (authSeq) => {
    setAuthSeq(authSeq);
  };
  const sendSelectCompanySeq = (selectCompanySeq) => {
    setSelectCompanySeq(selectCompanySeq);
  };
  const sendPointCompanySeq = (pointCompanySeq) => {
    setPointCompanySeq(pointCompanySeq);
  };
  return (
    <Container fluid="true" className="Auth" id="AuthPage">
      <Row>
        <Col xs={2} style={{ padding: 0 }}>
          <AuthGroupLnb
            sendAuthSeq={sendAuthSeq}
            sendSelectCompanySeq={sendSelectCompanySeq}
            sendPointCompanySeq={sendPointCompanySeq}
          />
        </Col>
        <Col xs={3}>
          <AuthMenu />
        </Col>
      </Row>
    </Container>
  );
};

export default AuthGroup;
