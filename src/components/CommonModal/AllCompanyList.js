import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";

const AllCompanyList = (props) => {
  const baseUrl = "http://localhost:8080";
  const [companyList, setCompanyList] = useState([]);
  const [departmentSeq, setDepartmentSeq] = useState();
  const [workplaceSeq, setWorkplaceSeq] = useState();
  const [deptNameList, setDeptNameList] = useState([]);
  const [departmentNameList, setDepartmentNameList] = useState();
  const [companySeq, setCompanySeq] = useState();

  // Modal.js로 departmentSeq값 전송
  const getDeptSeq = () => {
    let result = JSON.stringify(departmentSeq);
    props.sendDepartmentSeq(result);
  };

  useEffect(() => {
    getDeptSeq();
  }, [departmentSeq]);

  //클릭하면 값 저장
  async function sendDepartmentSeq(a) {
    setDepartmentSeq(a);
  }

  // 로그인 - 선택된 회사 받아오기
  const getCompany = async () => {
    let companyData = {
      companySeq: companySeq,
    };
    try {
      const companyDataResult = await axios.get(
        `${baseUrl}/department-employee/companyElement`,
        {
          params: companyData,
          headers: {
            Authorization: window.sessionStorage.getItem("empInfo"),
          },
        }
      );
      setDeptNameList(companyDataResult.data);
    } catch (error) {
      console.log(error);
    }
  };

  //선택된 회사에 부서 받아오기
  const getDepartment = async () => {
    let departmentData = {
      companySeq: companySeq,
    };
    try {
      const departmentDataResult = await axios.get(
        `${baseUrl}/department-employee/departmentList`,
        {
          params: departmentData,
          headers: {
            Authorization: window.sessionStorage.getItem("empInfo"),
          },
        }
      );
      setDepartmentNameList(departmentDataResult.data);
    } catch (error) {
      console.log(error);
    }
  };

  //회사가 바뀔때마다 가져오는값 달라짐
  useEffect(() => {
    getCompany();
    getDepartment();
  }, []);

  return (
    <Container>
      <Row>{deptNameList[0]?.companyName}</Row>
      {departmentNameList &&
        departmentNameList.map((list) => (
          <Row
            className="CompanyLine"
            key={list.departmentSeq}
            onClick={() => {
              sendDepartmentSeq(list.departmentSeq);
            }}
          >
            <p style={{ textAlign: "left" }}> - {list.departmentName}</p>
          </Row>
        ))}
    </Container>
  );
};

export default AllCompanyList;
