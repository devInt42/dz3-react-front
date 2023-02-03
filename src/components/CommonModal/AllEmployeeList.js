import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const AllEmployeeList = (props) => {
  const [departmentSeq, setDepartmentSeq] = useState(0);
  const baseUrl = "http://localhost:8080";
  const [deptList, setDeptList] = useState([]);
  const [page, setPage] = useState(1);
  const [checkedList, setCheckedLists] = useState([]);
  const [employeeName, setEmployeeName] = useState();
  const [companySeq, setCompanySeq] = useState();
  const [authSeq, setAuthSeq] = useState("");
  const [pointCompanySeq, setPointCompanySeq] = useState("");

  //값 받아서 departmentSeq 설정
  useEffect(() => {
    async function getDeptSeq() {
      const result = await props.departmentSeq;
      setDepartmentSeq(result);
    }
    getDeptSeq();
  }, [props]);

  useEffect(() => {
    async function getEmplName() {
      const result = await props.employeeName;
      setEmployeeName(result);
    }
    getEmplName();
  }, [props]);

  // useEffect(() => {
  //   async function getAuthSeq() {
  //     const result = await props.authSeq;
  //     setAuthSeq(result);
  //   }
  //   getAuthSeq();
  // }, [props]);

  useEffect(() => {
    async function getPointCompanySeq() {
      const result = await props.pointCompanySeq;
      setPointCompanySeq(result);
    }
    getPointCompanySeq();
  }, [props]);

  // useEffect(() => {
  //   initLoad();
  // }, [authSeq, pointCompanySeq]);

  // const initLoad = async () => {
  //   if (authSeq != "" && pointCompanySeq != "") {
  //     let data = {
  //       authSeq: authSeq,
  //       companySeq: pointCompanySeq,
  //     };
  //     try {
  //       const dataResult = await axios.get(
  //         `${baseUrl}/department-employee/auth`,
  //         {
  //           params: data,
  //         }
  //       );
  //       setCheckedLists(dataResult.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  // useEffect(() => {}, [checkedList]);

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
    console.log("랜더링");
  }, [departmentSeq]);

  //개별 클릭시 발생하는 함수
  const onCheckedElement = useCallback(
    async (checked, list) => {
      // list  : 클릭한 하나의 값
      // deptlist : 그 페이지 값
      // temp : 일치하는 employeeSeq
      // 1. deptList에서 list값(하나)의 seq를 찾음.
      // 2. temp = deptlist
      // 3. tempObj = deptList[하나 값] checked => true로 변경 (원래정보 + checked 데이터가 담겨있는 객체)
      // 4. temp에 tempObj값을 합해줌 (리액트 배열 갈아끼기)
      // 5. setDeptList에 (temp) 값 넣기 --> deptlist는 일부 애들만 check가 true로 변경되어있는 해당 전체 페이지값
      // 6. checked가 true인애들만 filter로 걸러서 걔랑 deptlist(4)의 길이가 같으면 true

      try {
        if (checked) {
          deptList.map((dept) => {
            if (dept.employeeSeq === list.employeeSeq) {
              let idx = list;
              let temp = deptList;

              let tempObj = { ...idx, checked: true };

              //temp 에 tempObj 와 같은 배열 값 갈아끼우기
              temp.splice(temp.lastIndexOf(idx), 1, tempObj);
              console.log("temp" + temp);
              setDeptList(temp);
              // console.log("체크시" + deptList);
              return;
            }
          });
          setCheckedLists([...checkedList, list]);
        } else {
          setCheckedLists(
            checkedList.filter((el) => el.employeeSeq !== list.employeeSeq)
          );
          //temp에 check값 false로 변경
          deptList.map((dept) => {
            if (dept.employeeSeq === list.employeeSeq) {
              let idx = list;
              let temp = deptList;
              let tempObj = { ...idx, checked: false };
              temp.splice(temp.lastIndexOf(idx), 1, tempObj);
              setDeptList(temp);
              // console.log("취소시" + deptList);
              return;
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    [checkedList]
  );

  //input값 바뀔때마다 값 받아오는 axios
  const getEmplElement = useCallback(async () => {
    if (employeeName == null) {
    } else {
      let getEmplData = {
        companySeq: companySeq,
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
  // useEffect(() => {}, [onCheckedAll]);
  useEffect(() => {}, [onCheckedElement]);

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
                      // onChange={(e) =>
                      //   onCheckedElement(e.target.checked, deptList)
                      // }
                      checked={(() => {
                        let temp = deptList.filter(
                          (dept) => dept.checked === true
                        );
                        if (temp.length === deptList.length) {
                          console.log("t" + temp.length);
                          console.log("d" + deptList.length);
                          return true;
                        } else {
                          console.log("t" + temp.length);
                          console.log("d" + deptList.length);
                          return false;
                        }
                      })()}
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
                    <td>{dept.title}</td>
                    <td>{dept.employeeName}</td>
                    <td>{dept.employeePmail}</td>
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
