import React, { useEffect, useState } from "react";
import axios from "axios";

import style from "./css/EmpDept.module.css";
import { Form } from "react-bootstrap";
import EmpPositionModal from "./EmpPositionModal";
import SaveFailAlert from "./alert/SaveFailAlert";
import UpdateAlert from "./alert/UpdateAlert";

function EmpDept(props) {
  const baseUrl = "http://localhost:8080";
  
  const [groupList, setGroupList] = useState([]);
  const positionModal = "POSITION";
  const dutyModal = "DUTY";
  const [positionCode, setPositionCode] = useState("");
  const [dupliCheck, setDupliCheck] = useState(0);
  const [firstData, setFirstData] = useState([]);
  const [notRequire, setNotRequire] = useState('');
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
        setFirstData(res.data);
      })
      .catch((error) => console.log(error));
      setNotRequire('');
  }, [props.employeeSeq]);

  //리스트 객체 특정값 변경 함수
  const updateObject = (seq, obj) => {
    let copyGroupList = [...groupList];
    const findIndex = groupList.findIndex(
      element => element.departmentSeq == seq
    )
    if (findIndex != -1) {
      copyGroupList[findIndex] = { ...copyGroupList[findIndex], ...obj }
    }
    setGroupList(copyGroupList);
  }
  //주회사, 주부서 선택 시 다른 회사, 부서 부부서로 변경
  const updateMain = (seq, obj, obj1) => {
    let copyGroupList = [...groupList];
    const findIndex = groupList.findIndex(
      element => element.departmentSeq != seq
    )
    const findTrueIndex = groupList.findIndex(
      element => element.departmentSeq == seq
    )
    if(findIndex != -1) {
      copyGroupList[findIndex] = { ...copyGroupList[findIndex], ...obj}
      copyGroupList[findTrueIndex] = { ...copyGroupList[findTrueIndex], ...obj1}
    }
    setGroupList(copyGroupList);
  }  

  //사원 코드 중복체크
  const codeDupliCheck = (companySeq, value) => {
    if(firstCodeCheck(companySeq)){
      setDupliCheck(0);
      return dupliCheck;
    }
    axios.get(`${baseUrl}/company-employee/duplicheck`, {
      params : {
        "companySeq" : companySeq,
        "employeeCode" : value
      }
    })
    .then(res => setDupliCheck(res.data));
    return dupliCheck;
  }
  
  //첫 데이터와 비교 (중복체크 전)
  const firstCodeCheck = (seq) => {
    const findIndex = groupList.findIndex(element => element.companySeq == seq);
    return firstData[findIndex].employeeCode == groupList[findIndex].employeeCode;
  }
  const firstDepartmentCheck = (seq) => {
    const findIndex = groupList.findIndex(element => element.companySeq == seq);
    return firstData[findIndex].departmentName == groupList[findIndex].departmentName;
  }

  const InsertData = () => {
    
  }

  // 필수 값 체크를 위한 변수
  const [departmentCheck, setDepartmentCheck] = useState(0);
  const [employeeCodeCheck, setEmployeeCodeCheck] = useState(0);
  const [joinDateCheck, setJoinDateCheck] = useState(0);
  
  // 중복, 체크 등 수정 및 추가 가능한 상태를 확인하기 위한 변수
  const [allCheck, setAllCheck] = useState(false);
  
  const AllCheck = () => {
    requireCheck();
    if(JSON.stringify(firstData) == JSON.stringify(groupList)) {
      setNotRequire(<SaveFailAlert text = '' title = "수정 된 사항이 없습니다."/>)
      return false;
    }
    if(employeeCodeCheck == 1) {
      setNotRequire(<SaveFailAlert text = "사번이 입력되지 않았습니다." title = "필수 값이 입력되지 않았습니다"/>)
      return false;
    }
    if(departmentCheck == 1) {
      setNotRequire(<SaveFailAlert text = "부서가 선택되지 않았습니다." title = "필수 값이 입력되지 않았습니다"/>)
      return false;
    }
    if(joinDateCheck == 1) {
      setNotRequire(<SaveFailAlert text = "입사 날짜가 선택되지 않았습니다." title = "필수 값이 입력되지 않았습니다"/>)
      return false;
    }
    if(dupliCheck == 1) {
      setNotRequire(<SaveFailAlert text = "사번이 중복되었습니다." title = "중복된 값이 있습니다."/>)
      return false;
    }
    setAllCheck(true);
    return true;
  }

  
  //필수값 입력 체크
  const requireCheck = () => {
    setDepartmentCheck(0);
    setEmployeeCodeCheck(0);
    setJoinDateCheck(0);
    for(let i =0; i < groupList.length; i ++) {
      if(groupList[i].employeeCode == null || groupList[i].employeeCode == undefined || groupList[i].employeeCode == "") {
        setEmployeeCodeCheck(1);
        return false;
      }
      if(groupList[i].departmentName == null || groupList[i].departmentName == undefined || groupList[i].departmentName == "") {
        setDepartmentCheck(1);
        return false;
      }
      if(groupList[i].employeeJoin == null || groupList[i].employeeJoin == undefined || groupList[i].employeeJoin == "") {
        setJoinDateCheck(1);
        return false;
      }
    }
  }
  useEffect(() => {
    console.log(groupList);
  },[groupList])
  return (
    <div>
      {notRequire}
      {
        groupList && allCheck == true && <UpdateAlert/>
      }
      <button onClick = {AllCheck}>저장</button>
      {groupList &&
        groupList.map((group, idx) => {
          return (
            <div>
              <table className={style.dept_tbl} key = {idx}>
                <thead></thead>
                <tbody>
                  <tr>
                    <th>회사</th>
                    <td>{group.companyName} | {group.workplaceName}</td>
                    <th>부서</th>
                    <td>
                      <div className="content-have-button">
                        <Form.Control
                          onChange={(e) => {
                            updateObject(group.departmentSeq, { departmentName: e.target.value });
                          }}
                          defaultValue={group.departmentName}
                          placeholder="부서를 선택해 주십시오."
                          style={{
                            zIndex: "0",
                            backgroundColor: "rgba(241, 199, 199, 0.328)",
                          }}
                          isValid = {firstDepartmentCheck(group.companySeq) ? '' : group.departmentName != null || group.departmentName != undefined}
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
                          firstCodeCheck(group.companySeq) ? setDupliCheck(0) :
                          codeDupliCheck(group.companySeq, e.target.value);
                          updateObject(group.departmentSeq, { employeeCode: e.target.value })
                        }
                      }
                      value={group.employeeCode}
                      placeholder="사번을 입력해 주십시오."
                      style={{
                        zIndex: "0",
                        backgroundColor: "rgba(241, 199, 199, 0.328)",
                      }}
                      isValid={firstCodeCheck(group.companySeq) ? '' : dupliCheck == 0 ? true: false}
                      isInvalid={firstCodeCheck(group.companySeq) ? '': dupliCheck == 1 || group.employeeCode == null || group.employeeCode == '' ? true: false}
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
                          updateMain(group.departmentSeq, {mainCompanyYN: "N"} , {mainCompanyYN: "Y"})
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
                          alert("주회사는 존재 해야 됩니다.");
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
                          updateMain(group.departmentSeq, {mainDepartmentYN: "N"} , {mainDepartmentYN: "Y"})
                        }}
                        checked={group.mainDepartmentYN === "Y"? true : false}
                      />
                      <label>주부서</label>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <input
                        type="radio"
                        name={`main-department-yn${group.departmentSeq}`}
                        value="N"
                        onChange={() => { 
                          alert("주부서는 존재 해야 됩니다.");
                        }}
                        checked={group.mainDepartmentYN === "N" ? true : false}
                      />
                      <label>부부서</label>
                    </td>
                  </tr>

                  <tr>
                    <th>직급</th>
                    <td>
                      <input type="text" value={`${group.positionCode}.${group.position}`}
                         />
                      <EmpPositionModal type={positionModal} updateObject={updateObject} departmentSeq={group.departmentSeq} /></td>
                    <th>직책</th>
                    <td>
                      <input type="text" value={`${group.dutyCode}.${group.duty}`}
                       /><EmpPositionModal departmentSeq={group.departmentSeq} type={dutyModal}
                          updateObject={updateObject} />
                    </td>
                  </tr>
                  <tr>
                    <th>재직구분</th>
                    <td colSpan={3}>
                      <select name="emp-classfication" onChange ={ e => updateObject(group.departmentSeq, {employeeClassification: e.target.value})}>
                        <option value="J01.재직" checked={group.employeeClassification === "J01.재직"}>J01.재직</option>
                        <option value="J05.퇴직" checked={group.employeeClassification === "J05.퇴직"}>J05.퇴직</option>
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
                          updateObject(group.departmentSeq, { employeeJoin: e.target.value })
                        }}
                        style={{ backgroundColor: "rgba(241, 199, 199, 0.328)" }}
                      />
                    </td>
                    <th>퇴사일</th>
                    <td>
                      <input
                        type="date"
                        value={group.employeeLeave}
                        onChange={(e) => {
                          updateObject(group.departmentSeq, { employeeLeave: e.target.value })
                        }}
                        
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>전화번호</th>
                    <td>
                      {group.departmentCall || "-"}
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
