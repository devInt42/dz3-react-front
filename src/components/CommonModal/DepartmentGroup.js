import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { TreeView, TreeItem } from "@mui/lab";
import { ReactComponent as Folder } from "../authGroup/folder.svg";
import { ReactComponent as FolderOpen } from "../authGroup/folderopen.svg";
import DepartmentName from "./DepartmentName";

const DepartmentGroup = (props) => {
  const baseUrl = "http://localhost:8080";
  const [companySeq, setCompanySeq] = useState(0);
  const [workplaceSeq, setWorkplaceSeq] = useState(0);
  const [departmentGroupList, setDepartmentGroupList] = useState([]);
  const [count, setCount] = useState(0);

  //회사 값, 사업장 값 받아오기
  useEffect(() => {
    setCompanySeq(props.companySeq);
    setWorkplaceSeq(props.workplaceSeq);
  }, [props]);

  useEffect(() => {
    countDepartment();
  }, [companySeq, workplaceSeq]);

  useEffect(() => {
    getDepartmentGroup();
  }, [count]);

  const countDepartment = useCallback(async () => {
    if (companySeq != null && workplaceSeq != null) {
      let departmentGroupData = {
        companySeq: companySeq,
        departmentParent: 0,
        departmentDepth: 0,
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
      } catch (error) {
        console.log(error);
      }
    }
  }, [companySeq, workplaceSeq]);

  // 선택된 회사에 부서 Group값 받아오기
  const getDepartmentGroup = useCallback(async () => {
    if (count > 0) {
      let departmentGroupData = {
        companySeq: companySeq,
        departmentParent: 0,
        departmentDepth: 0,
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
  }, [count]);

  return (
    <div style={{ border: "1px solid #f3f3f3" }}>
      <TreeView
        className="menuTree"
        aria-label="file system navigator"
        defaultCollapseIcon={<FolderOpen />}
        defaultExpandIcon={<Folder />}
        sx={{ flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
        defaultExpanded={["1", "2", "3", "4", "5", "6"]}
        multiSelect>
        {departmentGroupList &&
          departmentGroupList.map((item) => (
            <div
              key={`D${item.departmentSeq}`}
              style={{ display: "flex", alignItems: "flex-start" }}>
              <TreeItem
                key={`D${item.departmentSeq}`}
                nodeId={item.departmentSeq.toString()}
                label={item.departmentName}>
                <DepartmentName
                  companySeq={item.companySeq}
                  workplaceSeq={item.workplaceSeq}
                  parentSeq={item.departmentSeq}
                  depth={item.departmentDepth}
                />
              </TreeItem>
            </div>
          ))}
      </TreeView>
    </div>
  );
};
export default DepartmentGroup;
