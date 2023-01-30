import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { TreeView, TreeItem } from "@mui/lab";
import { ReactComponent as Folder } from "../authGroup/folder.svg";
import { ReactComponent as FolderOpen } from "../authGroup/folderopen.svg";
import WorkplaceGroup from "./WorkplaceGroup";

const AllCompanyList = (props) => {
  const baseUrl = "http://localhost:8080";
  const [departmentSeq, setDepartmentSeq] = useState();
  const [companyNameList, setCompanyNameList] = useState([]);
  const [departmentNameList, setDepartmentNameList] = useState();
  const [companySeq, setCompanySeq] = useState();
  const [workplaceNameList, setWorkplaceNameList] = useState();
  const [workplaceSeq, setWorkplaceSeq] = useState();

  // Modal.js로 departmentSeq값 전송
  const getDeptSeq = () => {
    let result = JSON.stringify(departmentSeq);
    props.sendDepartmentSeq(result);
  };

  useEffect(() => {
    getDeptSeq();
  }, [departmentSeq]);

  //클릭하면 값 저장
  // async function sendDepartmentSeq(a) {
  //   setDepartmentSeq(a);
  // }

  // 로그인 - 선택된 회사 받아오기
  const getCompany = async () => {
    let companyData = {
      companySeq: companySeq,
    };
    try {
      const companyDataResult = await axios.get(
        `${baseUrl}/department-employee/companyElement`,
        {
          params: companyData,
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

  //선택된 회사에 부서 받아오기
  const getDepartment = async () => {
    let departmentData = {
      companySeq: companySeq,
    };
    try {
      const departmentDataResult = await axios.get(
        `${baseUrl}/department-employee/departmentList`,
        {
          params: departmentData,
          headers: {
            Authorization: window.sessionStorage.getItem("empInfo"),
          },
        }
      );
      setDepartmentNameList(departmentDataResult.data);
    } catch (error) {
      console.log(error);
    }
  };

  //회사가 바뀔때마다 가져오는값 달라짐
  useEffect(() => {
    getCompany();
  }, []);

  //클릭하면 값 저장
  async function sendWorkplaceSeq(a) {
    setWorkplaceSeq(a);
    // console.log(workplaceSeq);
  }

  // console.log(companyNameList);
  return (
    <Container>
      <TreeView
        className="menuTree"
        aria-label="file system navigator"
        defaultCollapseIcon={<FolderOpen />}
        defaultExpandIcon={<Folder />}
        sx={{ flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
        defaultExpanded={["1", "2", "3", "4", "5", "6"]}
        multiSelect>
        {companyNameList &&
          companyNameList.map((companyItem, idx) => (
            <div
              key={companyItem.companySeq}
              style={{ display: "flex", alignItems: "flex-start" }}>
              <TreeItem
                key={companyItem.companySeq}
                nodeId={companyItem.companySeq.toString()}
                label={companyItem.companyName}
                id={companyItem.companySeq.toString()}>
                <WorkplaceGroup companySeq={companyItem.companySeq} id={idx} />
              </TreeItem>
            </div>
          ))}
      </TreeView>
    </Container>
  );
};

export default AllCompanyList;
