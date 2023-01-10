import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import { BsTelephonePlus } from "react-icons/bs";
import { BsFillFileEarmarkPersonFill } from "react-icons/bs";

const EmployeeList = (props) => {
  const [companySeq, setCompanySeq] = useState(2);
  const baseUrl = "http://localhost:8080";
  const [departmentSeq, setDepartmentSeq] = useState();
  const [workplaceSeq, setWorkplaceSeq] = useState();
  const [deptList, setDeptList] = useState([]);
  const [page, setPage] = useState(1);

  //employeeList 함수
  function ListPage() {
    if (departmentSeq == null) {
      return;
    } else {
      //부서값에 해당되는 직원 list로 출력
      axios({
        type: "get",
        url: `${baseUrl}/department-employee/page/${page}?companySeq=${companySeq}&workplaceSeq=${workplaceSeq}&departmentSeq=${departmentSeq}`,
      })
        .then((res) => {
          // console.log(res.data);
          setDeptList(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  //기본값 가져오기
  useEffect(() => {
    if (departmentSeq == null) {
      return;
    } else {
      axios({
        type: "get",
        url: `${baseUrl}/department-employee/page/${page}?companySeq=${companySeq}&workplaceSeq=${workplaceSeq}&departmentSeq=${departmentSeq}`,
      })
        .then((res) => {
          // console.log(res.data);
          setDeptList(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });

  //mdoal에서 값받아서 넣기
  useEffect(() => {
    setDepartmentSeq(props.departmentSeq);
    setWorkplaceSeq(props.workplaceSeq);
    // console.log("workplaceSeq:" + workplaceSeq);
    // console.log("departmentSeq:" + departmentSeq);
  }, [props]);

  //departmentseq가 업데이트될때마다 listpage실행
  useEffect(() => {
    setPage(1);
    // console.log("page:" + page);
  }, [departmentSeq]);

  //페이지 처리
  useEffect(() => {
    ListPage();
  }, [page]);
  // console.log(page);

  return (
    <div>
      {deptList &&
        deptList.map((deptList, i) => {
          return (
            <div key={i}>
              <Container>
                <Row>
                  <Col sm={3} className="image">
                    {" "}
                    <div style={{ padding: "25px" }}>
                      {" "}
                      <BsFillFileEarmarkPersonFill size="70" />
                    </div>
                  </Col>
                  <Col sm={9}>
                    <Row className="name">
                      {deptList.employeeName} | {deptList.employeeId}
                    </Row>
                    <Row className="stage">
                      부서번호 : {deptList.workplaceSeq}
                    </Row>
                    <Row className="phnum">
                      <div style={{ width: "35px" }}>
                        <BsTelephonePlus />
                      </div>
                      {deptList.employeePh}{" "}
                    </Row>
                  </Col>
                </Row>
                <hr />
              </Container>
            </div>
          );
        })}
      <button
        className="btn"
        onClick={() => {
          // console.log("바뀐값" + page);
          setPage(page + 1);
          // console.log(page);
        }}>
        ˅
      </button>
    </div>
  );
};

// ListPage();

export default EmployeeList;
