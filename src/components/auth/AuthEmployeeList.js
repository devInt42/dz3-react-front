import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";

const AuthEmployeeList = (props) => {
  const baseUrl = "http://localhost:8080";
  const [authSeq, setAuthSeq] = useState();
  const [page, setPage] = useState(1);
  const [resList, setResList] = useState([]);
  const [pointCompanySeq, setPointCompanySeq] = useState(null);
  useEffect(() => {
    setAuthSeq(props.authSeq);
    setPointCompanySeq(props.pointCompanySeq);
  }, [props]);

  const authEmployeeApiList = async () => {
    let sendData = {
      authSeq: authSeq,
      companySeq: pointCompanySeq,
    };
    try {
      const searchEmployeeApiList = await axios.get(
        `${baseUrl}/auth-employee/auth/page/${page}`,
        {
          params: sendData,
          headers: {
            Authorization: window.sessionStorage.getItem("empInfo"),
          },
        }
      );
      setResList(searchEmployeeApiList.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    authEmployeeApiList();
  }, [authSeq]);

  return (
    <>
      <Table striped bordered hover style={tableCss}>
        <thead>
          <tr>
            <th style={tableColum1}>
              <input type="checkbox" />
            </th>
            <th style={tableColum2}>조직정보</th>
            <th style={tableColum3}>직급/직책</th>
            <th style={tableColum3}>이름(ID)</th>
          </tr>
        </thead>
        <tbody>
          {resList &&
            resList.map((eList) => (
              <tr key={eList.employeeSeq} id={eList.employeeSeq}>
                <td></td>
                <td className="authEmployeeList">
                  {eList.companyName}&gt;{eList.workplaceName}&gt;
                  {eList.departmentName}
                </td>
                <td>{eList.title}</td>
                <td>
                  {eList.employeeName}
                  &nbsp; &#40;&nbsp;{eList.employeeId}
                  &nbsp;&#41;
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
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
