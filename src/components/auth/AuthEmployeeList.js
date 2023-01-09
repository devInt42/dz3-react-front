import React, { useEffect, useState } from "react";
import { Nav, Container, Row, Button } from "react-bootstrap";
import axios from "axios";

const AuthEmployeeList = (props) => {
  const baseUrl = "http://localhost:8080";
  const [authSeq, setAuthSeq] = useState(null);
  const [page, setPage] = useState(1);
  const [resList, setResList] = useState([]);

  useEffect(() => {
    setAuthSeq(props.authSeq);
  }, [props]);

  useEffect(() => {
    const url =
      baseUrl + "/auth-employee/auth/page/" + page + "?authSeq=" + authSeq;
    axios({
      method: "get",
      url: url,
    })
      .then((res) => {
        console.log(res.data);
        setResList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [authSeq]);

  function getAuthMenuList() {
    const url =
      baseUrl + "/auth-employee/auth/page/" + page + "?authSeq=" + authSeq;
    http: axios({
      method: "get",
      url: url,
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    resList &&
    resList.map((eList) => (
      <Nav.Item key={eList.employeeSeq}>
        <Nav.Link className="authEmployeeList" eventKey={eList.employeeSeq}>
          {eList.companyName}&gt;{eList.workplaceName}&gt;{eList.departmentName}
          {eList.title}
          {eList.employeeName}
          {eList.employeeId}
        </Nav.Link>
      </Nav.Item>
    ))
  );
};

export default AuthEmployeeList;
