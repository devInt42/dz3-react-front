import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import { BsTelephonePlus } from "react-icons/bs";
import { BsFillFileEarmarkPersonFill } from "react-icons/bs";

const EmployeeList = (props) => {
  const [companySeq, setCompanySeq] = useState(2);
  const baseUrl = "http://localhost:8080";
  const [departmentSeq, setDepartmentSeq] = useState("");
  const [workplaceSeq, setWorkplaceSeq] = useState("");

  const [page, setPage] = useState(1);
  const [deptList, setDeptList] = useState([]);
  const [employeeSeq, setEmployeeSeq] = useState();
  const [countEmployee, setCountEmployee] = useState();

  //modal.js로 값이동
  useEffect(() => {
    props.sendEmployeeSeq(employeeSeq);
  }, [employeeSeq]);

  function sendEmployeeSeq(a) {
    setEmployeeSeq(a);
  }

  //mdoal에서 값받아서 넣기
  //초기값 + 변경
  useEffect(() => {
    // console.log(props.departmentSeq);
    setDepartmentSeq(props.departmentSeq);
  }, [props]);

  useEffect(() => {
    setWorkplaceSeq(props.workplaceSeq);
  }, [props]);

  useEffect(() => {
    setPage(1);

    if (departmentSeq != null) {
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

      axios({
        type: "get",
        url: `${baseUrl}/department-employee/count/${departmentSeq}`,
      })
        .then((res2) => {
          setCountEmployee(res2.data);
          console.log(countEmployee);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [departmentSeq]);

  useEffect(() => {
    if (departmentSeq != "") {
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
  }, [page]);

  function plusPage() {
    setPage(page + 1);
    // console.log(page);
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
              <Row className="name">
                {dList.employeeName} | {dList.employeeId}
              </Row>
              <Row className="stage">부서번호 : {dList.workplaceSeq}</Row>
              <Row className="phnum">
                <div style={{ width: "35px" }}>
                  <BsTelephonePlus />
                </div>
                {dList.employeePh}
              </Row>
            </Col>
            <hr />
          </Row>
        ))}
      <button
        className="btn"
        onClick={() => {
          plusPage();
        }}>
        ˅
      </button>
    </div>
  );
};

// ListPage();

export default EmployeeList;
