import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { TreeItem } from "@mui/lab";

const DepartmentName = (props) => {
  const baseUrl = "http://localhost:8080";
  const [companySeq, setCompanySeq] = useState(null);
  const [workplaceSeq, setWorkplaceSeq] = useState(null);
  const [departmentSeq, setDepartmentSeq] = useState(null);
  const [departmentParent, setDepartmentParent] = useState(null);
  const [departmentDepth, setDepartmentDepth] = useState(0);
  const [count, setCount] = useState(null);
  const [departmentNameList, setDepartmentNameList] = useState();

  //회사 값, 사업장 값 받아오기
  useEffect(() => {
    setCompanySeq(props.companySeq);
    setWorkplaceSeq(props.workplaceSeq);
    setDepartmentParent(props.parentSeq);
    setDepartmentDepth(props.depth + 1);
  }, [props]);

  // console.log(companySeq);
  // console.log(workplaceSeq);
  // console.log(departmentDepth);
  // console.log(departmentParent);

  useEffect(() => {
    countDepartment();
  }, [workplaceSeq]);

  useEffect(() => {
    //  getDepartment();
  }, [count]);

  useEffect(() => {}, [departmentDepth]);

  const countDepartment = useCallback(async () => {
    if (companySeq != null && workplaceSeq != null) {
      let departmentGroupData = {
        companySeq: companySeq,
        departmentParent: departmentParent,
        departmentDepth: departmentDepth,
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
        console.log(count);
      } catch (error) {
        console.log(error);
      }
    }
  }, [workplaceSeq]);

  // //선택된 회사에 부서 받아오기
  // const getDepartment = async () => {
  //   let departmentData = {
  //     companySeq: companySeq,
  //   };
  //   try {
  //     const departmentDataResult = await axios.get(
  //       `${baseUrl}/department-employee/departmentList`,
  //       {
  //         params: departmentData,
  //       }
  //     );
  //     setDepartmentNameList(departmentDataResult.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getDepartment();
  // }, [workplaceSeq]);

  return <></>;
};

export default DepartmentName;
