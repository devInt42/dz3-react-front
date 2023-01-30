import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { TreeItem } from "@mui/lab";
import DepartmentGroup from "./DepartmentGroup";
const WorkplaceGroup = (props) => {
  const baseUrl = "http://localhost:8080";
  const [companySeq, setCompanySeq] = useState(null);
  const [workplaceNameList, setWorkplaceNameList] = useState([]);

  useEffect(() => {
    setCompanySeq(props.companySeq);
  }, [props]);

  useEffect(() => {
    getWorkplace();
  }, [companySeq]);

  //선택된 회사에 사업장 받아오기

  const getWorkplace = useCallback(async () => {
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
      //   console.log(workplaceDataResult.data);
    } catch (error) {
      console.log(error);
    }
  }, [companySeq]);

  return (
    <>
      {workplaceNameList &&
        workplaceNameList.map((workplaceItem) => (
          <div
            key={workplaceItem.workplaceSeq}
            style={{ display: "flex", alignItems: "flex-start" }}>
            <TreeItem
              key={workplaceItem.workplaceSeq}
              nodeId={workplaceItem.workplaceSeq.toString()}
              label={workplaceItem.workplaceName}>
              <DepartmentGroup
                companySeq={companySeq}
                workplaceSeq={workplaceItem.workplaceSeq}
                // depth/parentSeq
              />
            </TreeItem>
          </div>
        ))}
    </>
  );
};

export default WorkplaceGroup;
