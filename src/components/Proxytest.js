import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Container } from "react-bootstrap";

function Proxytest() {
  const [employeeId, setEmployeeId] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [resId, setResId] = useState("");
  const [resName, setResName] = useState("");
  const baseUrl = "http://localhost:8080";
  const [res, setRes] = useState("");
  async function testAxios() {
    const data = {
      employeeId: employeeId,
      employeeName: employeeName,
    };

    console.log(JSON.stringify(data));

 

    axios({
      headers: { contentType: "application/json" },
      url: "/employee/emplist",
      method: "get",
      data: JSON.stringify(data),
      baseURL: baseUrl,
    })
      .then((response) => {
        console.log(response.data);
        setRes(response.data);
      })
      .catch((error) => console.log(error));
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
        <div>백엔드에서 가져온 데이터입니다 : {JSON.stringify(res)}</div>
        사번 : <input type="text" onChange={changeId} id="empId" />
        이름 : <input type="text" onChange={changeName} id="empName" />
        <Button variant="primary" onClick={testAxios}>
          확인
        </Button>
        <div>사번 : {employeeId}</div>
        <div>이름 : {employeeName}</div>
      </Container>
    </>
  );
}

export default Proxytest;
