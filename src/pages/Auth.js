import React, { useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import AuthLnb from "../components/auth/AuthLnb";
import Gnb from "../components/menu/Gnb";
import { useNavigate } from "react-router-dom";
import AuthEmployeeList from "../components/auth/AuthEmployeeList";

const Auth = () => {
  const [item, setItem] = useState();
  const baseUrl = "http://localhost:8080";
  const [companySeq, setCompanySeq] = useState(42);
  const [authSeq, setAuthSeq] = useState();
  const [menuSeq, setMenuSeq] = useState(0);
  const [empList, setEmpList] = useState([]);
  const [workplaceSeq, setWorkplaceSeq] = useState();
  const [departmentSeq, setDepartmentSeq] = useState();
  const [employeeSeq, setEmployeeSeq] = useState();
  const navigate = useNavigate();

  const InitCheck = useCallback(async () => {
    if (await !window.sessionStorage.getItem("empInfo")) {
      alert("로그인 후에 이용해주세요");
      navigate("/login");
    } else {
      let sessionItem = await JSON.parse(
        window.sessionStorage.getItem("empInfo")
      );
      setItem(sessionItem);
    }
  }, []);

  useEffect(() => {
    InitCheck();
  }, []);

  useEffect(() => {
    if (item != null) {
      console.log(item);
      setCompanySeq(item.companySeq);
      setWorkplaceSeq(item.workplaceSeq);
      setDepartmentSeq(item.departmentSeq);
      setEmployeeSeq(item.employeeSeq);
    }
  }, [item]);

  useEffect(() => {}, [authSeq]);

  const sendAuthSeq = (authSeq) => {
    setAuthSeq(authSeq);
  };
  return (
    <Container fluid="true" className="Auth" id="AuthPage">
      <Row>
        <Col xs={2} style={{ padding: 0 }}>
          <AuthLnb sendAuthSeq={sendAuthSeq} />
        </Col>
        <Col xs={10}>
          <AuthEmployeeList authSeq={authSeq} />
        </Col>
      </Row>
    </Container>
  );
};

export default Auth;
