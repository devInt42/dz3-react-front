import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { TreeItem } from "@mui/lab";

const DepartmentName = (props) => {
  const baseUrl = "http://localhost:8080";
  const [companySeq, setCompanySeq] = useState(0);
  const [workplaceSeq, setWorkplaceSeq] = useState(0);
  const [departmentParent, setDepartmentParent] = useState(0);
  const [departmentDepth, setDepartmentDepth] = useState(0);
  const [count, setCount] = useState(0);
  const [departmentNameList, setDepartmentNameList] = useState([]);

  //회사 값, 사업장 값 받아오기
  useEffect(() => {
    setCompanySeq(props.companySeq);
    setWorkplaceSeq(props.workplaceSeq);
    setDepartmentParent(props.parentSeq);
    setDepartmentDepth(props.depth + 1);
  }, [props]);

  useEffect(() => {}, [departmentDepth]);

  useEffect(() => {
    countDepartment();
  }, [departmentDepth, departmentParent]);

  useEffect(() => {
    getDepartment();
  }, [count]);

  // useEffect(() => {}, [departmentDepth]);

  const countDepartment = useCallback(async () => {
    if (
      companySeq != null &&
      workplaceSeq != null &&
      departmentParent != null &&
      departmentDepth != null
    ) {
      let departmentNameData = {
        companySeq: companySeq,
        departmentParent: departmentParent,
        departmentDepth: departmentDepth,
        workplaceSeq: workplaceSeq,
      };
      try {
        const departmentNameResult = await axios.get(
          `${baseUrl}/department-employee/count`,
          {
            params: departmentNameData,
          }
        );
        setCount(departmentNameResult.data);
      } catch (error) {
        console.log(error);
      }
    }
  }, [departmentDepth, departmentParent]);

  // //선택된 회사에 부서 받아오기
  const getDepartment = useCallback(async () => {
    if (count > 0) {
      let departmentData = {
        companySeq: companySeq,
        departmentParent: departmentParent,
        departmentDepth: departmentDepth,
        workplaceSeq: workplaceSeq,
      };
      try {
        const departmentDataResult = await axios.get(
          `${baseUrl}/department-employee/departmentGroup`,
          {
            params: departmentData,
          }
        );
        setDepartmentNameList(departmentDataResult.data);
        // console.log(JSON.stringify(departmentDataResult.data));
      } catch (error) {
        console.log(error);
      }
    }
  }, [count]);
  useEffect(() => {
    getDepartment();
    // eslint-disable-next-line
  }, [count]);
  // console.log(departmentNameList);
  return (
    <>
      {departmentNameList &&
        departmentNameList.map((departmentNameItem) => (
          <div
            key={`D${departmentNameItem.departmentSeq}`}
            style={{ display: "flex", alignItems: "flex-start" }}>
            <TreeItem
              key={`D${departmentNameItem.departmentSeq}`}
              nodeId={departmentNameItem.departmentSeq.toString()}
              label={departmentNameItem.departmentName}>
              <DepartmentName
                companySeq={departmentNameItem.companySeq}
                workplaceSeq={departmentNameItem.workplaceSeq}
                parentSeq={departmentNameItem.departmentSeq}
                depth={departmentNameItem.departmentDepth}
              />
            </TreeItem>
          </div>
        ))}
    </>
  );
};

export default DepartmentName;
