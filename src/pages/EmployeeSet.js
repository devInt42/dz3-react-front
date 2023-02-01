import React, { useEffect, useState } from "react";
import axios from "axios";
import { Nav, Form, Container, Row, Col, Pagination } from "react-bootstrap";

import { GrUserManager } from "react-icons/gr";
import { BsFilePerson } from "react-icons/bs";

import style from "../components/employee/css/EmployeeSet.module.css";
import EmpBasic from "../components/employee/EmpBasic";
import EmpDept from "../components/employee/EmpDept";

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function EmployeeSet() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const baseUrl = "http://localhost:8080";
    const [employee, setEmployee] = useState([]);

    useEffect(() => {
        axios
            .get(baseUrl + "/employee/emplist")
            .then((response) => setEmployee(response.data))
            .catch((error) => console.log(error));
    }, []);

    const [employeeSeq, setEmpSeq] = useState(0);

    return (
        <div>
            <div className={style.wrap}>
                <span style={{ fontSize: "25px" }}>
                    <GrUserManager />
                    &nbsp;상용직관리
                </span><hr />
            </div>
            <Container fluid>
                <Row md="auto" style={{ border: "1px solid black", width: "100%", height: "50px" }}>

                </Row>
                <Row md="auto" style={{ border: "1px solid black" }}>
                    <Col md="auto" style={{ border: "1px solid black", height: "100vh", width: "15%", padding: "0px", overflow: "scroll" }}>
                        <Nav className="authNav" variant="pills" style={navStyle}>
                            {employee.map((emp, i) => (
                                    <Nav.Item key={i} style={navItemStyle} onClick={() => setEmpSeq(emp.employeeSeq)}>
                                        <Nav.Link className="authLnb" eventKey={emp.employeeSeq} style={navLinkStyle}>
                                            {/* <BsFilePerson style={{width: "40px", height: "40px"}}/> */}
                                            <div style={{
                                                margin: "5px",
                                                textAlign: "right",
                                                fontSize: "10px",
                                                color: "#868e96",
                                                fontWeight: "bold",}}>
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
                        {/* {employee.map((emp, i) => {
                            return (
                                <div key={i} onClick={() => { setEmpSeq(emp.employeeSeq) }}>
                                    <div>{emp.employeeName}</div>
                                    <div>{emp.employeeId}</div>
                                    <div>{emp.employeeBirth}</div><hr />
                                </div>
                            )
                        })} */}
                    </Col>
                    <Col md="auto" style={{ border: "1px solid black", height: "100vh", width: "85%" }}>
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                    <Tab label="기본정보" {...a11yProps(0)} />
                                    <Tab label="조직정보" {...a11yProps(1)} />

                                </Tabs>
                            </Box>
                            <TabPanel value={value} index={0}>
                                <EmpBasic employeeSeq={employeeSeq} />
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <EmpDept />
                            </TabPanel>
                        </Box>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default EmployeeSet;

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

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