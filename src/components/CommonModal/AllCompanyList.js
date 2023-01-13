import axios from "axios";
import { useEffect, useState } from "react";

const AllCompanyList = (props) => {
  const [companySeq, setCompanySeq] = useState(2);
  const baseUrl = "http://localhost:8080";
  const [companyList, setCompanyList] = useState([]);
  const [departmentSeq, setDepartmentSeq] = useState(null);

  //회사 전체 값 받아오기 (일단 2번 회사에 부서로)

  // Modal.js로 departmentSeq값 전송
  useEffect(() => {
    props.sendDepartmentSeq(departmentSeq);
  }, [departmentSeq]);

  function sendDepartmentSeq(a) {
    setDepartmentSeq(a);
  }

  useEffect(() => {
    const url = baseUrl + "/department/list/" + companySeq;
    axios({
      method: "get",
      url: url,
    })
      .then((res) => {
        setCompanyList(res.data);
        // console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
