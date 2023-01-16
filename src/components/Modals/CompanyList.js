import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const CompanyList = (props) => {
  const [companySeq, setCompanySeq] = useState(2);
  const baseUrl = "http://localhost:8080";
  const [deptNameList, setDeptNameList] = useState([]);
  const [departmentSeq, setDepartmentSeq] = useState();
  const [workplaceSeq, setWorkplaceSeq] = useState();

  // Modal.js로 departmentSeq값 전송
  useEffect(() => {
    async function getDeptSeq() {
      const result = await JSON.stringify(departmentSeq);
      // console.log("deptSeq : " + result);
      props.sendDepartmentSeq(result);
    }
    getDeptSeq();
    // props.sendDepartmentSeq(departmentSeq);
    // console.log("dept??" + departmentSeq);
  }, [departmentSeq]);

  // Modal.js로 workplaceSeq 전송
  useEffect(() => {
    async function getWorkSeq() {
      const result = await JSON.stringify(workplaceSeq);
      // console.log("workSeq: " + workplaceSeq);
      props.sendWorkplaceSeq(result);
    }
    getWorkSeq();
  }, [workplaceSeq]);

  //클릭하면 값 저장
  async function sendDepartmentSeq(a) {
    setDepartmentSeq(a);
  }
  // console.log(departmentSeq);
  async function sendWorkplaceSeq(a) {
    setWorkplaceSeq(a);
  }

  //부서 전체 값 받아오기
  const getAllCompany = useCallback(async () => {
    let companyData = {
      companySeq,
    };
    try {
      const getAllCompanyResult = await axios.get(
        `${baseUrl}/department/list/${companySeq}`,
        { params: companyData }
      );
      setDeptNameList(getAllCompanyResult.data);
      // console.log(getAllCompanyResult.data);
    } catch (error) {
      console.log(error);
    }
  }, [companySeq]);

  //workplaceSeq로 수정

  useEffect(() => {
    getAllCompany();
  }, [companySeq]);

  //workplaceSeq로 수정

  return (
    <div>
      {deptNameList &&
        deptNameList.map((dNameList) => (
          <div
            key={dNameList.departmentSeq}
            onClick={() => {
              sendDepartmentSeq(dNameList.departmentSeq);
              sendWorkplaceSeq(dNameList.workplaceSeq);
            }}>
            - {dNameList.departmentName}
          </div>
        ))}
    </div>
  );
};
export default CompanyList;
