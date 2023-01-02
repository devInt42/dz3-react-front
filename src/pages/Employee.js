import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Container, Row } from "react-bootstrap";
import styled from "styled-components";

function Employee() {
  const [employeeId, setEmployeeId] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [resId, setResId] = useState("");
  const [resName, setResName] = useState("");
  const baseUrl = "http://localhost:8080";
  const [res, setRes] = useState("");
  async function getEmployeeList() {
    const url = baseUrl + "/employee/emplist";
    const data = {
      employeeId: employeeId,
      employeeName: employeeName,
    };
    console.log(JSON.stringify(data));
    axios({
      method: "get",
      url: url,
    }).then((res) => {
      console.log(res.data);
      setRes(res.data);
    });
  }
  async function getEmployeeById() {
    const url = baseUrl + "/employee/emplist/" + employeeId;
    axios({
      method: "get",
      url: url,
    })
      .then((res) => {
        console.log(res.data);
        setRes(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async function removeEmployee() {
    const url = baseUrl + "/employee/emplist/" + employeeId;
    axios({
      method: "delete",
      url: url,
    })
      .then((res) => {
        console.log(res.data);
        setRes(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async function updateEmployee() {
    const url = baseUrl + "/employee/emplist/" + employeeId;
    const data = {
      employeeId: employeeId,
      employeeName: employeeName,
    };
    axios({
      method: "patch",
      url: url,
      data: JSON.stringify(data),
    })
      .then((res) => {
        console.log(res.data);
        setRes(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async function addEmployee() {
    const url = baseUrl + "/employee";
    const data = {
      employeeName: employeeName,
    };
    console.log(JSON.stringify(data));

    axios({
      method: "post",
      url: url,
      data: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        console.log(res.data);
        setRes(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const changeId = (e) => {
    setEmployeeId(e.target.value);
  };
  const changeName = (e) => {
    setEmployeeName(e.target.value);
  };

  return (
    <>
      <Container>
        <Row>
          <div>백엔드에서 가져온 데이터입니다 : {JSON.stringify(res)}</div>
          사번 : <input type="text" onChange={changeId} id="empId" />
          이름 : <input type="text" onChange={changeName} id="empName" />
        </Row>
        <Row>
          <Button
            variant="primary"
            onClick={getEmployeeList}
            style={{ width: "100px" }}
          >
            전체 조회
          </Button>
          <Button
            variant="warning"
            onClick={getEmployeeById}
            style={{ width: "100px" }}
          >
            사번 조회
          </Button>
          <Button
            variant="danger"
            onClick={removeEmployee}
            style={{ width: "100px" }}
          >
            삭제
          </Button>{" "}
          <Button
            variant="success"
            onClick={updateEmployee}
            style={{ width: "100px" }}
          >
            수정
          </Button>{" "}
          <Button
            variant="light"
            onClick={addEmployee}
            style={{ width: "100px" }}
          >
            추가
          </Button>
        </Row>
        <div>사번 : {employeeId}</div>
        <div>이름 : {employeeName}</div>
      </Container>
    </>
  );
}

export default Employee;
