import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";

const CompanyList = (props) => {
  const [companySeq, setCompanySeq] = useState();
  const baseUrl = "http://localhost:8080";
  const [deptNameList, setDeptNameList] = useState([]);
  const [departmentSeq, setDepartmentSeq] = useState();
  const [workplaceSeq, setWorkplaceSeq] = useState();
  const [workplaceNameList, setWorkplaceNameList] = useState();
  const [departmentNameList, setDepartmentNameList] = useState();
  const [companyName, setCompanyName] = useState();

  // Modal.js로 값 전송
  const getDeptSeq = () => {
    let result = JSON.stringify(departmentSeq);
    props.sendDepartmentSeq(result);
  };

  useEffect(() => {
    getDeptSeq();
  }, [departmentSeq]);

  const getWorkSeq = () => {
    let result = JSON.stringify(workplaceSeq);
    props.sendWorkplaceSeq(result);
  };

  useEffect(() => {
    getWorkSeq();
  }, [workplaceSeq]);

  useEffect(() => {
    function getComSeq() {
      let result = companyName;
      props.sendCompanyName(result);
    }
    getComSeq();
  }, [companyName]);

  //클릭하면 값 저장
  async function sendDepartmentSeq(a) {
    setDepartmentSeq(a);
  }

  async function sendWorkplaceSeq(a) {
    setWorkplaceSeq(a);
  }

  async function sendCompanyName(a) {
    setCompanyName(a);
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

  //선택된 회사에 사업장 받아오기
  const getWorkplace = async () => {
    let workplaceData = {
      companySeq: companySeq,
    };
    try {
      const workplaceDataResult = await axios.get(
        `${baseUrl}/department-employee/workplaceList`,
        {
          params: workplaceData,
          headers: {
            Authorization: window.sessionStorage.getItem("empInfo"),
          },
        }
      );
      setWorkplaceNameList(workplaceDataResult.data);
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

  useEffect(() => {
    getCompany();
    getWorkplace();
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
              sendWorkplaceSeq(list.workplaceSeq);
              sendCompanyName(list.companyName);
            }}>
            <div style={{ textAlign: "left" }}> - {list.departmentName}</div>
          </Row>
        ))}
    </Container>
  );
};
export default CompanyList;
