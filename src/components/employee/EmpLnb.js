import React, { useEffect, useState } from "react";
import axios from "axios";
import { Nav, Form, Container, Row, Col, Pagination } from "react-bootstrap";

function EmpLnb(props) {

    const baseUrl = "http://localhost:8080";
    const [employee, setEmployee] = useState([]);

    useEffect(() => {
        axios
            .get(baseUrl + "/employee/emplist")
            .then((response) => setEmployee(response.data))
            .catch((error) => console.log(error));
    }, []);

    return (
        <>
            <div style={{ fontSize: "15px", textAlign: "center", marginTop: "8px" }}>
                사용자&nbsp;:&nbsp;<span style={{ color: "rgba(9, 132, 247, 0.63)", fontWeight: "bolder" }}>{employee.length}</span>명
            </div><hr />
            <Nav className="authNav" variant="pills" style={navStyle} onClick={props.clickEmp}>
                {employee.map((emp, i) => (
                    <Nav.Item key={i} style={navItemStyle} onClick={() => props.setEmpSeq(emp.employeeSeq)}>
                        <Nav.Link className="authLnb" eventKey={emp.employeeSeq} style={navLinkStyle}>
                            {/* <BsFilePerson style={{width: "40px", height: "40px"}}/> */}
                            <div style={{
                                margin: "5px",
                                textAlign: "right",
                                fontSize: "10px",
                                color: "#868e96",
                                fontWeight: "bold",
                            }}>
                                {emp.employeeBirth}
                            </div>
                            <div style={{
                                margin: "5px",
                                textAlign: "right",
                                fontSize: "13px",
                                fontWeight: "bold",
                            }}>
                                {emp.employeeId}
                                <span>&nbsp;-&nbsp;</span>
                                {emp.employeeName}
                            </div>
                        </Nav.Link>
                    </Nav.Item>
                ))}
            </Nav>
        </>
    );
}

export default EmpLnb;

const authLnbStyle = {
    width: "100%",
    height: "700px",
    float: "left",
    border: "1px solid #efefef",
    backgroundColor: "#f9f9f9",
    justifyContent: "center",
  };
  const navStyle = {
    border: "1px solid #efefef",
    backgroundColor: "#f9f9f9",
    margin: "0 auto",
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    alignItems: "center",
  };
  
  const navItemStyle = {
    width: "100%",
    height: "50px",
  };
  
  const navLinkStyle = {
    width: "100%",
    height: "50px",
    margin: "0 auto",
    marginTop: "3px",
    padding: "0",
  };