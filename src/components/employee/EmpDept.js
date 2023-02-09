import React, { useEffect, useState } from "react";
import axios from "axios";

import style from "./css/EmpDept.module.css";
import { Form } from "react-bootstrap";

function EmpDept(props) {
  const baseUrl = "http://localhost:8080";
  const [department, setDepartment] = useState({});
  const [employee, setEmployee] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [workplaceName, setWorkplaceName] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [mainCompanyYN, setMainCompanyYN] = useState("Y");
  const [mainDepartmentYN, setMainDepartmentYN] = useState("Y");
  const [companySeq, setCompanySeq] = useState(0);
  const [workplaceSeq, setWorkplaceSeq] = useState(0);
  const [departmentSeq, setDepartmentSeq] = useState(0);
  const [departmentCall, setDepartmentCall] = useState("");
  const [departmentFax, setDepartmentFax] = useState("");
  const [groupList, setGroupList] = useState([]);

  //사원의 조직정보
  useEffect(() => {
    axios
      .get(`${baseUrl}/department-employee/belong`, {
        params: {
          employeeSeq: props.employeeSeq,
        },
      })
      .then((res) => {
        console.log(res.data);
        setGroupList(res.data);
      })
      .catch((error) => console.log(error));
    console.log(groupList);
  }, [props.employeeSeq]);

  useEffect(() => {
    setCompanySeq(groupList.companySeq);
    setWorkplaceSeq(groupList.workplaceSeq);
    setDepartmentSeq(groupList.departmentSeq);
    setCompanyName(groupList.companyName);
    setWorkplaceName(groupList.workplaceName);
    setDepartmentName(groupList.departmentName);
    setMainCompanyYN(groupList.mainCompanyYN);
    setMainDepartmentYN(groupList.mainDepartmentYN);
    setDepartmentCall(groupList.departmentCall);
    setDepartmentFax(groupList.departmentFax);
  }, [groupList]);

  useEffect(() => {
    if (departmentSeq != undefined && departmentSeq != null) {
      axios
        .get(`${baseUrl}/department/list/${departmentSeq}`)
        .then((res) => setDepartment(res.data))
        .catch((error) => console.log(error));
    }
  }, [props.employeeSeq]);

  useEffect(() => {
    setDepartmentCall(department.departmentCall);
    setDepartmentFax(department.departmentFax);
    console.log("call" + departmentCall);
    console.log("fax" + departmentFax);
  }, [department]);
  return (
    <div>
      {groupList &&
        groupList.map((group, idx) => {
          return (
            <table className={style.dept_tbl} key = {idx}>
              <thead></thead>
              <tbody>
                <tr>
                  <th>회사</th>
                  <td>{group.companyName}</td>
                  <th>부서</th>
                  <td>
                    <div className="content-have-button">
                      <Form.Control
                        onChange={(e) => setDepartmentName(e.target.value)}
                        value={group.departmentName || ""}
                        placeholder="부서를 선택해 주십시오."
                        style={{
                          zIndex: "0",
                          backgroundColor: "rgba(241, 199, 199, 0.328)",
                        }}
                        readOnly
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>사번</th>
                  <td colSpan={3}>{group.employeeCode}</td>
                </tr>
                <tr>
                  <th>회사구분</th>
                  <td>
                    <input
                      type="radio"
                      name= "main-company-yn"
                      value="Y"
                      onChange={(e) => {
                        setMainCompanyYN(e.target.value);
                      }}
                      checked={mainCompanyYN === "Y" ? true : false}
                    />
                    <label>주회사</label>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input
                    
                      type="radio"
                      name="main-company-yn"
                      value="N"
                      onChange={(e) => {
                        setMainCompanyYN(e.target.value);
                      }}
                      checked={mainCompanyYN === "N" ? true : false}
                    />
                    <label>부회사</label>
                  </td>
                  <th>부서구분</th>
                  <td>
                    <input
                      type="radio"
                      name="main-department-yn"
                      value="Y"
                      onChange={(e) => {
                        setMainDepartmentYN(e.target.value);
                      }}
                      checked={mainDepartmentYN === "Y" ? true : false}
                    />
                    <label>주부서</label>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input
                      type="radio"
                      name="main-department-yn"
                      value="N"
                      onChange={(e) => {
                        setMainDepartmentYN(e.target.value);
                      }}
                      checked={mainDepartmentYN === "N" ? true : false}
                    />
                    <label>부부서</label>
                  </td>
                </tr>

                <tr>
                  <th>직급</th>
                  <td>사원</td>
                  <th>직책</th>
                  <td>개발</td>
                </tr>
                <tr>
                  <th>재직구분</th>
                  <td>ㅎㅇ</td>
                </tr>
                <tr>
                  <th>입사일</th>
                  <td></td>
                  <th>퇴사일</th>
                  <td></td>
                </tr>
                <tr>
                  <th>전화번호</th>
                  <td>
                    <input
                      type="text"
                      value={group.departmentCall || "-"}
                    />
                  </td>
                  <th>팩스번호</th>
                  <td>{group.departmentFax || "-"}</td>
                </tr>
                <tr>
                  <th>주소</th>
                  <td colSpan={3}>{group.departmentZipCode} | {group.departmentLoc}</td>
                </tr>
              </tbody>
            </table>
          );
        })}
    </div>
  );
}

export default EmpDept;
