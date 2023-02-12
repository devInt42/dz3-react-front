import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Row, Col } from "react-bootstrap";
import { ReactComponent as Search } from "../auth/search.svg";

export default function SearchAppBar(props) {
  const baseUrl = "http://localhost:8080";
  const [companyList, setCompanyList] = useState([]);
  const [employeeName, setEmployeeName] = useState("");
  const [employeeStatus, setEmployeeStatus] = useState("");
  const [selectCompany, setSelectCompany] = useState("");
  useEffect(() => {
    selectCompanyArea();
  }, []);

  // 회사명 받아오기
  const selectCompanyArea = async () => {
    try {
      const resCompany = await axios.get(`${baseUrl}/company-employee/select`, {
        headers: {
          Authorization: window.sessionStorage.getItem("empInfo"),
        },
      });
      setCompanyList(resCompany.data);
    } catch (error) {
      console.log(error);
    }
  };
  //이름/id/mail id
  const searchChange = (e) => {
    setEmployeeName(e.target.value);
  };

  //회사
  const companyChange = (e) => {
    setSelectCompany(e.target.value);
  };

  //재직상태
  const employmentStatus = (e) => {
    setEmployeeStatus(e.target.value);
  };

  //검색 결과 보내기
  const sendSearch = () => {
    let search = {
      employeeName: employeeName,
      selectCompany: selectCompany,
      employeeStatus: employeeStatus,
    };
    props.sendSearchResult(search);
  };

  useEffect(() => {}, [employeeName]);
  useEffect(() => {}, [selectCompany]);
  useEffect(() => {}, [employeeStatus]);

  return (
    <div>
      <Row
        style={{
          height: "50px",
          display: "flex",
          flexDirection: "row",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Col xs={3} style={{ display: "flex" }}>
          <Col xs={2} style={{ textAlign: "center" }}>
            회사
          </Col>
          <Col xs={10}>
            <Form.Select
              size="sm"
              onChange={companyChange}
              style={{ width: "100%" }}
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
          </Col>
        </Col>

        <Col xs={3} style={{ display: "flex" }}>
          <Col xs={3} style={{ textAlign: "center" }}>
            재직구분
          </Col>
          <Col xs={9}>
            <Form.Select
              size="sm"
              onChange={employmentStatus}
              style={{ width: "100%" }}
            >
              <option
                key="0"
                value="0"
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                재직구분
              </option>
              <option key="1" value="J01">
                J01.재직
              </option>
              <option key="5" value="J05">
                J05.퇴직
              </option>
            </Form.Select>
          </Col>
        </Col>

        <Col xs={2}>
          <input
            type="text"
            id="searchAuth"
            style={{
              width: "100%",
              height: "31px",
              margin: "0",
              padding: "0",
              border: "1px solid #ced4da",
              borderRadius: "0.25rem",
              textIndent: "0.1rem",
            }}
            placeholder="이름/ID/Mail ID."
            onChange={searchChange}
          />
        </Col>

        <Col xs={1}>
          <Search
            onClick={() => sendSearch()}
            style={{ cursor: "pointer", width: "20%" }}
          />
        </Col>
      </Row>
    </div>
  );
}
