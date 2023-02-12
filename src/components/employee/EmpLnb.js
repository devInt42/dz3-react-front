import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Nav, Col, Row } from "react-bootstrap";
import "./css/EmpLnb.css";
function EmpLnb(props) {
  const baseUrl = "http://localhost:8080";
  const [employeeList, setEmployeeList] = useState([]);
  const [selectCompanySeq, setSelectCompanySeq] = useState(0);
  const [pointCompanySeq, setPointCompanySeq] = useState(0);
  const [inputEmployeeName, setInputEmployeeName] = useState("");
  const [searchRes, setSearchRes] = useState("");

  // 사원정보 불러오기
  useEffect(() => {
    callEmpList();
  }, []);

  // 검색결과 props로 받기
  useEffect(() => {
    setSearchRes(props.searchRes);
  }, [props]);

  // 전체리스트
  const callEmpList = async () => {
    let data = {
      companySeq: selectCompanySeq,
      employeeName: inputEmployeeName,
    };

    try {
      let empListCall = await axios.get(`${baseUrl}/company-employee/emplist`, {
        params: data,
        headers: {
          Authorization: window.sessionStorage.getItem("empInfo"),
        },
      });
      setEmployeeList(empListCall.data);
    } catch (error) {}
  };

  useEffect(() => {
    callSearchEmpList();
  }, [searchRes]);

  // 검색결과
  const callSearchEmpList = useCallback(async () => {
    let data = {
      companySeq: searchRes.selectCompany ? searchRes.selectCompany : 0,
      employeeName: searchRes.employeeName ? searchRes.employeeName : "",
      employeeClassification: searchRes.employeeStatus
        ? searchRes.employeeStatus
        : 0,
    };
    try {
      let empListCall = await axios.get(`${baseUrl}/company-employee/emplist`, {
        params: data,
        headers: {
          Authorization: window.sessionStorage.getItem("empInfo"),
        },
      });
      setEmployeeList(empListCall.data);
    } catch (error) {}
  }, [searchRes]);

  useEffect(() => {}, [employeeList]);
  return (
    <>
      <Row
        className="menuArea"
        style={{ diplay: "flex", alignContent: "flex-start" }}
      >
        <div
          style={{
            fontSize: "15px",
            textAlign: "center",
            marginTop: "8px",
            marginBottom: "8px",
          }}
        >
          사용자&nbsp;:&nbsp;
          <span
            style={{ color: "rgba(9, 132, 247, 0.63)", fontWeight: "bolder" }}
          >
            {employeeList.length}
          </span>
          명
        </div>
        <Nav
          className="authNav"
          variant="pills"
          style={navStyle}
          onClick={props.clickEmp}
        >
          {employeeList.map((emp, i) => (
            <Nav.Item
              key={i}
              style={navItemStyle}
              value={emp.employeeSeq}
              onClick={() => props.setEmpSeq(emp.employeeSeq)}
            >
              <Nav.Link className="authLnb" eventKey={i} style={navLinkStyle}>
                <Col style={{ display: "flex", justifyContent: "center" }}>
                  <img
                    src={process.env.PUBLIC_URL + "/empimg.png"}
                    style={{ width: "40px", height: "40px" }}
                  />
                </Col>
                <Col>
                  <span style={{ display: "flex", flexDirection: "column" }}>
                    <span
                      style={{
                        color: "#c3c3c3",
                        fontSize: "12px",
                        textAlign: "center",
                      }}
                    >
                      {emp.employeeId}
                    </span>
                    <span style={{ textAlign: "center", fontSize: "15px" }}>
                      {emp.employeeName}
                    </span>
                  </span>
                </Col>
                <Col>
                  <span style={{ color: "#c3c3c3", fontSize: "12px" }}>
                    {emp.employeeBirth}
                  </span>
                </Col>
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </Row>
    </>
  );
}

export default EmpLnb;

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
  flexDirection: "column",
  alignItems: "center",
};

const navItemStyle = {
  width: "100%",
  height: "60px",
};

const navLinkStyle = {
  width: "95%",
  height: "60px",
  margin: "0 auto",
  marginTop: "3px",
  padding: "0",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
};

const initStyle = {
  margin: "0",
  padding: "0",
};
