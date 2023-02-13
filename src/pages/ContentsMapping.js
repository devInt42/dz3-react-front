import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function ContentsMapping(props) {
  const navigate = useNavigate();
  const baseUrl = "http://localhost:8080";
  const [mappingURL, setMappingURL] = useState("");

  useEffect(() => {
    axios
      .get(baseUrl + "/menu/menulist/geturl/" + props.lastSeq)
      .then((response) => {
        setMappingURL(response.data);
      })
      .catch((error) => console.log(error));
  }, [props.lastSeq]);
  
  useEffect(() => {
    if (!window.sessionStorage.getItem("empInfo")) {
      alert("로그인 후에 이용해주세요");
      navigate(`/login`);
    } else {
      if (mappingURL == "") {
        navigate(`/dz3/nomenu`);
      } else {
        navigate(`${mappingURL}`);
      }
    }
  }, [mappingURL]);

  // useEffect(()=>{
  //     if(mappingURL == ""){navigate(`/dz3/nomenu`)}
  //     else{navigate(`${mappingURL}`);}
  // }, [mappingURL]);
}

export default ContentsMapping;
