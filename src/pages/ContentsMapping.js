import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

function ContentsMapping(props) {
  console.log("현재 메뉴 시퀀스 : " + props.lastSeq);
  const navigate = useNavigate();

  useEffect(() => {
    if (props.lastSeq == 11) {
      navigate(`/dz3/company/info`);
    } else if (props.lastSeq == 18) {
      navigate(`/dz3/auth`);
    } else if (props.lastSeq == 65) {
      navigate(`/dz3/menuset`);
    } else if (props.lastSeq == 17) {
      navigate(`/dz3/authgroup`);
    } else {
      navigate(`/dz3/nomenu`);
    }
  }, []);
}

export default ContentsMapping;

{
  /* <button onClick={()=> navigate(`/dz3/menuset`)}>set</button>
      <button onClick={()=> navigate(`/dz3/auth`)}>auth</button>
      <button onClick={()=> navigate(`/dz3/company/info`)}>company</button> */
}
