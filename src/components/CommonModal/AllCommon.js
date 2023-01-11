import { Row, Col } from "react-bootstrap";
import AllCompanyList from "./AllCompanyList";
import CheckBox from "./CheckBox";
import { useEffect, useState } from "react";

const AllCommon = (props) => {
  const [departmentSeq, setDepartmentSeq] = useState();

  //함수 보냄
  const sendDepartmentSeq = (i) => {
    setDepartmentSeq(i);
  };

  //바뀔때마다 랜더링
  useEffect(() => {
    console.log(departmentSeq);
  }, [departmentSeq]);

  return (
    <div>
      <Row>
        <Col sm={3}>
          <select className="form-select" aria-label="Default select example">
            <option>사원명(ID)</option>
            <option value="1">TEST</option>
            <option value="2">TEST</option>
            <option value="3">TEST</option>
          </select>
        </Col>
        <Col sm={9}>
          <div className="mb-3">
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              placeholder="검색어를 입력하세요."
              rows="1"></textarea>
          </div>
        </Col>
      </Row>

      <Row>
        <Col sm={5} className="companyList">
          <AllCompanyList sendDepartmentSeq={sendDepartmentSeq} />
        </Col>
        <Col sm={7}>
          <Row className="checkbox">
            <CheckBox departmentSeq={departmentSeq} />
          </Row>
          <Row>• 선택목록</Row>
          <Row className="choiceEmp">3</Row>
        </Col>
      </Row>
    </div>
  );
};

export default AllCommon;
