import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
const DepartmentTree = (props) => {
  const baseUrl = "http://localhost:8080";
  const [departmentSeq, setDepartmentSeq] = useState(null);
  const [deptTree, setDeptTree] = useState(null);
  useEffect(() => {
    setDepartmentSeq(props.departmentSeq);
  }, [props]);
  useEffect(() => {
    callDept();
  }, [departmentSeq]);
  const callDept = async () => {
    let data = {
      departmentSeq,
    };
    if (departmentSeq != null) {
      try {
        let treeData = await axios.get(`${baseUrl}/department-employee/tree`, {
          params: data,
        });
        setDeptTree(treeData.data);
      } catch {}
    }
  };
  useEffect(() => {}, [deptTree]);

  return (
    <div style={{ margin: "0", display: "flex" }}>
      {deptTree &&
        deptTree.map((item) => (
          <p style={{ margin: "0" }}>&gt;{item.departmentName}</p>
        ))}
    </div>
  );
};

export default DepartmentTree;
