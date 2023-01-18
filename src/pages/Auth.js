import React, { useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import AuthLnb from "../components/auth/AuthLnb";
import { useNavigate } from "react-router-dom";
import AuthEmployeeList from "../components/auth/AuthEmployeeList";

const Auth = (props) => {
  const baseUrl = "http://localhost:8080";
  const [companySeq, setCompanySeq] = useState();
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
    console.log("선택된 회사번호 : " + pointCompanySeq);
  };
  return (
    <Container fluid="true" className="Auth" id="AuthPage">
      <Row>
        <Col xs={2} style={{ padding: 0 }}>
          <AuthLnb
            sendAuthSeq={sendAuthSeq}
            sendSelectCompanySeq={sendSelectCompanySeq}
            sendPointCompanySeq={sendPointCompanySeq}
          />
        </Col>
        <Col xs={10}>
          <AuthEmployeeList
            authSeq={authSeq}
            pointCompanySeq={pointCompanySeq}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Auth;
