import axios from "axios";
import React, { useEffect, useState } from "react";
import "./AuthGroup.css";
import { TreeView, TreeItem } from "@mui/lab";
import { ReactComponent as Folder } from "../authGroup/folder.svg";
import { ReactComponent as FolderOpen } from "../authGroup/folderopen.svg";

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
  const countChild = async () => {
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
  };

  const callChild = async () => {
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
  };

  useEffect(() => {
    countChild();
    // eslint-disable-next-line
  }, [depth, parentSeq]);

  useEffect(() => {
    callChild();
    // eslint-disable-next-line
  }, [count]);

  return (
    <>
      {childList &&
        childList.map((childList) => (
          <div
            key={childList.menuSeq}
            style={{ display: "flex", alignItems: "flex-start" }}
          >
            <input
              type={"checkbox"}
              style={{ marginTop: "5px" }}
              name={childList.menuCode}
              value={childList.menuSeq}
              id={props.id}
            />
            <TreeItem
              key={childList.menuSeq}
              nodeId={childList.menuSeq.toString()}
              label={childList.menuName}
            >
              <SubMenuGroup
                parentSeq={childList.menuSeq}
                depth={childList.menuDepth}
                id={props.id}
              />
            </TreeItem>
          </div>
        ))}
    </>
  );
};

export default SubMenuGroup;
