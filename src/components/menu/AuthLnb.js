import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Nav, Container, Row, Col } from "react-bootstrap";
import axios from "axios";

const AuthLnb = () => {
  const [authList, setAuthList] = useState([]);
  const [page, setPage] = useState(1);
  const [companySeq, setCompanySeq] = useState(2);
  const baseUrl = "http://localhost:8080";
  const [res, setRes] = useState([]);
  useEffect(() => {
    axios({
      url:
        baseUrl +
        "/auth-employee/company/page/" +
        page +
        "?companySeq=" +
        companySeq,
      method: "get",
      dataType: "JSON",
      contentType: "applicaton/json; charset=utf-8",
    })
      .then((response) => {
        console.log(response.data);
        setRes(response.data);
      })
      .catch((error) => console.log(error));
  }, companySeq);

  return (
    <div
      className="AuthLnb"
      style={{
        float: "left",
        width: "10%",
        height: "100%",
      }}
    >
      <Nav variant="pills" defaultActiveKey="/home">
        {res} && {res}.map((index) => (
        <Nav.Item>
          <Nav.Link eventKey="link-0">Active</Nav.Link>
        </Nav.Item>
        ))
        <Nav.Item>
          <Nav.Link eventKey="link-0">Active</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1">Option 2</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2">Option 2</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default AuthLnb;
