import { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Container } from "react-bootstrap";
import { BsFillFileEarmarkPersonFill } from "react-icons/bs";

const EmployeeDetail = (props) => {
  const [employeeSeq, setEmployeeSeq] = useState();
  const [deptDetail, setDeptDetail] = useState([]);
  const baseUrl = "http://localhost:8080";
  //modal에서 값 받아오기
  useEffect(() => {
    setEmployeeSeq(props.employeeSeq);
  }, [props]);

  useEffect(() => {
    if (employeeSeq != null) {
      DetailPage();
    }
  }, [employeeSeq]);

  function DetailPage() {
    const url = baseUrl + "/employee/emplist/" + employeeSeq;
    axios({
      method: "get",
      url: url,
    }).then((res) => {
      // console.log(res.data)
      setDeptDetail(res.data);
      // console.log(res.data);
    });
  }

  return (
    <div className="SearchDetail">
      <Container>
        <Row>
          <Col sm={9}>
            {" "}
            <BsFillFileEarmarkPersonFill
              size="100"
              style={{ paddingTop: "15px", paddingLeft: "20px" }}
            />
          </Col>
          <Col sm={3}>LOGO</Col>
        </Row>
        <br />

        <Row>
          <span className="Searchcenter">{deptDetail.employeeName}</span>
        </Row>
        <Row>
          {" "}
          <span className="Searchcenter">{deptDetail.employeeId}</span>
        </Row>
        <Row>
          {" "}
          <span className="Searchcenter">{deptDetail.employeeBirth}</span>
        </Row>
        <div>
          <br />
          <ul className="list-group">
            <li className="list-group-item">
              전화번호 : {deptDetail.employeePh}
            </li>
            <li className="list-group-item">
              회사메일 : {deptDetail.employeeCmail}
            </li>
            <li className="list-group-item">
              개인메일 : {deptDetail.employeePmail}
            </li>
          </ul>
        </div>
      </Container>
    </div>
  );
};

export default EmployeeDetail;