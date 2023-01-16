import React, { useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import AuthLnb from "../components/auth/AuthLnb";
import Gnb from "../components/menu/Gnb";
import { useNavigate } from "react-router-dom";
import AuthEmployeeList from "../components/auth/AuthEmployeeList";

const Auth = (props) => {
  const [empInfo, setEmpInfo] = useState([]);
  const baseUrl = "http://localhost:8080";
  const [companySeq, setCompanySeq] = useState();
  const [authSeq, setAuthSeq] = useState();
  const [menuSeq, setMenuSeq] = useState(0);
  const [empList, setEmpList] = useState([]);
  const [workplaceSeq, setWorkplaceSeq] = useState();
  const [departmentSeq, setDepartmentSeq] = useState();
  const [employeeSeq, setEmployeeSeq] = useState();
  const navigate = useNavigate();
  let sessionItem;
  const InitCheck = useCallback(async () => {
    if (!window.sessionStorage.getItem("empInfo")) {
      alert("로그인 후에 이용해주세요");
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    InitCheck();
  }, []);

  const sendAuthSeq = (authSeq) => {
    setAuthSeq(authSeq);
  };
  return (
    <Container fluid="true" className="Auth" id="AuthPage">
      <Row>
        <Col xs={2} style={{ padding: 0 }}>
          <AuthLnb sendAuthSeq={sendAuthSeq} companySeq={companySeq} />
        </Col>
        <Col xs={10}>
          <AuthEmployeeList authSeq={authSeq} />
        </Col>
      </Row>
    </Container>
  );
};

export default Auth;
