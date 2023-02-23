import React, { useEffect, useState, useCallback } from "react";
import { Table, Row } from "react-bootstrap";
import axios from "axios";
import DepartmentTree from "./DepartmentTree";
const AuthEmployeeList = (props) => {
  const baseUrl = "http://localhost:8080";
  const [authSeq, setAuthSeq] = useState(null);
  const [resList, setResList] = useState([]);
  const [pointCompanySeq, setPointCompanySeq] = useState(null);
  const [insertComplete, setInsertComplete] = useState(false);
  const [deleteComplete, setDeleteComplete] = useState(false);

  useEffect(() => {
    setAuthSeq(props.authSeq);
    setPointCompanySeq(props.pointCompanySeq);
    setInsertComplete(props.insertComplete);
    setDeleteComplete(props.deleteComplete);
  }, [props]);
  useEffect(() => {
    setInsertComplete(false);
  }, [insertComplete]);
  useEffect(() => {
    setDeleteComplete(false);
  }, [deleteComplete]);

  const authEmployeeApiList = useCallback(async () => {
    let sendData = {
      authSeq: authSeq,
      companySeq: pointCompanySeq,
    };
    try {
      if (authSeq != null && pointCompanySeq != null) {
        const searchEmployeeApiList = await axios.get(
          `${baseUrl}/auth-employee/auth`,
          {
            params: sendData,
            headers: {
              Authorization: window.sessionStorage.getItem("empInfo"),
            },
          }
        );
        setResList(searchEmployeeApiList.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [authSeq, deleteComplete, insertComplete]);

  useEffect(() => {
    authEmployeeApiList();
  }, [authSeq, pointCompanySeq, deleteComplete, insertComplete]);

  return (
    <>
      <Row>
        <Table striped bordered hover style={tableCss}>
          <thead>
            <tr>
              <th style={tableColum2}>조직정보</th>
              <th style={tableColum3}>직급/직책</th>
              <th style={tableColum3}>이름(ID)</th>
            </tr>
          </thead>
          <tbody>
            {resList &&
              resList.map((eList) => (
                <tr key={eList.employeeSeq} id={eList.employeeSeq}>
                  <td
                    className="authEmployeeList"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    {eList.companyName}&gt;{eList.workplaceName}
                    <DepartmentTree departmentSeq={eList.departmentSeq} />
                  </td>
                  <td>
                    {eList.position}&#47;{eList.duty}
                  </td>
                  <td>
                    {eList.employeeName}
                    &nbsp; &#40;&nbsp;{eList.employeeId}
                    &nbsp;&#41;
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Row>
    </>
  );
};

export default AuthEmployeeList;

const tableCss = {
  width: "100%",
  textAlign: "center",
  fontSize: "12px",
  margin: "0 auto",
  padding: "0",
};
const tableColum1 = {
  width: "2.5%",
  heigh: "20px",
  margin: "0 auto",
  padding: "0",
};
const tableColum2 = {
  width: "60%",
  heigh: "30px",
  margin: "0 auto",
  padding: "0",
};
const tableColum3 = {
  width: "20%",
  heigh: "30px",
  margin: "0 auto",
  padding: "0",
};
