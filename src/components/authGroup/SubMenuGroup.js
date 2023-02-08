import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import "./AuthGroup.css";
import { TreeItem } from "@mui/lab";

const SubMenuGroup = (props) => {
  const baseUrl = "http://localhost:8080";

  const [depth, setDepth] = useState(0);
  const [parentSeq, setParentSeq] = useState(0);
  const [childList, setChildList] = useState([]);
  const [count, setCount] = useState(0);
  const [checkedList, setCheckedList] = useState([]);
  const [propsCheck, setPropsCheck] = useState(false);
  useEffect(() => {
    setDepth(props.depth + 1);
    setParentSeq(props.parentSeq);
    setCheckedList(props.checkedList);
    setPropsCheck(props.checked);
  }, [props]);

  //더미값 보내기
  const setTempList = async (e) => {
    const temp = [];
    childList.forEach((list) => {
      if (list.menuSeq == e.target.value) {
        temp.push(list);
      }
    });
    props.sendDummySeq(temp, e.target.checked);
  };

  // 부모 선택됐을경우
  useEffect(() => {
    const temp = [];
    if (propsCheck === true) {
      childList.forEach((list) => {
        temp.push(list);
        props.sendChildListSeq(temp, true);
      });
    }
  }, [propsCheck]);

  // 자식 전체체크
  const sendChildListSeq = (list, checked) => {
    props.sendChildListSeq(list, true);
  };
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
  const sendDummySeq = async (list, checked) => {
    props.sendDummySeq(list, checked);
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
              onChange={setTempList}
              checked={(() => {
                let tempList = checkedList.filter(
                  (data) => data.menuSeq === childItem.menuSeq
                );
                if (tempList.length > 0) {
                  return true;
                } else {
                  return false;
                }
              })()}
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
                sendChildListSeq={sendChildListSeq}
                checkedList={checkedList}
                checked={(() => {
                  let tempList = checkedList.filter(
                    (data) => data.menuSeq === childItem.menuSeq
                  );
                  if (tempList.length > 0) {
                    return true;
                  } else {
                    return false;
                  }
                })()}
              />
            </TreeItem>
          </div>
        ))}
    </>
  );
};

export default React.memo(SubMenuGroup);
