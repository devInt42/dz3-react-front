import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";

const CompanyList = (props) => {
  const [companySeq, setCompanySeq] = useState(2);
  const baseUrl = "http://localhost:8080";
  const [deptNameList, setDeptNameList] = useState([]);
  const [departmentSeq, setDepartmentSeq] = useState(null);

  // Modal.js로 departmentSeq값 전송
  useEffect(() => {
    props.sendDepartmentSeq(departmentSeq);
  }, [departmentSeq]);

  function sendDepartmentSeq(a) {
    setDepartmentSeq(a);
  }

  //부서 전체 값 받아오기
  useEffect(() => {
    const url = baseUrl + "/department/list/" + companySeq;
    axios({
      method: "get",
      url: url,
    }).then((res) => {
      setDeptNameList(res.data);
    });
  }, []);

  return (
    <div>
      {deptNameList &&
        deptNameList.map((dNameList) => (
          <div
            key={dNameList.departmentSeq}
            onClick={() => sendDepartmentSeq(dNameList.departmentSeq)}>
            - {dNameList.departmentName} {dNameList.departmentSeq}
          </div>
        ))}
    </div>
  );
};
export default CompanyList;
