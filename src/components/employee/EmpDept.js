import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "./css/EmpDept.module.css";
import { Form } from "react-bootstrap";
import EmpPositionModal from "./EmpPositionModal";
import SaveFailAlert from "./alert/SaveFailAlert";
import ManageModal from "../departmentModal/ManageModal";
function EmpDept(props) {
  const baseUrl = "http://localhost:8080";
  const positionModal = "POSITION";
  const dutyModal = "DUTY";
  const [dupliCheck, setDupliCheck] = useState(0);
  const [notRequire, setNotRequire] = useState("");
  // 필수 값 체크를 위한 변수
  const [departmentCheck, setDepartmentCheck] = useState(0);
  const [employeeCodeCheck, setEmployeeCodeCheck] = useState(0);
  const [joinDateCheck, setJoinDateCheck] = useState(0);

  //추가를 눌렸을 때 초기화된 객체를 추가하기 위한 데이터
  const insertData = {
    companyName: "",
    companySeq: 0, //companySeq 받아오는 거 
    departmentCall: "",
    departmentFax: "",
    departmentLoc: "",
    departmentName: "",
    departmentSeq: "",
    departmentZipCode: "",
    duty: "",
    dutyCode: "",
    employeeCode: "",
    mainCompanyYN: "",
    mainDepartmentYN: "",
    employeeSeq: props.employeeSeq,
    position: "",
    positionCode: "",
    workplaceName: "",
  }
  useEffect(() => {

  },[])
  //사원의 조직정보
  useEffect(() => {
    setNotRequire("");
  }, [props.employeeSeq]);

  //리스트 객체 특정값 변경 함수
  const updateIndexObject = (idx, obj) => {
    let copyGroupList = [...props.data];
    copyGroupList[idx] = { ...copyGroupList[idx], ...obj };

    props.setData(copyGroupList);
  }
  const updateObject = (seq, obj) => {
    let copyGroupList = [...props.data];
    const findIndex = props.data.findIndex(
      (element) => element.departmentSeq == seq
    );
    if (findIndex != -1) {
      copyGroupList[findIndex] = { ...copyGroupList[findIndex], ...obj };
    }
    props.setData(copyGroupList);
  };
  //주회사, 주부서 선택 시 다른 회사, 부서 부부서로 변경
  const updateMain = (seq, obj, obj1) => {
    let copyGroupList = [...props.data];
    let idx = [];

    const findIndex = props.data.findIndex(
      (element) => element.departmentSeq == seq
    );
    for (let i = 0; i < copyGroupList.length; i++) {
      if (findIndex != i) {
        idx.push(i);
      }
    }
    if (findIndex != -1) {
      for (let i = 0; i < copyGroupList.length; i++) {
        copyGroupList[i] = { ...copyGroupList[i], ...obj };
      };
      copyGroupList[findIndex] = {
        ...copyGroupList[findIndex],
        ...obj1,
      }
    }
    props.setData(copyGroupList);
  };
  //부서가 선택 되지 않았을 때, 됐지만 조건에 충족하지 않을 때
  const notSelectDepartment = (seq) => {
    seq != 0 ?
      alert("주부서는 존재 해야 됩니다.") :
      alert("부서가 선택되지 않았습니다.")
  }

  //사원 코드 중복체크
  const codeDupliCheck = (companySeq, value) => {
    if (firstCodeCheck(companySeq)) {
      setDupliCheck(0);
      return dupliCheck;
    }
    axios
      .get(`${baseUrl}/company-employee/duplicheck`, {
        params: {
          companySeq: companySeq,
          employeeCode: value,
        },
      })
      .then((res) => setDupliCheck(res.data));
    return dupliCheck;
  };

  //첫 데이터와 비교 (중복체크 전)
  const firstCodeCheck = (seq) => {
    const findIndex = props.data.findIndex(
      (element) => element.companySeq == seq
    );
    return (
      props.firstData[findIndex].employeeCode == props.data[findIndex].employeeCode
    );
  };
  const firstDepartmentCheck = (seq) => {
    const findIndex = props.data.findIndex(
      (element) => element.companySeq == seq
    );
    return (
      props.firstData[findIndex].departmentName == props.data[findIndex].departmentName
    );
  };

  const CreateInsertForm = () => {
    let copyGroupList = [insertData, ...props.data];
    props.setData(copyGroupList);
    props.setFirstData(copyGroupList);
  }

  const RemoveGroup = (idx) => {
    let copyGroupList = [...props.data];
    if (copyGroupList.length > 1) {
      copyGroupList = copyGroupList.filter((_, index) => {
        return index !== idx;
      });
      props.setData(copyGroupList);
    }
  }
  useEffect(() => {
    console.log(props.data);
  }, [props.data]);
  return (
    <div>
      {notRequire}
      {/* <button onClick={AllCheck}>저장</button> */}
      <button onClick={CreateInsertForm}>추가</button>

      {props.data &&
        props.data.map((group, idx) => {
          return (
            <div>
              <button onClick={() => group.mainCompanyYN !== "Y" ? RemoveGroup(idx) : alert("주회사는 삭제할 수 없습니다.")}>삭제</button>
              <table className={style.dept_tbl} key={idx}>
                <thead></thead>
                <tbody>
                  <tr>
                    <th>회사</th>
                    <td>
                      <select>
                        
                      </select>
                    </td>
                    <th>부서</th>
                    <td>
                      <div className="content-have-button">
                        <Form.Control
                          value={group.departmentName}
                          placeholder="부서를 선택해 주십시오."
                          style={{
                            zIndex: "0",
                            backgroundColor: "rgba(241, 199, 199, 0.328)",
                          }}
                          isValid={
                            group.departmentName == undefined ?
                              false :
                              firstDepartmentCheck(group.companySeq)
                                ? ""
                                : group.departmentName != null ||
                                group.departmentName != undefined
                          }
                        />
                        <ManageModal companySeq={group.companySeq} updateIndexObject={updateIndexObject} idx={idx} />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>사번</th>
                    <td colSpan={3}>
                      <Form.Control
                        onChange={(e) => {
                          firstCodeCheck(group.companySeq)
                            ? setDupliCheck(0)
                            : codeDupliCheck(group.companySeq, e.target.value);
                          updateObject(group.departmentSeq, {
                            employeeCode: e.target.value,
                          });
                        }}
                        value={group.employeeCode}
                        placeholder="사번을 입력해 주십시오."
                        style={{
                          zIndex: "0",
                          backgroundColor: "rgba(241, 199, 199, 0.328)",
                        }}
                        isValid={
                          firstCodeCheck(group.companySeq)
                            ? ""
                            : dupliCheck == 0
                              ? true
                              : false
                        }
                        isInvalid={
                          firstCodeCheck(group.companySeq)
                            ? ""
                            : dupliCheck == 1 ||
                              group.employeeCode == null ||
                              group.employeeCode == ""
                              ? true
                              : false
                        }
                      />
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
                          group.departmentSeq != 0 ?
                            updateMain(
                              group.departmentSeq,
                              { mainCompanyYN: "N" },
                              { mainCompanyYN: "Y" }
                            ) :
                            alert("부서가 선택되지 않았습니다.")
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
                          notSelectDepartment(group.departmentSeq);
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
                          group.departmentSeq != 0 ?
                            updateMain(
                              group.departmentSeq,
                              { mainDepartmentYN: "N" },
                              { mainDepartmentYN: "Y" }
                            ) :
                            alert("부서가 선택되지 않았습니다.")
                        }}
                        checked={group.mainDepartmentYN === "Y" ? true : false}
                      />
                      <label>주부서</label>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <input
                        type="radio"
                        name={`main-department-yn${group.departmentSeq}`}
                        value="N"
                        onChange={() => {
                          notSelectDepartment(group.departmentSeq);
                        }}
                        checked={group.mainDepartmentYN === "N" ? true : false}
                      />
                      <label>부부서</label>
                    </td>
                  </tr>

                  <tr>
                    <th>직급</th>
                    <td>
                      <input
                        type="text"
                        value={`${group.positionCode}.${group.position}`}
                      />
                      <EmpPositionModal
                        type={positionModal}
                        updateObject={updateObject}
                        departmentSeq={group.departmentSeq}
                      />
                    </td>
                    <th>직책</th>
                    <td>
                      <input
                        type="text"
                        value={`${group.dutyCode}.${group.duty}`}
                      />
                      <EmpPositionModal
                        departmentSeq={group.departmentSeq}
                        type={dutyModal}
                        updateObject={updateObject}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>재직구분</th>
                    <td colSpan={3}>
                      <select
                        name="emp-classfication"
                        onChange={(e) =>
                          updateObject(group.departmentSeq, {
                            employeeClassification: e.target.value,
                          })
                        }
                      >
                        <option
                          value="J01.재직"
                          checked={group.employeeClassification === "J01.재직"}
                        >
                          J01.재직
                        </option>
                        <option
                          value="J05.퇴직"
                          checked={group.employeeClassification === "J05.퇴직"}
                        >
                          J05.퇴직
                        </option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <th>입사일</th>
                    <td>
                      <input
                        type="date"
                        value={group.employeeJoin}
                        onChange={(e) => {
                          updateObject(group.departmentSeq, {
                            employeeJoin: e.target.value,
                          });
                        }}
                        style={{
                          backgroundColor: "rgba(241, 199, 199, 0.328)",
                        }}
                      />
                    </td>
                    <th>퇴사일</th>
                    <td>
                      <input
                        type="date"
                        value={group.employeeLeave}
                        onChange={(e) => {
                          updateObject(group.departmentSeq, {
                            employeeLeave: e.target.value,
                          });
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>전화번호</th>
                    <td>{group.departmentCall || "-"}</td>
                    <th>팩스번호</th>
                    <td>{group.departmentFax || "-"}</td>
                  </tr>
                  <tr>
                    <th>주소</th>
                    <td colSpan={3}>
                      {group.departmentZipCode != "" && `${group.departmentZipCode} | ${group.departmentLoc}`}
                    </td>
                  </tr>
                </tbody>
              </table>
              <br />
              <br />
            </div>
          );
        })}
    </div>
  );
}

export default EmpDept;
