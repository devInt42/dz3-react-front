import React, { useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import {Table, Row, Col, Button, Container} from 'react-bootstrap';
import axios from 'axios';
import { StyledComponent } from 'styled-components';
const Employee = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [resId, setResId] = useState("");
  const [resName, setResName] = useState("");
  const baseUrl = "http://localhost:8080";
  const [res, setRes] = useState("");

  const getById = (e) =>{
    axios({
      baseURL : baseUrl,
      url : "/employee/"+employeeId,
    }).then((response)=>{
      console.log(response.data);
    }).catch((error) => console.log(error));
  }

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
        <Row style={{justifyContent:'center'}}>
        <Button variant="primary" onClick={testAxios} style={{width:'100px'}}>
          리스트
        </Button>
        <Button variant="danger"style={{width:'100px'} } onClick={getById}>특정 직원</Button>
        </Row>
        <div>사번 : {employeeId}</div>
        <div>이름 : {employeeName}</div>
      </Container>
    </>
  );
}

export default Employee;
