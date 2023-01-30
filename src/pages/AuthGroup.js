import React, { useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import AuthGroupLnb from "../components/authGroup/AuthGroupLnb";
import { useNavigate } from "react-router-dom";
import AuthMenu from "../components/authGroup/AuthMenu";
import "../components/authGroup/AuthGroup.css";
const AuthGroup = () => {
  const [authSeq, setAuthSeq] = useState();
  const [selectCompanySeq, setSelectCompanySeq] = useState();
  const [pointCompanySeq, setPointCompanySeq] = useState();

  useEffect(() => {}, [selectCompanySeq]);
  useEffect(() => {}, [pointCompanySeq]);
  useEffect(() => {}, [authSeq]);

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
          <div className="menuArea">
            <AuthMenu
              authSeq={authSeq}
              selectCompanySeq={selectCompanySeq}
              pointCompanySeq={pointCompanySeq}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthGroup;
