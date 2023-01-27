import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import "./AuthGroup.css";
import { TreeView, TreeItem } from "@mui/lab";
import { MergeRounded } from "@mui/icons-material";
import { merge } from "lodash";

const SubMenuGroup = (props) => {
  const baseUrl = "http://localhost:8080";

  const [depth, setDepth] = useState(0);
  const [parentSeq, setParentSeq] = useState(0);
  const [childList, setChildList] = useState([]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    setDepth(props.depth + 1);
    setParentSeq(props.parentSeq);
  }, [props]);

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
      setCount(childRes.data);
    } catch (error) {
      console.log(error);
    }
  }, [depth, parentSeq]);

  const callChild = useCallback(async () => {
    if (count > 0) {
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
  }, [count]);

  useEffect(() => {
    countChild();
    // eslint-disable-next-line
  }, [depth, parentSeq]);

  useEffect(() => {
    callChild();
    // eslint-disable-next-line
  }, [count]);

  //더미값 보내기
  const sendDummySeq = async (e) => {
    const temp = [];
    childList.forEach((list) => {
      if (list.menuSeq == e.target.value) {
        temp.push(list);
      }
    });
    props.sendDummySeq(temp);
  };
  return (
    <>
      {childList &&
        childList.map((childItem) => (
          <div
            key={childItem.menuSeq}
            style={{ display: "flex", alignItems: "flex-start" }}
          >
            <input
              type={"checkbox"}
              style={{ marginTop: "5px" }}
              name={childItem.menuCode}
              value={childItem.menuSeq}
              id={childItem.menuSeq.toString()}
              onChange={sendDummySeq}
            />
            <TreeItem
              key={childItem.menuSeq}
              nodeId={childItem.menuSeq.toString()}
              label={childItem.menuName}
            >
              <SubMenuGroup
                parentSeq={childItem.menuSeq}
                depth={childItem.menuDepth}
                id={childItem.id}
                sendDummySeq={sendDummySeq}
              />
            </TreeItem>
          </div>
        ))}
    </>
  );
};

export default React.memo(SubMenuGroup);
