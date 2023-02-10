import axios from "axios";
import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
function CompanyList(props) {
  const baseUrl = "http://localhost:8080";
  const [company, setCompany] = useState();
  useEffect(() => {
    axios
      .get(`${baseUrl}/company/info`)
      .then((res) => setCompany(res.data))
      .catch((error) => console.log(error));
  }, [props.refresh]);

  useEffect(() => {
    setCompany(props.searchData);
  }, [props.searchData]);

  useEffect(() => {}, [company, props.refresh]);

  return (
    company && (
      <>
        <div className="companylistbox">
          <div className="companylistboxheader">
            <b>회사</b> <b className="emphasisfont">{company.length}</b>{" "}
            <b>건</b>
          </div>
          <ul>
            {
              <Listcompany
                company={company}
                setDetailFlag={props.setDetailFlag}
                setCompanySeq={props.setCompanySeq}
              />
            }
          </ul>
        </div>
      </>
    )
  );
}

function Listcompany(props) {
  const [companyIndex, setCompanyIndex] = useState();

  return (
    props.company && (
      <>
        {props.company.map((company, idx) => {
          return (
            <div
              className={
                `${companyIndex}` === `${idx}`
                  ? "box active"
                  : "box companylistmenu"
              }
              onClick={() => {
                props.setCompanySeq(company.companySeq);
                props.setDetailFlag(true);
              }}
              key={company.companySeq}
            >
              <li
                style={{
                  width: "95%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                }}
              >
                <Row>
                  <Col xs={7}>
                    <p
                      style={{
                        margin: "0",
                        padding: "0",
                        fontSize: "13px",
                        color: "#868E96",
                      }}
                    >
                      {company.companyCode}
                    </p>
                    <p style={companyListP}>{company.companyName}</p>
                  </Col>
                  <Col
                    xs={5}
                    style={{
                      textAlign: "right",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                    }}
                  >
                    <p style={{ margin: "0", padding: "0", fontSize: "15px" }}>
                      {company.companyPresident}
                    </p>
                    <p className={company.pcBuisness} style={companyListP}>
                      {company.pcBuisness}
                    </p>
                  </Col>
                </Row>
              </li>
            </div>
          );
        })}
      </>
    )
  );
}

export default CompanyList;

const companyListP = {
  margin: "0",
  padding: "0",
};
