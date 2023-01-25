import React, { useEffect, useState, useCallback } from "react";
import { Nav, Form, Row, Pagination, Col } from "react-bootstrap";
import axios from "axios";
import "../auth/Auth.css";
import { ReactComponent as Search } from "../auth/search.svg";
import AddGroup from "./AddGroup";
const AuthGroupLnb = (props) => {
  const [authList, setAuthList] = useState(null);
  const [authSeq, setAuthSeq] = useState(null);
  const [selectCompanySeq, setSelectCompanySeq] = useState(null);
  const [pointCompanySeq, setPointCompanySeq] = useState(null);
  const [page, setPage] = useState(1);
  const baseUrl = "http://localhost:8080";
  const [countAuth, setCountAuth] = useState(null);
  const [active, setActive] = useState(1);
  const [authName, setAuthName] = useState(null);
  const [companyList, setCompanyList] = useState(null);

  let items = [];

  const [formFlag, setFormFlag] = useState(true);

  // 회사별 권한 및 해당하는 권한수 카운트 API
  const companyAuthApiCall = useCallback(async () => {
    let companyData = {
      authName,
      companySeq: selectCompanySeq,
    };

    try {
      const companyAuthApiResult = await axios.get(
        `${baseUrl}/auth-employee/company/page/${page}`,
        {
          params: companyData,
          headers: {
            Authorization: window.sessionStorage.getItem("empInfo"),
          },
        }
      );
      const companyAuthApiCountResult = await axios.get(
        `${baseUrl}/auth-employee/count`,
        {
          params: companyData,
          headers: {
            Authorization: window.sessionStorage.getItem("empInfo"),
          },
        }
      );
      setAuthList(companyAuthApiResult.data);
      setCountAuth(companyAuthApiCountResult.data);
    } catch (error) {
      console.log(error);
    }
  }, [active, selectCompanySeq]);

  useEffect(() => {
    setActive(1);
    companyAuthApiCall();
  }, [selectCompanySeq]);

  // 검색 API
  const searchAuthbyName = async (e) => {
    let sendApi = {
      authName,
      companySeq: selectCompanySeq,
    };
    setPage(1);
    try {
      const searchAuthApiResult = await axios.get(
        `${baseUrl}/auth-employee/company/page/${page} `,
        {
          params: sendApi,
          headers: {
            Authorization: window.sessionStorage.getItem("empInfo"),
          },
        }
      );
      const companyAuthApiCountResult = await axios.get(
        `${baseUrl}/auth-employee/count/`,
        {
          params: sendApi,
          headers: {
            Authorization: window.sessionStorage.getItem("empInfo"),
          },
        }
      );
      setAuthList(searchAuthApiResult.data);
      setCountAuth(companyAuthApiCountResult.data);
    } catch (error) {
      console.log(error);
    }
  };

  function pageActive(e) {
    setActive(e);
  }
  const changeSearchAuth = (e) => {
    setAuthName(e.target.value);
  };

  useEffect(() => {
    props.sendAuthSeq(authSeq);
  }, [authSeq]);
  useEffect(() => {
    props.sendSelectCompanySeq(selectCompanySeq);
  }, [selectCompanySeq]);
  useEffect(() => {
    props.sendPointCompanySeq(pointCompanySeq);
  }, [pointCompanySeq]);
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

  // 페이지 클릭했을때 해당 페이지 불러오기
  const activePage = async () => {
    let sendApi = {
      companySeq: selectCompanySeq,
      authName: authName,
    };
    try {
      const searchAuthApiActive = await axios.get(
        `${baseUrl}/auth-employee/company/page/${active}`,
        {
          params: sendApi,
          headers: {
            Authorization: window.sessionStorage.getItem("empInfo"),
          },
        }
      );
      setAuthList(searchAuthApiActive.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    activePage();
  }, [active]);
  const paginationBasic = (
    <div style={{ display: "flex", justifyContent: "center", margin: "0" }}>
      <Pagination className="authPagi" size="sm">
        <Pagination.Prev onClick={() => prevPage(active)} />
        {items}
        <Pagination.Next onClick={() => nextPage(active)} />
      </Pagination>
    </div>
  );
  function sendValue(authVal, comVal) {
    sendAuthSeq(authVal);
    sendPointCompanySeq(comVal);
  }
  function sendAuthSeq(val) {
    setAuthSeq(val);
  }
  function sendSelectCompanySeq(comVal) {
    setSelectCompanySeq(comVal);
  }
  function sendPointCompanySeq(pointComVal) {
    setPointCompanySeq(pointComVal);
  }
  const selectCompanyArea = async () => {
    try {
      const resCompany = await axios.get(`${baseUrl}/company-employee/select`, {
        headers: {
          Authorization: window.sessionStorage.getItem("empInfo"),
        },
      });
      setCompanyList(resCompany.data);
      if (resCompany.data[0].employeeSeq == 0);
      setFormFlag(false);
    } catch (error) {
      console.log(error);
    }
  };
  const changeSelectVal = (e) => {
    if (e.target.value == 0) {
      setSelectCompanySeq(null);
    } else {
      setSelectCompanySeq(e.target.value);
    }
  };
  useEffect(() => {
    selectCompanyArea();
  }, []);

  return (
    <>
      <Row className="AuthLnb" style={authLnbStyle}>
        <div
          style={{
            backgroundColor: "#f0f0f0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Row>
            <Form.Select
              size="sm"
              onChange={changeSelectVal}
              style={{ width: "200px" }}
              disabled={formFlag}
            >
              <option
                key="0"
                value="0"
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                전체보기
              </option>
              {companyList &&
                companyList.map((companyMap, i) => (
                  <option key={i} value={companyMap.companySeq}>
                    {companyMap.companyName}
                  </option>
                ))}
            </Form.Select>
          </Row>
          <Row style={{ float: "left", padding: "0" }}>
            <Col xs={10} style={{ padding: "0" }}>
              <input
                type="text"
                id="searchAuth"
                style={{ width: "100%", margin: "0", padding: "0" }}
                placeholder="권한명을 검색하세요."
                onChange={changeSearchAuth}
              />
            </Col>
            <Col
              xs={1}
              style={{
                width: "20px",
                padding: "0",
                margin: "0",
                display: "flex",
                alignItems: "center",
              }}
            >
              <button
                style={{
                  marginLeft: "5px",
                  display: "flex",
                  margin: "0",
                  border: "none",
                }}
                onClick={() => searchAuthbyName()}
              >
                <Search />
              </button>
            </Col>
          </Row>
        </div>
        <div>
          <span>그룹 : </span>
          <span style={{ color: "#00AAFF" }}>{countAuth}</span>개
        </div>
        <Nav className="authNav" variant="pills" style={navStyle}>
          {authList &&
            authList.map((aList, i) => (
              <Nav.Item
                key={i}
                style={navItemStyle}
                onClick={() => sendValue(aList.authSeq, aList.companySeq)}
              >
                <Nav.Link
                  className="authLnb"
                  eventKey={aList.authSeq}
                  style={navLinkStyle}
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
                    {aList.authCode}
                    <span>&nbsp;-&nbsp;</span>
                    {aList.authName}
                  </p>
                </Nav.Link>
              </Nav.Item>
            ))}
        </Nav>
        <Row className="addAuthGroup" style={addBoxStyle}>
          <AddGroup />
        </Row>
        <Row
          style={{ backgroundColor: "#f9f9f9", border: "1px solid #efefef" }}
        >
          {paginationBasic}
        </Row>
      </Row>
    </>
  );
};

export default AuthGroupLnb;
const authLnbStyle = {
  width: "100%",
  height: "700px",
  float: "left",
  border: "1px solid #efefef",
  backgroundColor: "#f9f9f9",
  justifyContent: "center",
};
const navStyle = {
  border: "1px solid #efefef",
  backgroundColor: "#f9f9f9",
  margin: "0 auto",
  display: "flex",
  justifyContent: "flex-start",
  height: "550px",
  flexDirection: "column",
  alignItems: "center",
};

const navItemStyle = {
  width: "90%",
  height: "50px",
};

const navLinkStyle = {
  width: "100%",
  height: "50px",
  margin: "0 auto",
  marginTop: "3px",
  padding: "0",
};

const addBoxStyle = {
  width: "100%",
  display: "flex",
  height: "10%",
  border: "1px solid #efefef",
  flexWrap: "nowrap",
  justifyContent: "center",
  alignItems: "center",
  alignContent: "center",
  flexDirection: "row",
  backgroundColor: "#fff",
  cursor: "pointer",
};
