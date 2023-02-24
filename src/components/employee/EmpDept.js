import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import style from "./css/EmpDept.module.css";
import { Form } from "react-bootstrap";
import EmpPositionModal from "./EmpPositionModal";
import ManageModal from "../departmentModal/ManageModal";
import EmpAlert from "../alert/EmpAlert";
function EmpDept(props) {
  const baseUrl = "http://localhost:8080";
  const positionModal = "POSITION";
  const dutyModal = "DUTY";
  //main 회사 구분
  const [mainCompanySeq, setMainCompanySeq] = useState(0);
  const [mainSeqs, setMainSeqs] = useState([]);
  const [companySeq, setCompanySeq] = useState(0);
  //추가를 눌렸을 때 초기화된 객체를 추가하기 위한 데이터
  const insertData = {
    employeeSeq: 0,
    workplaceSeq: 0,
    departmentSeq: 0,
    companySeq: 0,
    companyCode: null,
    employeeName: null,
    employeeId: null,
    employeePh: null,
    employeePicture: null,
    employeeCall: null,
    employeePmail: null,
    employeeCmail: null,
    companyName: "",
    workplaceName: "",
    departmentName: "",
    employeeBirth: null,
    authSeq: 0,
    duty: "팀원",
    position: "사원",
    mainCompany: null,
    mainDepartment: null,
    startPgNum: 0,
    endPgNum: 0,
    mainCompanyYN: props.data.length > 1 ? "N" : "Y",
    mainDepartmentYN: props.data.length > 1 ? "N" : "Y",
    departmentLoc: "",
    departmentCall: "",
    departmentFax: "",
    departmentDepth: 0,
    departmentParent: 0,
    departmentZipCode: "",
    dutyCode: "1",
    positionCode: "1",
    employeeCode: "",
    employeeJoin: null,
    employeeLeave: null,
    employeeClassification: "J01",
    companyHomepage: null,
    page: 0,
    insertData: "Y",
  };
  useEffect(() => {
    props.data.map((data) => {
      data.mainCompanyYN == "Y" && setMainCompanySeq(data.companySeq);
    });
    props.data.map((data) => {
      data.departmentYN == "Y" &&
        setMainSeqs(mainSeqs, {
          companySeq: data.companySeq,
          department: data.departmentSeq,
        });
    });
  }, [props.data]);

  

  useEffect(() => {
    setMainSeqs([]);
    setMainCompanySeq(0);
  }, [props.mainSeqsFlag]);
  //주회사 주부서 구분
  useEffect(() => {
    let temp = [];
    props.data.map((data) => {
      data.mainCompanyYN == "Y" && setMainCompanySeq(data.companySeq);
    });
    setMainSeqs(temp);
  }, [props.employeeSeq]);

  //리스트 객체 특정값 변경 함수
  const updateIndexObject = (idx, obj) => {
    let copyGroupList = [...props.data];
    copyGroupList[idx] = { ...copyGroupList[idx], ...obj };
    props.setData(copyGroupList);
  };
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
  const updateMain = (seq) => {
    let copyGroupList = [...props.data];
    setMainCompanySeq(seq);
    copyGroupList.map((data, key) => {
      data.companySeq == seq
        ? (copyGroupList[key] = {
            ...copyGroupList[key],
            ...{ mainCompanyYN: "Y" },
          })
        : (copyGroupList[key] = {
            ...copyGroupList[key],
            ...{ mainCompanyYN: "N" },
          });
    });
    props.setData(copyGroupList);
  };
  const updateDepartment = (companySeq, departmentSeq) => {
    let copyGroupList = [...props.data];
    props.data.map((seq, key) => {
      seq.departmentSeq == departmentSeq
        ? (copyGroupList[key] = {
            ...copyGroupList[key],
            ...{ mainDepartmentYN: "Y" },
          })
        : seq.companySeq == companySeq && seq.departmentSeq != departmentSeq
        ? (copyGroupList[key] = {
            ...copyGroupList[key],
            ...{ mainDepartmentYN: "N" },
          })
        : console.log(seq.companySeq);
    });
    props.setData(copyGroupList);
  };
  useEffect(() => {
    employeeCodeSetting(companySeq)
  }, [companySeq])
    const employeeCodeSetting = (companySeq) => {
      let copyGroupList = [...props.data];
      let employeeCode = [];
       props.data.map((seq) => {
        seq.companySeq == companySeq &&
        seq.employeeCode != "" &&
        employeeCode.push(seq.employeeCode);
      })
      props.data.map((seq,key) => {
        seq.companySeq == companySeq &&
        (copyGroupList[key] = {
          ...copyGroupList[key],
          ...{employeeCode: employeeCode[0]}
        })
      })
      props.setData(copyGroupList);
    }
    useEffect(() => {
      console.log(props.data);
    }, [props.data])
  //부서가 선택 되지 않았을 때, 됐지만 조건에 충족하지 않을 때
  const notSelectDepartment = (seq) => {
    seq != 0
      ? alert("주부서는 존재 해야 됩니다.")
      : alert("부서가 선택되지 않았습니다.");
  };

  //사원 코드 중복체크
  const codeDupliCheck = (companySeq, value) => {
    if (firstCodeCheck(companySeq)) {
      props.setDupliCheck(0);
      return props.dupliCheck;
    }
    if (!firstCodeCheck(companySeq)) {
      axios
        .get(`${baseUrl}/company-employee/duplicheck`, {
          params: {
            companySeq: companySeq,
            employeeCode: value,
          },
        })
        .then((res) => props.setDupliCheck(res.data));
      return props.dupliCheck;
    }
  };
  const firstCodeCheck = (seq) => {
    const findIndex = props.data.findIndex(
      (element) => element.companySeq == seq
    );
    return (
      props.firstData[findIndex].employeeCode ==
      props.data[findIndex].employeeCode
    );
  };

  const CreateInsertForm = () => {
    if (props.data[0].departmentSeq == 0) {
      alert("필수값을 입력하고 추가해 주십시오.");
    } else {
      let copyGroupList = [insertData, ...props.data];
      props.setData(copyGroupList);
      props.setFirstData(copyGroupList);
    }
  };

  const RemoveGroup = (idx) => {
    let copyGroupList = [...props.data];
    let copyFirstGroupList = [...props.firstData];
    if (copyGroupList.length > 1) {
      copyGroupList = copyGroupList.filter((_, index) => {
        return index !== idx;
      });
      copyFirstGroupList = copyFirstGroupList.filter((_, index) => {
        return index !== idx;
      });
      props.setFirstData(copyFirstGroupList);
      props.setData(copyGroupList);
    }
  };
  useEffect(() => {
    requireCheck();
  }, [props.data]);

  //필수값 입력 체크
  const requireCheck = () => {
    props.setDepartmentCheck(true);
    props.setEmployeeCodeCheck(true);
    props.setJoinDateCheck(true);

    for (let i = 0; i < props.data.length; i++) {
      if (!props.data[i].employeeCode) {
        props.setEmployeeCodeCheck(false);
        return false;
      }
      if (!props.data[i].departmentName) {
        props.setDepartmentCheck(false);
        return false;
      }
      if (!props.data[i].employeeJoin) {
        props.setJoinDateCheck(false);
        return false;
      }
    }
  };
  return (
    <div id={style.empdept}>
      {/* <button onClick={AllCheck}>저장</button> */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="success"
          onClick={CreateInsertForm}
          style={{ width: "10%", marginRight: "22px" }}
        >
          조직 추가
        </Button>
      </div>
      <div id={style.box}>
        {props.data &&
          props.data.map((group, idx) => {
            return (
              <div>
                <Button
                  variant="danger"
                  style={{ marginBottom: "5px" }}
                  onClick={() => {
                    group.insertData == "Y"
                      ? props.setNotRequire(
                          <EmpAlert
                            title="취소하시겠습니까?"
                            icon="question"
                            successButton="확인"
                            functionText="취소"
                            cancleButton="true"
                            Cancle={RemoveGroup}
                            idx={idx}
                          />
                        )
                      : props.setNotRequire(
                          <EmpAlert
                            title="제거하시겠습니까?"
                            icon="warning"
                            successButton="확인"
                            functionText="삭제"
                            cancleButton="true"
                            Delete={props.selectDelete}
                            idx={idx}
                            data={props.firstData[idx]}
                            setDeleteFlag={props.setDeleteFlag}
                            setStatus={props.setStatus}
                          />
                        );
                  }}
                >
                  제거
                </Button>
                <table className={style.dept_tbl} key={idx}>
                  <thead></thead>
                  <tbody>
                    <tr>
                      <th>회사</th>
                      <td>
                        <select
                          value={group.companySeq}
                          name="companylist"
                          onChange={(e) => {
                            setCompanySeq(e.target.value);
                            props.data.length < 2
                              ? function(){
                                updateObject(group.departmentSeq, {
                                  companySeq: e.target.value,
                                  workplaceSeq: 0,
                                  departmentSeq: 0,
                                  workplaceName: "",
                                  departmentName: "",
                                  mainCompanyYN: "Y",
                                  mainDepartmentYN: "Y",
                                  employeeCode: "",
                                });
                                setMainCompanySeq(e.target.value);
                              }()
                              : e.target.value == mainCompanySeq
                              ?
                                updateObject(group.departmentSeq, {
                                  companySeq: e.target.value,
                                  workplaceSeq: 0,
                                  departmentSeq: 0,
                                  workplaceName: "",
                                  departmentName: "",
                                  mainCompanyYN: "Y",
                                  mainDepartmentYN: "N",
                                  employeeCode: "",
                                })
                              
                              : updateObject(group.departmentSeq, {
                                  companySeq: e.target.value,
                                  workplaceSeq: 0,
                                  departmentSeq: 0,
                                  workplaceName: "",
                                  departmentName: "",
                                  mainCompanyYN: "N",
                                  mainDepartmentYN: "",
                                  employeeCode: "",
                                });
                          }}
                        >
                          <option value={0}>회사 선택</option>
                          {props.companyList.map((company) => {
                            return (
                              <>
                                <option value={company.companySeq}>
                                  {company.companyName}
                                </option>
                              </>
                            );
                          })}
                        </select>
                      </td>
                      <th>부서</th>
                      <td>
                        <Form.Group>
                          <div className="content-have-button">
                            <Form.Control
                              className={style.emp_input}
                              value={group.departmentName}
                              placeholder="부서를 선택해 주십시오."
                              style={{
                                zIndex: "0",
                                backgroundColor: "rgba(241, 199, 199, 0.328)",
                              }}
                            />
                            <ManageModal
                              companySeq={group.companySeq}
                              updateIndexObject={updateIndexObject}
                              idx={idx}
                              updateDepartment = {updateDepartment}
                            />
                          </div>
                        </Form.Group>
                      </td>
                    </tr>
                    <tr>
                      <th>사번</th>
                      <td colSpan={3}>
                        <Form.Group>
                          <Form.Control
                            className={style.emp_input}
                            onChange={(e) => {
                              !group.employeeCode ||
                              firstCodeCheck(group.companySeq)
                                ? props.setDupliCheck(0)
                                : codeDupliCheck(
                                    group.companySeq,
                                    e.target.value
                                  );
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
                                : props.dupliCheck == 0
                                ? true
                                : false
                            }
                            isInvalid={
                              firstCodeCheck(group.companySeq)
                                ? ""
                                : props.dupliCheck == 1 ||
                                  group.employeeCode == null ||
                                  group.employeeCode == ""
                                ? true
                                : false
                            }
                            readOnly = {(group.insertData == null || group.insertData == "" || group.insertData == undefined)
                                        || group.mainDepartmentYN == "N" || group.departmentSeq == 0}
                          />
                        </Form.Group>
                      </td>
                    </tr>
                    <tr>
                      <th>회사구분</th>
                      <td>
                        <input
                          type="radio"
                          name={`main-company-yn${
                            group.departmentSeq || `insertCompanyForm${idx}`
                          }`}
                          value="Y"
                          onChange={() => {
                            group.companySeq != 0
                              ? updateMain(group.companySeq)
                              : alert("부서가 선택되지 않았습니다.");
                          }}
                          checked={group.mainCompanyYN == "Y" ? true : false}
                        />
                        <label>주회사</label>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input
                          type="radio"
                          name={`main-company-yn${
                            group.departmentSeq || `insertCompanyForm${idx}`
                          }`}
                          value="N"
                          onChange={() => {
                            alert("주회사는 존재 해야 됩니다.");
                          }}
                          checked={group.mainCompanyYN == "N" ? true : false}
                        />
                        <label>부회사</label>
                      </td>
                      <th>부서구분</th>
                      <td>
                        <input
                          type="radio"
                          name={`main-department-yn${
                            group.departmentSeq || `insertDepartmentForm${idx}`
                          }`}
                          value="Y"
                          onChange={() => {
                            group.departmentSeq != 0
                              ? updateDepartment(
                                  group.companySeq,
                                  group.departmentSeq
                                )
                              : alert("부서가 선택되지 않았습니다.");
                          }}
                          checked={
                            group.mainDepartmentYN === "Y" ? true : false
                          }
                        />
                        <label>주부서</label>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input
                          type="radio"
                          name={`main-department-yn${
                            group.departmentSeq || `insertDepartmentForm${idx}`
                          }`}
                          value="N"
                          onChange={() => {
                            notSelectDepartment(group.departmentSeq);
                          }}
                          checked={
                            group.mainDepartmentYN === "N" ? true : false
                          }
                        />
                        <label>부부서</label>
                      </td>
                    </tr>

                    <tr>
                      <th>직급</th>
                      <td>
                        {`${group.positionCode}.${group.position}`}
                        <EmpPositionModal
                          type={positionModal}
                          updateObject={updateObject}
                          departmentSeq={group.departmentSeq}
                        />
                      </td>
                      <th>직책</th>
                      <td>
                        {`${group.dutyCode}.${group.duty}`}
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
                            e.target.value == "J05"
                              ? updateObject(group.departmentSeq, {
                                  employeeClassification: e.target.value,
                                })
                              : updateObject(group.departmentSeq, {
                                  employeeClassification: e.target.value,
                                  employeeLeave: "",
                                })
                          }
                        >
                          <option
                            value="J01"
                            checked={group.employeeClassification == "J01"}
                          >
                            J01.재직
                          </option>
                          <option
                            value="J05"
                            checked={group.employeeClassification == "J05"}
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
                          value={group.employeeJoin || ""}
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
                        {group.departmentZipCode ? `${group.departmentZipCode} | ${group.departmentLoc}` : "-"}
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
    </div>
  );
}

export default EmpDept;
