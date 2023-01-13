import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row } from "react-bootstrap";
import "../components/login/Login.css";
import { isCompositeComponent } from "react-dom/test-utils";
const Login = () => {
  const [inputComId, setInputComId] = useState("");
  const [inputEmpId, setInputEmpId] = useState("");
  const [inputEmpPwd, setInputEmpPwd] = useState("");
  const baseUrl = "http://localhost:8080";
  const navigate = useNavigate();
  const { state } = useLocation;
  // 페이지 진입 혹은 새로고침시 세션스토리지 초기화
  useState(() => {
    window.sessionStorage.removeItem("empInfo");
  }, []);

  const changeComId = (e) => {
    setInputComId(e.target.value);
  };
  const changeEmpId = (e) => {
    setInputEmpId(e.target.value);
  };
  const changeEmpPwd = (e) => {
    setInputEmpPwd(e.target.value);
  };
  const onKeyPress = (e) => {};
  const checkValue = () => {
    if (inputComId === "") {
      alert("회사 코드를 입력해 주세요");
      return;
    }
    if (inputEmpId === "") {
      alert("사원 ID를 입력해 주세요");
      return;
    }
    if (inputEmpPwd === "") {
      alert("패스워드를 입력해 주세요");
      return;
    }
    const headers = {
      "Content-type": "application/json; charset=UTF-8",
      Accept: "*/*",
    };
    let body = JSON.stringify({
      companyCode: inputComId,
      employeeId: inputEmpId,
      employeePwd: inputEmpPwd,
    });
    axios
      .post(baseUrl + "/company-employee/check", body, { headers })
      .then((res) => {
        window.sessionStorage.setItem("empInfo", JSON.stringify(res.data));
        if (state) {
          navigate(state);
        } else {
          navigate("/dz3/main");
        }
      })
      .catch((e) => {
        if (e.response && e.response.status === 500) {
          return alert("일치하는 정보가 존재하지 않습니다.");
        }
      });
  };

  return (
    <Container fluid="true" className="logIn">
      <div className="loginArea">
        <Row style={{ marginBottom: "5em" }}>
          <h1>
            LastDanth<span style={{ color: "#00aaff" }}>10</span>
          </h1>
        </Row>
        <Row>
          {" "}
          <input
            type="text"
            className="input-group"
            id="comCode"
            onChange={changeComId}
            placeholder="회사코드"
            autoComplete="off"
          />
        </Row>
        <Row>
          <input
            type="text"
            onChange={changeEmpId}
            className="input-group"
            id="empId"
            autoComplete="off"
            placeholder="사원ID"
          />
        </Row>
        <Row>
          <input
            type="password"
            className="input-group"
            onChange={changeEmpPwd}
            id="empPwd"
            placeholder="패스워드"
          />
        </Row>
        <Row>
          <button
            id="btnCheck"
            onClick={() => {
              checkValue();
            }}
          >
            다음
          </button>
        </Row>
      </div>
    </Container>
  );
};
export default Login;
