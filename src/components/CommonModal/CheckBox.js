import axios from "axios";
import { useEffect, useState } from "react";

const CheckBox = (props) => {
  const [departmentSeq, setDepartmentSeq] = useState("");
  const baseUrl = "http://localhost:8080";
  const [page, setPage] = useState(1);
  const [deptList, setDeptList] = useState([]);

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
          console.log("받은값" + res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [departmentSeq]);

  return (
    <div>
      <div class="container">
        <div class="row">
          <div class="col-12">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">
                    {" "}
                    <label
                      class="custom-control-label"
                      for="customCheck1"></label>
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
                  deptList.map((dList) => (
                    <tr>
                      <td>
                        <div class="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            id="customCheck2"></input>
                          <label
                            class="custom-control-label"
                            for="customCheck1"></label>
                        </div>
                      </td>
                      <td> {dList.employeeName}</td>
                      <td>Cristina</td>
                      <td>aa</td>
                      <td>3.417</td>
                      <td>ajjh@naver.com</td>
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
