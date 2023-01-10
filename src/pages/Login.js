import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Toast,
  Row,
  Col,
  Button,
  InputGroup,
  Form,
} from "react-bootstrap";
import "../components/login/Login.css";
import { ReactComponent as CompanyIcon } from "../components/login/company.svg";
import { ReactComponent as PersonIcon } from "../components/login/person.svg";
const Login = () => {
  const [inputComId, setInputComId] = useState("");
  const [inputEmpId, setInputEmpId] = useState("");
  const [inputEmpPwd, setInputEmpPwd] = useState("");

  const baseUrl = "http://localhost:8080";
  const changeComId = (e) => {
    setInputComId(e.target.value);
  };
  const changeEmpId = (e) => {
    setInputEmpId(e.target.value);
  };
  const changeEmpPwd = (e) => {
    setInputEmpPwd(e.target.value);
  };

  const checkValue = () => {
    console.log(inputComId);
    if (inputComId === "") {
      alert("공백");
      return;
    }
    if (inputEmpId === "") {
      alert("공백2");
      return;
    }
    let body = {
      companyCode: inputComId,
      employeeId: inputEmpId,
      employeePwd: inputEmpPwd,
    };
    axios.post(baseUrl + "/company-employee/check", body).then((res) => {
      console.log(res.data);
      if (res.data === []) {
        console.log("실패");
      }
    });
  };

  return (
    <Container fluid="true" className="logIn">
      <InputGroup id="inputCompany">
        <InputGroup.Text id="companyCode">
          <CompanyIcon />
        </InputGroup.Text>
        <Form.Control placeholder="회사 ID" onChange={changeComId} />
      </InputGroup>
      <InputGroup id="inputId">
        <InputGroup.Text id="employeeId">
          <PersonIcon />
        </InputGroup.Text>
        <Form.Control placeholder="사원 ID" onChange={changeEmpId} />
      </InputGroup>
      <InputGroup id="inputPwd">
        <InputGroup.Text id="employeePwd">
          <PersonIcon />
        </InputGroup.Text>
        <Form.Control placeholder="패스워드" onChange={changeEmpPwd} />
      </InputGroup>
      <button id="btnCheck" onClick={checkValue}>
        다음
      </button>
    </Container>
  );
};
export default Login;
