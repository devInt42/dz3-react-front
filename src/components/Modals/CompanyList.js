import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const CompanyList = (props) => {
  const [companySeq, setCompanySeq] = useState();
  const baseUrl = "http://localhost:8080";
  const [deptNameList, setDeptNameList] = useState([]);
  const [departmentSeq, setDepartmentSeq] = useState();
  const [workplaceSeq, setWorkplaceSeq] = useState();

  // Modal.js로 departmentSeq값 전송
  useEffect(() => {
    async function getDeptSeq() {
      const result = await JSON.stringify(departmentSeq);
      props.sendDepartmentSeq(result);
    }
    getDeptSeq();
  }, [departmentSeq]);

  // Modal.js로 workplaceSeq 전송
  useEffect(() => {
    async function getWorkSeq() {
      const result = await JSON.stringify(workplaceSeq);
      props.sendWorkplaceSeq(result);
    }
    getWorkSeq();
  }, [workplaceSeq]);

  //클릭하면 값 저장
  async function sendDepartmentSeq(a) {
    setDepartmentSeq(a);
  }

  async function sendWorkplaceSeq(a) {
    setWorkplaceSeq(a);
  }

  // 로그인 - 선택된 회사 받아오기
  const getCompany = async () => {
    let companyData = {
      companySeq: companySeq,
    };
    try {
      const companyDataResult = await axios.get(
        `${baseUrl}/department-employee/departmentList`,
        {
          params: companyData,
          headers: {
            Authorization: window.sessionStorage.getItem("empInfo"),
          },
        }
      );
      setDeptNameList(companyDataResult.data);
      console.log(companyDataResult.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCompany();
  }, []);

  return (
    <>
      {deptNameList[0]?.companyName}
      {/* >{deptNameList[0]?.workplaceName}> {deptNameList[0]?.departmentName} */}
    </>
  );
};
export default CompanyList;
