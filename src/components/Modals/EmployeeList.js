import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Row, Col, Pagination } from "react-bootstrap";
import { BsTelephonePlus, BsFillFileEarmarkPersonFill } from "react-icons/bs";
import { json } from "react-router-dom";

const EmployeeList = (props) => {
  const [companySeq, setCompanySeq] = useState(2);
  const baseUrl = "http://localhost:8080";
  const [departmentSeq, setDepartmentSeq] = useState();
  const [workplaceSeq, setWorkplaceSeq] = useState();
  const [deptList, setDeptList] = useState([]);
  const [employeeSeq, setEmployeeSeq] = useState();

  const [page, setPage] = useState(1); // 현재 페이지
  const [countEmployee, setCountEmployee] = useState(null); // 총 사원수
  const [active, setActive] = useState(1); // 현재 페이지수
  let items = []; // 페이지 숫자 저장 < 1 2 3 4 5 >

  //modal.js로 값이동
  useEffect(() => {
    props.sendEmployeeSeq(employeeSeq);
  }, [employeeSeq]);

  function sendEmployeeSeq(a) {
    setEmployeeSeq(a);
  }

  //modal에서 값받아서 넣기
  useEffect(() => {
    async function getDeptSeq() {
      const result = await props.departmentSeq;
      console.log("props deptSeq: " + props.departmentSeq);
      setDepartmentSeq(result);
    }
    getDeptSeq();
  }, [props]);

  useEffect(() => {
    async function getWorkSeq() {
      const result = await props.workplaceSeq;
      console.log("props workSeq: " + props.workplaceSeq);
      setWorkplaceSeq(result);
    }
    getWorkSeq();
  }, [props]);

  //해당 직원리스트
  const getAllDept = useCallback(async () => {
    let deptData = {
      companySeq: companySeq,
      workplaceSeq: workplaceSeq,
      departmentSeq: departmentSeq,
    };
    try {
      const getAllDeptResult = await axios.get(
        `${baseUrl}/department-employee/page/${page}?companySeq=${companySeq}&workplaceSeq=${workplaceSeq}&departmentSeq=${departmentSeq}`,
        { params: deptData }
      );
      setDeptList(getAllDeptResult.data);
    } catch (error) {
      console.log(error);
    }
  }, [departmentSeq]);

  const getEmplCount = useCallback(async () => {
    let emplData = {
      departmentSeq,
    };
    try {
      const getEmplCountResult = await axios.get(
        `${baseUrl}/department-employee/count/${departmentSeq}`,
        { params: emplData }
      );
      setCountEmployee(getEmplCountResult.data);
    } catch (error) {
      console.log(error);
    }
  }, [departmentSeq]);

  const getPage = useCallback(async () => {
    let pageData = {
      companySeq: companySeq,
      workplaceSeq: workplaceSeq,
      departmentSeq: departmentSeq,
      page: page,
    };
    try {
      const getPageResult = await axios.get(
        `${baseUrl}/department-employee/page/${page}?companySeq=${companySeq}&workplaceSeq=${workplaceSeq}&departmentSeq=${departmentSeq}`,
        { params: pageData }
      );
      setDeptList(getPageResult.data);
    } catch (error) {
      console.log(error);
    }
  }, [page]);

  useEffect(() => {
    if (!workplaceSeq == null) {
      setPage(1);
      getAllDept();
      getEmplCount();
      getPage();
    }
  }, []);

  for (
    let number = 1 + (active - 1) * 3;
    number <= 3 + (active - 1) * 3;
    number++
  ) {
    if (number <= Math.ceil(countEmployee / 3))
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
    if (e >= Math.ceil(countEmployee / 3)) {
      alert("마지막 페이지 입니다.");
    } else {
      setPage(page + 1);
    }
  }
  function pageActive(e) {
    setPage(e);
    axios({
      type: "get",
      url: `${baseUrl}/department-employee/page/${page}?companySeq=${companySeq}&workplaceSeq=${workplaceSeq}&departmentSeq=${departmentSeq}`,
    })
      .then((res) => {
        setDeptList(res.data);
        // console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div>
      {deptList &&
        deptList.map((dList) => (
          <Row
            key={dList.employeeSeq}
            onClick={() => {
              sendEmployeeSeq(dList.employeeSeq);
            }}>
            <Col sm={3} className="image">
              {" "}
              <div style={{ padding: "25px" }}>
                {" "}
                <BsFillFileEarmarkPersonFill size="70" />
              </div>
            </Col>
            <Col sm={9}>
              <Row className="Searchname">
                {dList.employeeName} | {dList.employeeId}
              </Row>
              <Row className="Searchstage">부서번호 : {dList.workplaceSeq}</Row>
              <Row className="Searchphnum">
                <div style={{ width: "35px" }}>
                  <BsTelephonePlus />
                </div>
                {dList.employeePh}
              </Row>
            </Col>
            <hr className="Searchhr" />
          </Row>
        ))}

      {paginationBasic}
    </div>
  );
};

export default EmployeeList;
