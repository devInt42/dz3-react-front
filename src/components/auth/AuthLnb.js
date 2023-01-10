import React, { useEffect, useState } from "react";
import { Nav, Form, Button, Row, Pagination } from "react-bootstrap";
import axios from "axios";
import "../auth/Auth.css";

const AuthLnb = (props) => {
  const [authList, setAuthList] = useState();
  const [authSeq, setAuthSeq] = useState(null);
  const [companySeq, setCompanySeq] = useState(2);
  const [page, setPage] = useState(1);
  const baseUrl = "http://localhost:8080";
  const [countAuth, setCountAuth] = useState(null);
  const [active, setActive] = useState(1);
  let items = [];

  useEffect(() => {
    props.sendAuthSeq(authSeq);
  }, [authSeq]);

  for (
    let number = 1 + (page - 1) * 10;
    number <= 5 + (page - 1) * 10;
    number++
  ) {
    if (number <= Math.ceil(countAuth / 10))
      items.push(
        <Pagination.Item
          key={number}
          active={number === active}
          onClick={() => pageActive(number)}
        >
          {number}
        </Pagination.Item>
      );
  }

  function prevPage(e) {
    if (e <= 1) {
      alert("첫 페이지 입니다.");
    } else {
      setActive(active - 1);
    }
  }
  function nextPage(e) {
    if (e >= Math.ceil(countAuth / 10)) {
      alert("마지막 페이지 입니다.");
    } else {
      setActive(active + 1);
    }
  }
  function pageActive(e) {
    setActive(e);
    axios({
      url:
        baseUrl +
        "/auth-employee/company/page/" +
        e +
        "?companySeq=" +
        companySeq,
      method: "get",
    })
      .then((response) => {
        setAuthList(response.data);
      })
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    axios({
      url:
        baseUrl +
        "/auth-employee/company/page/" +
        active +
        "?companySeq=" +
        companySeq,
      method: "get",
    })
      .then((response) => {
        setAuthList(response.data);
      })
      .catch((error) => console.log(error));
  }, [active]);
  const paginationBasic = (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Pagination size="sm">
        <Pagination.Prev onClick={() => prevPage(active)} />
        {items}
        <Pagination.Next onClick={() => nextPage(active)} />
      </Pagination>
    </div>
  );
  function sendAuthSeq(val) {
    setAuthSeq(val);
  }

  useEffect(() => {
    axios({
      url:
        baseUrl +
        "/auth-employee/company/page/" +
        page +
        "?companySeq=" +
        companySeq,
      method: "get",
    })
      .then((response) => {
        setAuthList(response.data);
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    axios({
      url: baseUrl + "/auth-employee/count/" + companySeq,
      method: "get",
    }).then((res) => {
      setCountAuth(res.data);
    });
  }, []);
  return (
    <>
      {" "}
      <Row
        className="AuthLnb"
        style={{
          width: "100%",
          height: "700px",
          float: "left",
          border: "1px solid #efefef",
          backgroundColor: "#f9f9f9",
          justifyContent: "center",
        }}
      >
        <div style={{ backgroundColor: "#f0f0f0" }}>
          <input
            type="text"
            id="searchAuth"
            style={{ width: "80%" }}
            placeholder="권한명을 검색하세요."
          />
        </div>
        <div>
          <span>그룹 : </span>
          <span style={{ color: "#00AAFF" }}>{countAuth}</span>개
        </div>
        <Nav
          variant="pills"
          style={{
            border: "1px solid #efefef",
            backgroundColor: "#f9f9f9",
            margin: "0 auto",
            display: "flex",
            justifyContent: "center",
            height: "550px",
          }}
        >
          {authList &&
            authList.map((aList) => (
              <Nav.Item
                key={aList.authSeq}
                style={{
                  width: "90%",
                }}
                onClick={() => sendAuthSeq(aList.authSeq)}
              >
                <Nav.Link
                  className="authLnb"
                  eventKey={aList.authSeq}
                  style={{
                    width: "100%",
                    height: "50px",
                    margin: "0 auto",
                    marginTop: "3px",
                    padding: "0",
                  }}
                >
                  <p
                    style={{
                      margin: "5px",
                      textAlign: "left",
                      fontSize: "10px",
                      color: "#868e96",
                      fontWeight: "bold",
                    }}
                  >
                    {aList.companyName}
                  </p>
                  <p
                    style={{
                      margin: "5px",
                      textAlign: "left",
                      fontSize: "13px",
                      fontWeight: "bold",
                    }}
                  >
                    {aList.authName}
                  </p>
                </Nav.Link>
              </Nav.Item>
            ))}
        </Nav>
        {paginationBasic}
      </Row>
    </>
  );
};

export default AuthLnb;
