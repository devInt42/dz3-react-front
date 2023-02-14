import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { TreeView, TreeItem } from "@mui/lab";
import { ReactComponent as Folder } from "../authGroup/folder.svg";
import { ReactComponent as FolderOpen } from "../authGroup/folderopen.svg";
import WorkplaceGroup from "./WorkplaceGroup";
import "../modals/SearchModal.css";

const CompanyList = (props) => {
  const baseUrl = "http://localhost:8080";
  const [companyNameList, setCompanyNameList] = useState([]);
  const [companyName, setCompanyName] = useState();
  const [companySeq, setCompanySeq] = useState();

  //회사 seq 받아오기
  const companySetting = useCallback(() => {
    setCompanySeq(props.companySeq);
  }, [props]);

  useEffect(() => {
    companySetting();
  }, [companySeq]);

  // 회사값 보내기
  const getCompany = useCallback(async () => {
    if (companySeq != null) {
      let send = {
        companySeq: companySeq,
      };
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
  }, [companySeq]);

  // Modal.js로 값 전송
  useEffect(() => {
    function getComSeq() {
      let result = companyName;
      props.sendCompanyName(result);
    }
    getComSeq();
  }, [companyName]);

  const sendPointList = (e) => {
    props.sendPointList(e);
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
                sendPointList={sendPointList}
              />
            </TreeItem>
          </div>
        ))}
    </TreeView>
  );
};
export default CompanyList;
