import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { TreeView, TreeItem } from "@mui/lab";
import { ReactComponent as Folder } from "../authGroup/folder.svg";
import { ReactComponent as FolderOpen } from "../authGroup/folderopen.svg";
import WorkplaceGroup from "./WorkplaceGroup";

const AllCompanyList = (props) => {
  const baseUrl = "http://localhost:8080";
  const [companyNameList, setCompanyNameList] = useState([]);
  const [companySeq, setCompanySeq] = useState(null);
  // props변경시
  useEffect(() => {
    initSetting();
  }, [props]);

  // 선택한 회사값 받기
  const initSetting = useCallback(() => {
    setCompanySeq(props.pointCompanySeq);
  }, [props]);
  useEffect(() => {
    getCompany();
  }, [companySeq]);

  // 로그인 - 선택된 회사 받아오기
  const getCompany = useCallback(async () => {
    let send = {
      companySeq: companySeq,
    };
    if (companySeq != null) {
      try {
        const companyDataResult = await axios.get(
          `${baseUrl}/department-employee/companyElement`,
          {
            params: send,
            headers: {
              Authorization: window.sessionStorage.getItem("empInfo"),
            },
          }
        );
        setCompanyNameList(companyDataResult.data);
      } catch (error) {
        console.log(error);
      }
    }
  }, [companySeq]);

  //회사가 바뀔때마다 가져오는값 달라짐
  useEffect(() => {
    getCompany();
  }, []);

  const sendDepartmentSeq = (e) => {
    props.sendDepartmentSeq(e);
  };
  return (
    <TreeView
      className="companyTree"
      aria-label="file system navigator"
      defaultCollapseIcon={<FolderOpen />}
      defaultExpandIcon={<Folder />}
      sx={{ flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
      multiSelect
    >
      {companyNameList &&
        companyNameList.map((companyItem) => (
          <div
            key={`C${companyItem.companySeq}`}
            style={{ display: "flex", alignItems: "flex-start" }}
          >
            <TreeItem
              key={`C${companyItem.companySeq}`}
              nodeId={companyItem.companySeq.toString()}
              label={companyItem.companyName}
              id={companyItem.companySeq.toString()}
            >
              <WorkplaceGroup
                companySeq={companyItem.companySeq}
                sendDepartmentSeq={sendDepartmentSeq}
              />
            </TreeItem>
          </div>
        ))}
    </TreeView>
  );
};

export default AllCompanyList;
