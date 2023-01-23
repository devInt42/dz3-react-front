import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { Accordion } from "react-bootstrap";
const SubMenuGroup = (props) => {
  const baseUrl = "http://localhost:8080";

  const [depth, setDepth] = useState(0);
  const [parentSeq, setParentSeq] = useState(0);
  const [childList, setChildList] = useState();
  const [flag, setFlag] = useState(0);
  useEffect(() => {
    setDepth(props.depth + 1);
    setParentSeq(props.parentSeq);
  }, []);

  // 가져올 값이 있는지 확인
  const countChild = useCallback(async () => {
    let sendChild = {
      menuDepth: depth,
      menuParent: parentSeq,
    };
    try {
      let childRes = await axios.get(`${baseUrl}/menu/count`, {
        params: sendChild,
      });
      setFlag(childRes.data);
    } catch (error) {
      console.log(error);
    }
  }, [depth, parentSeq]);

  const callChild = useCallback(async () => {
    if (flag > 0) {
      let sendChild = {
        menuDepth: depth,
        menuParent: parentSeq,
      };
      try {
        let childRes = await axios.get(`${baseUrl}/menu/tree`, {
          params: sendChild,
        });
        setChildList(childRes.data);
      } catch (error) {
        console.log(error);
      }
    }
  }, [flag]);

  useEffect(() => {
    countChild();
  }, [depth, parentSeq]);

  useEffect(() => {
    callChild();
  }, [flag]);

  return (
    <Accordion alwaysOpen>
      {childList &&
        childList.map((childList) => (
          <Accordion.Item key={childList.menuSeq} eventKey={childList.menuSeq}>
            <Accordion.Header>{childList.menuName}</Accordion.Header>
            <Accordion.Body>
              <SubMenuGroup
                parentSeq={childList.menuSeq}
                depth={childList.menuDepth}
              />
            </Accordion.Body>
          </Accordion.Item>
        ))}
    </Accordion>
  );
};

export default SubMenuGroup;
