import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const AllEmployeeList = (props) => {
  const [departmentSeq, setDepartmentSeq] = useState(0);
  const baseUrl = "http://localhost:8080";
  const [deptList, setDeptList] = useState([]);
  const [page, setPage] = useState(1);
  const [checkedList, setCheckedLists] = useState([]);
  const [employeeName, setEmployeeName] = useState();
  const [authSeq, setAuthSeq] = useState("");
  const [pointCompanySeq, setPointCompanySeq] = useState("");
  const [checkSeq, setCheckSeq] = useState(null);

  //값 받아서 departmentSeq 설정
  useEffect(() => {
    getProps();
  }, [props]);

  useEffect(() => {
    setCheckSeq(props.checkSeq);
  }, [props]);

  useEffect(() => {
    checkEmplSeq();
  }, [checkSeq]);

  const checkEmplSeq = useCallback(() => {
    if (checkSeq == null) {
    } else {
      setCheckedLists(checkedList.filter((c) => c.employeeSeq !== checkSeq));
    }
  }, [checkSeq]);

  const getProps = useCallback(async () => {
    setDepartmentSeq(props.departmentSeq);
    setEmployeeName(props.employeeName);
    setAuthSeq(props.authSeq);
    setPointCompanySeq(props.pointCompanySeq);
  }, [props]);
  useEffect(() => {}, [departmentSeq]);
  useEffect(() => {}, [employeeName]);
  useEffect(() => {}, [authSeq]);
  useEffect(() => {}, [pointCompanySeq]);

  useEffect(() => {
    initLoad();
  }, [authSeq, pointCompanySeq]);

  //권한 값 받아오기
  const initLoad = async () => {
    if (authSeq !== "" && pointCompanySeq !== "") {
      let data = {
        authSeq: authSeq,
        companySeq: pointCompanySeq,
      };
      try {
        const dataResult = await axios.get(
          `${baseUrl}/department-employee/auth`,
          {
            params: data,
          }
        );
        setCheckedLists(dataResult.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {}, [checkedList]);

  //checkedList가 바뀔때마다 modal로 값 전송
  const sendInfo = () => {
    const result = JSON.stringify(checkedList);
    props.sendCheckedElement(result);
  };

  useEffect(() => {
    sendInfo();
  }, [checkedList]);

  //List, Count 가져오기
  const getDeptList = useCallback(async () => {
    if (departmentSeq != null) {
      let data = {
        departmentSeq,
      };
      try {
        const dataResult = await axios.get(
          `${baseUrl}/department-employee/department`,
          {
            params: data,
          }
        );
        setDeptList(dataResult.data);
      } catch (error) {
        console.log(error);
      }
    }
  }, [departmentSeq]);

  useEffect(() => {
    getDeptList();
    setPage(1);
  }, [departmentSeq]);

  useEffect(() => {
    onCheckedElement();
  }, [departmentSeq]);

  //클릭시 발생하는 함수
  const onCheckedElement = useCallback(
    async (checked, list) => {
      try {
        if (checked) {
          setCheckedLists([...checkedList, list]);
        } else {
          setCheckedLists(
            checkedList.filter((el) => el.employeeSeq !== list.employeeSeq)
          );
        }
      } catch (error) {}
    },
    [checkedList]
  );

  //input값 바뀔때마다 값 받아오는 axios
  const getEmplElement = useCallback(async () => {
    if (employeeName == null) {
    } else {
      let getEmplData = {
        companySeq: pointCompanySeq,
        employeeName: employeeName,
      };
      try {
        const getEmplElementResult = await axios.get(
          `${baseUrl}/department-employee/search`,
          {
            params: getEmplData,
            headers: {
              Authorization: window.sessionStorage.getItem("empInfo"),
            },
          }
        );
        setDeptList(getEmplElementResult.data);
      } catch (error) {
        console.log(error);
      }
    }
  }, [employeeName]);

  useEffect(() => {
    getEmplElement();
  }, [employeeName]);

  //check된 값 저장 배열
  useEffect(() => {}, [checkedList]);
  useEffect(() => {}, [onCheckedElement]);
  //정규식
  const regexMail = (e) => {
    if (e != null) {
      let text = e.replace(/^(www\.)?/, "");
      return text;
    }
  };
  return (
    <div>
      <div className="container">
        <div className="row" style={{ overflow: "auto", maxHeight: "250px" }}>
          <div className="col-12">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">
                    {" "}
                    <input
                      key={0}
                      type="checkbox"
                      //deptList에 employeeSeq에 CheckList에 seq값이 포함하는게 다 있으면 true
                      checked={
                        deptList
                          .map((d) => d.employeeSeq)
                          .every((item) =>
                            checkedList
                              .map((cl) => cl.employeeSeq)
                              .includes(item)
                          ) && deptList.length !== 0
                      }
                      //setCheckList(체크리스트 값  + deptList중에 checkList에 없는 값
                      // setCheckList( deptList와 checkList가 일치하지 않는 값)
                      onChange={(e) => {
                        if (e.target.checked) {
                          setCheckedLists([
                            ...checkedList,
                            ...deptList.filter(
                              (d) =>
                                !checkedList
                                  .map((it) => it.employeeSeq)
                                  .includes(d.employeeSeq)
                            ),
                          ]);
                        } else {
                          setCheckedLists(
                            checkedList.filter(
                              (d) =>
                                !deptList
                                  .map((it) => it.employeeSeq)
                                  .includes(d.employeeSeq)
                            )
                          );
                        }
                      }}
                      className="custom-control-input"
                      id="customCheck2"></input>
                  </th>
                  <th scope="col">회사</th>
                  <th scope="col">사업장</th>
                  <th scope="col">부서</th>
                  <th scope="col">직급</th>
                  <th scope="col">성명</th>
                  <th scope="col">이메일</th>
                </tr>
              </thead>
              <tbody>
                {deptList.map((dept) => (
                  <tr key={dept.employeeSeq}>
                    <td>
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          onChange={(e) =>
                            onCheckedElement(e.target.checked, dept)
                          }
                          //체크 유지 값
                          checked={(() => {
                            let tempList = checkedList.filter(
                              (data) => data.employeeSeq === dept.employeeSeq
                            );
                            if (tempList.length > 0) {
                              return true;
                            } else {
                              return false;
                            }
                          })()}
                          id="customCheck2"></input>
                        <label
                          className="custom-control-label"
                          htmlFor="customCheck1"></label>
                      </div>
                    </td>
                    <td>{dept.companyName}</td>
                    <td>{dept.workplaceName}</td>
                    <td>{dept.departmentName}</td>
                    <td>{dept.position}</td>
                    <td>{dept.employeeName}</td>
                    <td>
                      {dept.employeeCmail}&#64;
                      {regexMail(dept.companyHomepage)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AllEmployeeList;
