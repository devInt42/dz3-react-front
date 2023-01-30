import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { TreeItem } from "@mui/lab";
import DepartmentName from "./DepartmentName";

const DepartmentGroup = (props) => {
  const baseUrl = "http://localhost:8080";
  const [depth, setDepth] = useState(0);
  const [parentSeq, setParentSeq] = useState(0);
  const [companySeq, setCompanySeq] = useState(null);
  const [workplaceSeq, setWorkplaceSeq] = useState(null);
  const [departmentGroupList, setDepartmentGroupList] = useState();
  const [count, setCount] = useState(null);

  //회사 값, 사업장 값 받아오기
  useEffect(() => {
    setCompanySeq(props.companySeq);
    setWorkplaceSeq(props.workplaceSeq);
  }, [props]);

  useEffect(() => {
    countDepartment();
  }, [workplaceSeq]);

  useEffect(() => {
    getDepartmentGroup();
  }, [count]);

  const countDepartment = useCallback(async () => {
    if (companySeq != null && workplaceSeq != null) {
      let departmentGroupData = {
        companySeq: companySeq,
        departmentParent: parentSeq,
        departmentDepth: depth,
        workplaceSeq: workplaceSeq,
      };
      try {
        const departmentGroupResult = await axios.get(
          `${baseUrl}/department-employee/count`,
          {
            params: departmentGroupData,
          }
        );
        setCount(departmentGroupResult.data);
        // console.log(departmentGroupResult.data);
      } catch (error) {
        console.log(error);
      }
    }
  }, [workplaceSeq]);

  // 선택된 회사에 부서 Group값 받아오기
  const getDepartmentGroup = async () => {
    if (count > 0) {
      let departmentGroupData = {
        companySeq: companySeq,
        departmentParent: parentSeq,
        departmentDepth: depth,
        workplaceSeq: workplaceSeq,
      };
      try {
        const departmentGroupResult = await axios.get(
          `${baseUrl}/department-employee/departmentGroup`,
          {
            params: departmentGroupData,
          }
        );
        setDepartmentGroupList(departmentGroupResult.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      {departmentGroupList &&
        departmentGroupList.map((departmentGroupItem) => (
          <div
            key={departmentGroupItem.deparmentSeq}
            style={{ display: "flex", alignItems: "flex-start" }}>
            <TreeItem
              key={departmentGroupItem.departmentSeq}
              nodeId={departmentGroupItem.departmentSeq.toString()}
              label={departmentGroupItem.departmentName}>
              <DepartmentName
                companySeq={companySeq}
                workplaceSeq={workplaceSeq}
                departmentSeq={departmentGroupItem.departmentSeq}
                parentSeq={parentSeq}
                depth={depth}
              />
            </TreeItem>
          </div>
        ))}
    </>
  );
};
export default DepartmentGroup;
