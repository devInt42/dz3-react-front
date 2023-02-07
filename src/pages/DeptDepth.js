import axios from "axios";
import { gt } from "lodash";
import { useEffect, useCallback, useState } from "react";

const DeptDepth = (props) => {
  const baseUrl = "http://localhost:8080";
  const [companySeq, setCompanySeq] = useState(0);
  const [departmentSeq, setDepartmentSeq] = useState(0);
  const [departmentList, setDepartmentList] = useState(0);

  useEffect(() => {
    setCompanySeq(props.companySeq);
  }, [props]);
  useEffect(() => {
    setDepartmentSeq(props.departmentSeq);
  }, [companySeq]);
  useEffect(() => {
    init();
  }, [departmentSeq]);
  useEffect(() => {}, [departmentList]);
  const init = useCallback(async () => {
    if (companySeq != null && departmentSeq != null) {
      let sendData = {
        companySeq: companySeq,
        departmentSeq: departmentSeq,
      };
      try {
        let initRes = await axios.get(
          `${baseUrl}/department-employee/emp-dept`,
          {
            params: sendData,
            headers: {
              Authorization: window.sessionStorage.getItem("empInfo"),
            },
          }
        );
        setDepartmentList(initRes.data);
      } catch (error) {}
    }
  }, []);

  return (
    <div
      style={{ width: "9rem", margin: "0", padding: "0", textAlign: "left" }}
    >
      {departmentList &&
        departmentList.map((item) => (
          <span key={item.departmentSeq.toString()}>
            &gt;{item.departmentName}
          </span>
        ))}
    </div>
  );
};

export default DeptDepth;
