import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { TreeView, TreeItem } from "@mui/lab";
import { ReactComponent as Folder } from "../authGroup/folder.svg";
import { ReactComponent as FolderOpen } from "../authGroup/folderopen.svg";
import DepartmentGroup from "./DepartmentGroup";
const WorkplaceGroup = (props) => {
  const baseUrl = "http://localhost:8080";
  const [companySeq, setCompanySeq] = useState(0);
  const [workplaceNameList, setWorkplaceNameList] = useState([]);

  useEffect(() => {
    setCompanySeq(props.companySeq);
  }, [props]);

  useEffect(() => {
    getWorkplace();
  }, [companySeq]);

  //선택된 회사에 사업장 받아오기

  const getWorkplace = useCallback(async () => {
    if (companySeq != null) {
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
    }
  }, [companySeq]);

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
        {workplaceNameList &&
          workplaceNameList.map((workplaceItem) => (
            <div
              key={`W${workplaceItem.workplaceSeq}`}
              style={{ display: "flex", alignItems: "flex-start" }}>
              <TreeItem
                key={`W${workplaceItem.workplaceSeq}`}
                nodeId={workplaceItem.workplaceSeq.toString()}
                label={workplaceItem.workplaceName}>
                <DepartmentGroup
                  companySeq={workplaceItem.companySeq}
                  workplaceSeq={workplaceItem.workplaceSeq}
                />
              </TreeItem>
            </div>
          ))}
      </TreeView>
    </div>
  );
};

export default WorkplaceGroup;
