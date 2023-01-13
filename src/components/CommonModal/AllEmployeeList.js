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
  const [workplaceSeq, setWorkplaceSeq] = useState();
  let items = []; // 페이지 숫자 저장 < 1 2 3 4 5 >

  //전체 선택시 데이터의 모든 아이템을 받은 배열로 checkList 생성
  //전체 선택 해제시 값을 비워준다.
  // const [checkedList, setCheckedList] = useState(); //페이지별 체크된 리스트
  const [checkItems, setCheckItems] = useState([]); //페이지 상관없이 체크한 아이템
  const [checkItemsPage, setCheckItemsPage] = useState(); //페이지에서 체크한 아이템 (전체선택)
  const [users, setUsers] = useState([]); //페이지 별 전체 유저
  const [selectableUsers, setSelectableUsers] = useState([]); //페이지에서 선택한 유저

  const funUserList = () => {
    let params = {
      page: page,
    };

    checkItems(params).then((res) => {
      if (res.statusCode === 10000) {
        const result = res.data;
        setUsers(result);
        //선택 가능한 유저
        const userable = result.filter((user) => user.PARTICIPANT_YN == "N");
        let ableList = userable.map((i) => i.employeeSeq);
        setSelectableUsers(userable);

        //페이지별 체크 리스트 생성
        let temp = [];
        if (checkItems.length > 0) {
          temp = checkItems.filter((item) => ableList.includes(item));
        }
        setCheckItemsPage(temp);
      }
    });
  };

  //전체 선택시
  const checkedAll = (checked) => {
    if (checked) {
      const temp = []; //비어져있는 값
      selectableUsers?.forEach((user) => {
        temp.push(user.employeeSeq);
      });

      deptList.forEach((list) => temp.push(list)); //페이지에 해당하는 리스트를 넣음
      setCheckItems(temp); //전체 선택한 값 넣음

      // console.log(checkedList);
      //기존 배열 + 추가배열 합치기

      var merged = checkItems.concat(temp); //원래있는 checkItems에 temp(전체선택)값을 더해줌
      var unique = merged.filter((item, pos) => merged.indexOf(item) === pos); //중복제거
      setCheckItems(unique); //중복제거된 배열 합
      console.log("aa" + checkItems);
      setCheckItemsPage([]); //페이지에서 선택된 값 비워줌
    } else {
      //전체 선택 해제시 checkItem을 빈 배열로 업데이트
      setCheckItems(
        checkItems.filter((item) => !checkItemsPage.includes(item))
      );
      setCheckItemsPage([]); //페이지에서 선택된 값 비워줌
    }
  };

  //개별 선택시

  const checkedElement = (checked, id) => {
    if (checked) {
      setCheckItems((prev) => [...prev, id]); // 단일 선택 시 체크된 아이템을 배열에 추가
      setCheckItemsPage((prev) => [...prev, id]); //페이지에서 체크한 아이템
    } else {
      //개별 선택 해제시 체크된 아이템을 제외한 배열을 저장
      setCheckItems(checkItems.filter((item) => item !== id));
      setCheckItemsPage(checkItemsPage.filter((item) => item !== id));
    }
  };
  // const onCheckedElement = useCallback(
  //   (checked, list) => {
  //     if (checked) {
  //       setCheckedLists([...checkedList, list]);
  //     } else {
  //       setCheckedLists(checkedList.filter((el) => el !== list));
  //     }
  //   },
  //   [checkedList]
  // );

  // useEffect(() => {}, [onCheckedAll]);
  // useEffect(() => {}, [onCheckedElement]);

  // console.log(checkedList);
  // console.log(JSON.stringify(deptList));
  // CommonModal로 checkedList값 전송

  useEffect(() => {}, [workplaceSeq]);

  //값 받아서 departmentSeq 설정
  useEffect(() => {
    setDepartmentSeq(props.departmentSeq);
  }, [props]);

  useEffect(() => {
    setPage(1);
    if (departmentSeq != null) {
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

      axios({
        type: "get",
        url: `${baseUrl}/department-employee/count/${departmentSeq}`,
      })
        .then((res2) => {
          setCountEmployee(res2.data);
          // console.log(countEmployee);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      return;
    }
  }, [departmentSeq]);

  useEffect(() => {
    if (departmentSeq != null) {
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
        // console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  console.log("checkItems" + JSON.stringify(checkItems));
  // console.log("checkItemsPage" + checkItemsPage);
  // console.log("users" + users);
  // console.log("selectableUsers" + selectableUsers);

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
                      id="customCheck2"
                      type="checkbox"
                      className="custom-control-input"
                      name="chkAll"
                      onChange={(e) => checkedAll(e.target.checked)}
                      // 데이터 개수와 체크된 아이템의 개수가 다를 경우 선택 해제 (하나라도 해제 시 선택 해제)
                      checked={
                        users?.length == 0
                          ? false
                          : checkItemsPage.length === selectableUsers.length
                          ? true
                          : false
                      }
                    />
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
                          // readOnly
                          // onClick={() => {
                          //   sendCheckedList(deptList.employeeName);
                          // }}
                          // onChange={(e) =>
                          //   onCheckedElement(e.target.checked, deptList)
                          // }
                          // checked={
                          //   checkedList.includes(deptList) ? true : false
                          // }
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
