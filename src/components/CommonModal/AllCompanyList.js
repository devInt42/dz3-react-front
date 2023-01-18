import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const AllCompanyList = (props) => {
  const [companySeq, setCompanySeq] = useState(2);
  const baseUrl = "http://localhost:8080";
  const [companyList, setCompanyList] = useState([]);
  const [departmentSeq, setDepartmentSeq] = useState(null);

  // Modal.js로 departmentSeq값 전송
  useEffect(() => {
    async function getDeptSeq() {
      const result = await JSON.stringify(departmentSeq);
      props.sendDepartmentSeq(result);
    }
    getDeptSeq();
  }, [departmentSeq]);

  //클릭하면 값 저장
  async function sendDepartmentSeq(a) {
    setDepartmentSeq(a);
  }

  //회사 전체 값 받아오기 (일단 2번 회사에 부서로)
  const getAllCompany = useCallback(async () => {
    let companyData = {
      companySeq,
    };
    try {
      const getAllCompanyResult = await axios.get(
        `${baseUrl}/department/list/${companySeq}`,
        { params: companyData }
      );
      setCompanyList(getAllCompanyResult.data);
    } catch (error) {
      console.log(error);
    }
  }, [companySeq]);

  //회사가 바뀔때마다 가져오는값 달라짐
  useEffect(() => {
    getAllCompany();
  }, [companySeq]);

  return (
    <div>
      {companyList &&
        companyList.map((companyList) => (
          <div
            key={companyList.departmentSeq}
            onClick={() => {
              sendDepartmentSeq(companyList.departmentSeq);
            }}>
            - {companyList.departmentName}
          </div>
        ))}
    </div>
  );
};

export default AllCompanyList;
