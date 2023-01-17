import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";

const AllEmployeeList = (props) => {
  const [departmentSeq, setDepartmentSeq] = useState();
  const baseUrl = "http://localhost:8080";
  const [deptList, setDeptList] = useState([]);

  const [page, setPage] = useState(1); // 현재 페이지
  const [countEmployee, setCountEmployee] = useState(null); // 총 사원수
  const [active, setActive] = useState(1); // 현재 페이지수

  let items = []; // 페이지 숫자 저장 < 1 2 3 4 5 >

  //값 저장
  const [checkedList, setCheckedLists] = useState([]);

  //값 받아서 departmentSeq 설정
  useEffect(() => {
    async function getDeptSeq() {
      const result = await props.departmentSeq;
      setDepartmentSeq(result);
    }
    getDeptSeq();
  }, [props]);

  //값 저장할 함수
  async function sendCheckedElement(a) {
    setCheckedLists(a);
  }

  //checkList바뀔때마다 보냄
  useEffect(() => {
    sendCheckedElement(checkedList);
  }, [checkedList]);

  //checkedList가 바뀔때마다 modal로 값 전송
  useEffect(() => {
    async function sendInfo() {
      const result = await JSON.stringify(checkedList);
      props.sendCheckedElement(result);
    }
    sendInfo();
  }, [checkedList]);

  //List 가져오기
  const getDeptList = useCallback(async () => {
    if (departmentSeq != null) {
      let data = {
        departmentSeq,
      };
      try {
        const dataResult = await axios.get(
          `${baseUrl}/department-employee/department/page/${page}`,
          { params: data }
        );
        setDeptList(dataResult.data);
      } catch (error) {
        console.log(error);
      }
    }
  }, [departmentSeq]);

  //사원수 count
  const getCount = useCallback(async () => {
    if (departmentSeq != null) {
      try {
        const dataResult = await axios.get(
          `${baseUrl}/department-employee/count/${departmentSeq}`
        );
        setCountEmployee(dataResult.data);
      } catch (error) {
        console.log(error);
      }
    }
  }, [departmentSeq]);

  //page 받아오기
  const getPage = useCallback(async () => {
    if (departmentSeq != null) {
      try {
        const dataResult = await axios.get(
          `${baseUrl}/department-employee/department/page/${page}?departmentSeq=${departmentSeq}`
        );
        setDeptList(dataResult.data);
      } catch (error) {
        console.log(error);
      }
    }
  }, [page]);

  useEffect(() => {
    getDeptList();
    getCount();
    setPage(1);
    // setCheckedLists(""); //부서가 바뀔때 배열값 초기화
  }, [departmentSeq]);

  useEffect(() => {
    getPage();
  }, [page]);

  for (
    let number = 1 + (active - 1) * 5;
    number <= 5 + (active - 1) * 5;
    number++
  ) {
    if (number <= Math.ceil(countEmployee / 5))
      items.push(
        <Pagination.Item
          key={number}
          active={number === page}
          onClick={() => pageActive(number)}>
          {number}
        </Pagination.Item>
      );
  }
  const paginationBasic = (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Pagination className="authPagi" size="sm">
        <Pagination.Prev onClick={() => prevPage(page)} />
        {items}
        <Pagination.Next onClick={() => nextPage(page)} />
      </Pagination>
    </div>
  );

  function prevPage(e) {
    if (e <= 1) {
      alert("첫 페이지 입니다.");
    } else {
      setPage(page - 1);
    }
  }
  function nextPage(e) {
    if (e >= Math.ceil(countEmployee / 5)) {
      alert("마지막 페이지 입니다.");
    } else {
      setPage(page + 1);
    }
  }
  function pageActive(e) {
    setPage(e);
    axios({
      type: "get",
      url: `${baseUrl}/department-employee/department/page/${page}?departmentSeq=${departmentSeq}`,
    })
      .then((res) => {
        setDeptList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //전체 클릭시 발생하는 함수
  const onCheckedAll = useCallback(
    (checked) => {
      if (checked) {
        const temp = [];

        deptList.forEach((list) => temp.push(list));
        var merged = checkedList.concat(temp);
        var unique = merged.filter((item, pos) => merged.indexOf(item) === pos);
        setCheckedLists(unique);
      } else {
        setCheckedLists([]);
      }
    },
    [deptList]
  );

  //개별 클릭시 발생하는 함수
  const onCheckedElement = useCallback(
    async (checked, list) => {
      try {
        if (checked) {
          setCheckedLists([...checkedList, list]);
        } else {
          setCheckedLists(checkedList.filter((el) => el !== list));
        }
      } catch (error) {
        console.log(error);
      }
    },
    [checkedList]
  );

  //check된 값 저장 배열
  useEffect(() => {}, [checkedList]);
  useEffect(() => {}, [onCheckedAll]);
  useEffect(() => {}, [onCheckedElement]);

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
                      key={0}
                      type="checkbox"
                      readOnly
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
                {deptList.map((deptList) => (
                  <tr key={deptList.employeeSeq}>
                    <td>
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          onChange={(e) =>
                            onCheckedElement(e.target.checked, deptList)
                          }
                          checked={
                            checkedList.includes(deptList) ? true : false
                          }
                          className="custom-control-input"
                          id="customCheck2"></input>
                        <label
                          className="custom-control-label"
                          htmlFor="customCheck1"></label>
                      </div>
                    </td>
                    <td>{deptList.companyName}</td>
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
      {paginationBasic}
    </div>
  );
};
export default AllEmployeeList;
