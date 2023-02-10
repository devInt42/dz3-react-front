import React, { useEffect, useState } from "react";
import axios from "axios";

import style from "./css/EmpDept.module.css";
import { Form } from "react-bootstrap";
import EmpPositionModal from "./EmpPositionModal";

function EmpDept(props) {
  const baseUrl = "http://localhost:8080";
  // const [department, setDepartment] = useState({});
  // const [employee, setEmployee] = useState([]);
  // const [companyName, setCompanyName] = useState("");
  // const [workplaceName, setWorkplaceName] = useState("");
  // const [departmentName, setDepartmentName] = useState("");
  // const [mainCompanyYN, setMainCompanyYN] = useState("Y");
  // const [mainDepartmentYN, setMainDepartmentYN] = useState("Y");
  // const [companySeq, setCompanySeq] = useState(0);
  // const [workplaceSeq, setWorkplaceSeq] = useState(0);
  // const [departmentSeq, setDepartmentSeq] = useState(0);
  // const [departmentCall, setDepartmentCall] = useState("");
  // const [departmentFax, setDepartmentFax] = useState("");
  const [groupList, setGroupList] = useState([]);
  const positionModal = "POSITION";
  const dutyModal = "DUTY";
  const [duty, setDuty] = useState("");
  const [position, setPosition] = useState("");
  const [dutyCode, setDutyCode] = useState("");
  const [positionCode, setPositionCode] = useState("");
  const [departmentSeq, setDepartmentSeq] = useState();
  //사원의 조직정보
  useEffect(() => {
    axios
      .get(`${baseUrl}/department-employee/belong`, {
        params: {
          employeeSeq: props.employeeSeq,
        },
      })
      .then((res) => {
        setGroupList(res.data);
      })
      .catch((error) => console.log(error));
  }, [props.employeeSeq]);

  useEffect(() => {
    console.log(groupList);
  }, [groupList])
  // useEffect(() => {
  //   setCompanySeq(groupList.companySeq);
  //   setWorkplaceSeq(groupList.workplaceSeq);
  //   setDepartmentSeq(groupList.departmentSeq);
  //   setCompanyName(groupList.companyName);
  //   setWorkplaceName(groupList.workplaceName);
  //   setDepartmentName(groupList.departmentName);
  //   setMainCompanyYN(groupList.mainCompanyYN);
  //   setMainDepartmentYN(groupList.mainDepartmentYN);
  //   setDepartmentCall(groupList.departmentCall);
  //   setDepartmentFax(groupList.departmentFax);
  // }, [groupList]);

  // useEffect(() => {
  //   if (departmentSeq != undefined && departmentSeq != null) {
  //     axios
  //       .get(`${baseUrl}/department/list/${departmentSeq}`)
  //       .then((res) => setDepartment(res.data))
  //       .catch((error) => console.log(error));
  //   }
  // }, [props.employeeSeq]);

  // useEffect(() => {
  //   setDepartmentCall(department.departmentCall);
  //   setDepartmentFax(department.departmentFax);
  //   console.log("call" + departmentCall);
  //   console.log("fax" + departmentFax);
  // }, [department]);


  const updateObject = (seq, obj)=> {
    let copyGroupList = [...groupList];
    const findIndex = groupList.findIndex(
      element => element.departmentSeq == seq
    )
    if (findIndex != -1) {
      copyGroupList[findIndex] = { ...copyGroupList[findIndex], ...obj}
    }
    setGroupList(copyGroupList);
  }
  return (
    <div>
      {groupList &&
        groupList.map((group, idx) => {
          return (
            <div>
              <table className={style.dept_tbl}>
                <thead></thead>
                <tbody>
                  <tr>
                    <th>회사</th>
                    <td>{group.companyName}</td>
                    <th>부서</th>
                    <td>
                      <div className="content-have-button">
                        <Form.Control
                          onChange={(e) => {
                            updateObject(group.departmentSeq, {departmentName: e.target.value});
                          }}
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
                    <td colSpan={3}><Form.Control
                      onChange={
                        (e) => {
                          updateObject(group.departmentSeq, {employeeCode:e.target.value})
                        }
                      }
                      defaultValue={group.employeeCode}
                      placeholder="사번을 입력해 주십시오."
                      style={{
                        zIndex: "0",
                        backgroundColor: "rgba(241, 199, 199, 0.328)",
                      }} />
                    </td>
                  </tr>
                  <tr>
                    <th>회사구분</th>
                    <td>
                      <input
                        type="radio"
                        name={`main-company-yn${group.departmentSeq}`}
                        value="Y"
                        onChange={() => {
                          updateObject(group.departmentSeq, {mainCompanyYN: "Y"})
                        }}
                        checked={group.mainCompanyYN === "Y" ? true : false}
                      />
                      <label>주회사</label>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <input
                        type="radio"
                        name={`main-company-yn${group.departmentSeq}`}
                        value="N"
                        onChange={() => {
                          updateObject(group.departmentSeq, {mainCompanyYN: "N"})
                        }}
                        checked={group.mainCompanyYN === "N" ? true : false}
                      />
                      <label>부회사</label>
                    </td>
                    <th>부서구분</th>
                    <td>
                      <input
                        type="radio"
                        name={`main-department-yn${group.departmentSeq}`}
                        value="Y"
                        onChange={() => {
                          updateObject(group.departmentSeq, {mainDepartmentYN: "Y"})
                        }}
                        checked={group.mainDepartmentYN === "Y" || group.departmentSeq ? true : false}
                      />
                      <label>주부서</label>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <input
                        type="radio"
                        name={`main-department-yn${group.departmentSeq}`}
                        value="N"
                        onChange={() => {
                          updateObject(group.departmentSeq, {mainDepartmentYN: "Y"})
                        }}
                        checked={group.mainDepartmentYN === "N" || group.departmentSeq ? true : false}
                      />
                      <label>부부서</label>
                    </td>
                  </tr>

                  <tr>
                    <th>직급</th>
                    <td>
                      <input type="text" value={`${group.positionCode}.${group.position}`}
                        onChange={() => {
                          updateObject(group.departmentSeq, {positionCode: positionCode, position: position})
                        }} />
                      <EmpPositionModal departmentSeq={group.departmentSeq} type={positionModal}
                        setPosition={setPosition} setPositionCode={setPositionCode} /></td>
                    <th>직책</th>
                    <td>
                      <input type="text" value={`${group.dutyCode}.${group.duty}`}
                        onChange={() => {
                          updateObject(group.departmentSeq, {positionCode: positionCode, position: position})
                        }} /><EmpPositionModal departmentSeq={group.departmentSeq} type={dutyModal}
                          setDuty={setDuty} setDutyCode={setDutyCode} />
                    </td>
                  </tr>
                  <tr>
                    <th>재직구분</th>
                    <td colSpan={3}>
                      <select></select>
                    </td>
                  </tr>
                  <tr>
                    <th>입사일</th>
                    <td>{groupList.employeeJoin}</td>
                    <th>퇴사일</th>
                    <td>{groupList.employeeLeave}</td>
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
              <br /><br />
            </div>
          );
        })}
    </div>
  );
}

export default EmpDept;
