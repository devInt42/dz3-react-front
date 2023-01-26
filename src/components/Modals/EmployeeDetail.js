import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Row, Container } from "react-bootstrap";
import { BsFillFileEarmarkPersonFill } from "react-icons/bs";
import { FaBirthdayCake } from "react-icons/fa";
import { RxPerson } from "react-icons/rx";

const EmployeeDetail = (props) => {
  const [employeeSeq, setEmployeeSeq] = useState();
  const [deptDetail, setDeptDetail] = useState([]);
  const [companyName, setCompanyName] = useState();
  const [loginInfo, setLoginInfo] = useState();
  const baseUrl = "http://localhost:8080";

  //modal에서 값 받아오기
  useEffect(() => {
    async function getEmplSeq() {
      const result = await props.employeeSeq;
      setEmployeeSeq(result);
    }
    getEmplSeq();
  }, [props]);

  useEffect(() => {
    async function getComName() {
      const result = await props.companyName;
      setCompanyName(result);
    }
    getComName();
  }, [props]);

  //직원 상세 페이지
  const getEmplElement = useCallback(async () => {
    let EmplData = {
      employeeSeq: employeeSeq,
    };
    try {
      const EmplDataResult = await axios.get(
        `${baseUrl}/employee/emplist/${employeeSeq}`,
        {
          params: EmplData,
        }
      );
      setDeptDetail(EmplDataResult.data);
    } catch (error) {
      console.log(error);
    }
  }, [employeeSeq]);

  useEffect(() => {
    if (employeeSeq == null) {
    } else {
      getEmplElement();
    }
  }, [employeeSeq]);

  //로그인한 사람 info (시작하자말자 default 값)
  const getLoginInfo = useCallback(async () => {
    try {
      const LoginDataResult = await axios.get(
        `${baseUrl}/department-employee/myInfo`,
        {
          headers: {
            Authorization: window.sessionStorage.getItem("empInfo"),
          },
        }
      );
      setDeptDetail(LoginDataResult.data);
      // console.log(LoginDataResult.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  // console.log(deptDetail);

  //시작하자말자 한번 실행
  useEffect(() => {
    console.log("실행");
    getLoginInfo();
    console.log(deptDetail);
  }, []);

  return (
    <div className="SearchDetail">
      <Container>
        <Row>
          <BsFillFileEarmarkPersonFill
            size="100"
            style={{ paddingTop: "15px", paddingLeft: "20px" }}
          />
        </Row>
        <br />

        <Row>
          <span className="Searchcenter">{deptDetail.employeeName}</span>
        </Row>
        <Row>
          {" "}
          <span className="Searchcenter">
            <RxPerson size="16" /> {deptDetail.employeeId}
          </span>
        </Row>
        <Row>
          {" "}
          <span className="Searchcenter">
            <FaBirthdayCake size="13" /> {deptDetail.employeeBirth}{" "}
          </span>
        </Row>
        <div>
          <br />
          <ul className="list-group">
            <li className="list-group-item">소속회사 : {companyName}</li>
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
