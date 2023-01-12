import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const CheckBox = (props) => {
  const [departmentSeq, setDepartmentSeq] = useState("");
  const baseUrl = "http://localhost:8080";
  const [page, setPage] = useState(1);
  const [deptList, setDeptList] = useState([]);
  const [checkedList, setCheckedLists] = useState([]);

  //값 받아서 departmentSeq 설정
  useEffect(() => {
    // console.log(props.departmentSeq);
    setDepartmentSeq(props.departmentSeq);
  }, [props]);

  useEffect(() => {
    if (departmentSeq != null) {
      axios({
        type: "get",
        url: `${baseUrl}/department-employee/department/page/${page}?departmentSeq=${departmentSeq}`,
      })
        .then((res) => {
          setDeptList(res.data);
          // console.log("받은값" + res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [departmentSeq]);

  //전체 클릭시 발생하는 함수
  const onCheckedAll = useCallback(
    (checked) => {
      if (checked) {
        const checkedListArray = [];

        deptList.forEach((list) => checkedListArray.push(list));
        setCheckedLists(checkedListArray);
      } else {
        setCheckedLists([]);
      }
    },
    [deptList]
  );

  console.log(checkedList);

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">
                    {" "}
                    <input
                      type="checkbox"
                      onClick={(e) => onCheckedAll(e.target.checked)}
                      checked={
                        checkedList.length === 0
                          ? false
                          : checkedList.length === deptList.length
                          ? true
                          : false
                      }
                      className="custom-control-input"
                      id="customCheck2"></input>
                  </th>
                  <th scope="col">사업장</th>
                  <th scope="col">부서명</th>
                  <th scope="col">직급</th>
                  <th scope="col">성명</th>
                  <th scope="col">이메일</th>
                </tr>
              </thead>
              <tbody>
                {deptList &&
                  deptList.map((deptList) => (
                    <tr>
                      <td>
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customCheck2"></input>
                          <label
                            className="custom-control-label"
                            htmlFor="customCheck1"></label>
                        </div>
                      </td>
                      <td> {deptList.companyName}</td>
                      <td>{deptList.workplaceName}</td>
                      <td>{deptList.title}</td>
                      <td>{deptList.employeeName}</td>
                      <td>{deptList.employeePmail}</td>
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
export default CheckBox;
