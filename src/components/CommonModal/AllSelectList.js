import { useCallback, useEffect, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { RxPerson } from "react-icons/rx";
const AllSelectList = (props) => {
  const [checkItem, setCheckItem] = useState([]);
  const [checkSeq, setCheckSeq] = useState();

  //modal에서 값 받아오기
  useEffect(() => {
    async function getEmplName() {
      if (props.checkItem) {
        try {
          const result = JSON.parse(props.checkItem);
          setCheckItem(result);
        } catch (error) {
          console.error("Invalid JSON input:", props.checkItem);
        }
      }
    }
    getEmplName();
  }, [props.checkItem]);

  const checklength = useCallback(async () => {
    props.sendCheckLength(checkItem.length);
  }, [checkItem]);

  useEffect(() => {
    checklength();
  }, [checkItem]);

  const checkEmplSeq = (e) => {
    setCheckSeq(e);
  };

  useEffect(() => {
    props.sendDeleteELement(checkSeq);
  }, [checkSeq]);

  return (
    <Container
      className="AllSelectSpace"
      style={{ display: "flex", flexWrap: "wrap", overflow: "auto" }}
    >
      {checkItem &&
        checkItem.map((list, i) => (
          <Row style={{ width: "30%", marginRight: "25px" }}>
            <Col
              onClick={() => {
                checkEmplSeq(list.employeeSeq);
              }}
              style={{
                display: "flex",
                border: "1px solid #00aaff",
                height: "35px",
                alignItems: "center",
                justifyContent: "center",
                margin: "10px",
                cursor: "pointer",
              }}
            >
              <Col>
                <RxPerson />
              </Col>
              <Col xs={8} style={{ fontSize: "12px" }}>
                {list.employeeName}&#40;
                {list.employeeId}&#41;
              </Col>
              <Col xs={2}>X</Col>
            </Col>
          </Row>
        ))}
    </Container>
  );
};
export default AllSelectList;
