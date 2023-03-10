import { margin } from "@mui/system";
import axios from "axios";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
const DepartmentSearch = (props) => {
  const baseUrl = "http://localhost:8080";

  const [searchName, setSearchName] = useState(null);
  const [companyList, setCompanyList] = useState([]);
  const [company, setCompany] = useState();
  useEffect(() => {
    axios
      .get(`${baseUrl}/department/list/company`, {
        headers: { Authorization: window.sessionStorage.getItem("empInfo") },
      })
      .then((res) => {
        setCompany(res.data[0]);
        setCompanyList(res.data);
        props.setCompanySeq(res.data[0].companySeq);
      })
      .catch((error) => console.log(error));
  }, []);

  function FindDepartment() {
    const param = {
      searchName: searchName,
      searchCompanySeq: props.companySeq,
    };
    console.log(param);
    axios
      .get(`${baseUrl}/department/find`, {
        params: param,
      })
      .then((res) => props.setSearchData(res.data));
    props.setSearch(true);
  }

  return (
    companyList && (
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div style={{ marginLeft: "10px" }}>회사</div>
        <div style={{ marginLeft: "10px" }}>
          <select
            onChange={(e) => {
              props.setCompanySeq(e.target.value);
            }}
          >
            <option disabled>-회사 선택-</option>
            {companyList.length > 0
              ? companyList.map((company, idx) => {
                  return (
                    <option key={idx} value={company.companySeq}>
                      {company.companyName}
                    </option>
                  );
                })
              : company && (
                  <option value={company.companySeq}>
                    {company.companyName}
                  </option>
                )}
          </select>
        </div>
        <div style={{ marginLeft: "10px" }}>
          <input
            type="text"
            placeholder="코드/사업장/부서명을 입력하세요."
            onChange={(e) => {
              setSearchName(e.target.value);
            }}
          />
        </div>{" "}
        <div style={{ marginLeft: "10px" }}>
          <Button
            variant="outline-secondary"
            onClick={() => {
              FindDepartment();
            }}
          >
            찾기
          </Button>
        </div>
      </div>
    )
  );
};

export default DepartmentSearch;
