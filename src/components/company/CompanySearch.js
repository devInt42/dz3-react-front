import axios from "axios";
import { useState, useEffect } from "react";
import { ReactComponent as Search } from "../auth/search.svg";
import { Col, Form } from "react-bootstrap";
const CompanySearch = (props) => {
  const baseUrl = "http://localhost:8080";

  const [searchcompanyCode, setSearchCompanyCode] = useState(0);
  const [searchcompanyName, setSearchCompanyName] = useState("");
  const [searchuseYN, setSearchUseYN] = useState("");

  function FindCompany() {
    const companycode = searchcompanyCode;
    const companyname = searchcompanyName;
    const useyn = searchuseYN;
    axios
      .get(`${baseUrl}/company/find`, {
        params: {
          companycode: companycode,
          companyname: companyname,
          useyn: useyn,
        },
      })
      .then((res) => props.setSearchData(res.data));

    props.setSearchRefresh(props.searchRefresh + 1);
  }

  return (
    <div
      style={{ display: "flex", border: "2px solid #efefef", height: "50px" }}
    >
      <Col
        xs={3}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p
          style={{
            margin: "0",
            padding: "0",
            textAlign: "right",
            marginRight: "10px",
          }}
        >
          회사
        </p>
        <input
          type="text"
          placeholder="회사코드/회사명을 입력하세요."
          onChange={(e) => {
            isNaN(e.target.value) || e.target.value === ""
              ? setSearchCompanyName(e.target.value) || setSearchCompanyCode(0)
              : setSearchCompanyCode(e.target.value) ||
                setSearchCompanyName("");
          }}
          style={{
            margin: "5px",
            height: "40px",
            border: "1px solid #ced4da",
            borderRadius: "5px",
            textIndent: "0.5em",
          }}
        />
      </Col>
      <Col style={{ display: "flex", alignItems: "center" }}>
        <p
          style={{
            margin: "0",
            padding: "0",
            textAlign: "right",
            marginRight: "10px",
            alignItems: "center",
          }}
        >
          사용여부
        </p>

        <Form.Select
          onChange={(e) => setSearchUseYN(e.target.value)}
          style={{ width: "10%", textAlign: "center", marginRight: "10px" }}
        >
          <option value="">선택</option>
          <option value="Y">사용</option>
          <option value="N">미사용</option>
        </Form.Select>
        <Search
          onClick={() => {
            FindCompany();
          }}
          style={{ cursor: "pointer" }}
        />
      </Col>
    </div>
  );
};

export default CompanySearch;
