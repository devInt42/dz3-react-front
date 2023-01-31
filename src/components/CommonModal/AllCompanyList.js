import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { TreeView, TreeItem } from "@mui/lab";
import { ReactComponent as Folder } from "../authGroup/folder.svg";
import { ReactComponent as FolderOpen } from "../authGroup/folderopen.svg";
import WorkplaceGroup from "./WorkplaceGroup";

const AllCompanyList = (props) => {
  const baseUrl = "http://localhost:8080";
  const [companyNameList, setCompanyNameList] = useState([]);

  // 로그인 - 선택된 회사 받아오기
  const getCompany = async () => {
    try {
      const companyDataResult = await axios.get(
        `${baseUrl}/department-employee/companyElement`,
        {
          headers: {
            Authorization: window.sessionStorage.getItem("empInfo"),
          },
        }
      );
      setCompanyNameList(companyDataResult.data);
    } catch (error) {
      console.log(error);
    }
  };

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
      multiSelect>
      {companyNameList &&
        companyNameList.map((companyItem) => (
          <div
            key={`C${companyItem.companySeq}`}
            style={{ display: "flex", alignItems: "flex-start" }}>
            <TreeItem
              key={`C${companyItem.companySeq}`}
              nodeId={companyItem.companySeq.toString()}
              label={companyItem.companyName}
              id={companyItem.companySeq.toString()}>
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
