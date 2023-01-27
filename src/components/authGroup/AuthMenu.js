import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import SubMenuGroup from "./SubMenuGroup";
import "./AuthGroup.css";
import { TreeView, TreeItem } from "@mui/lab";
import { ReactComponent as Folder } from "../authGroup/folder.svg";
import { ReactComponent as FolderOpen } from "../authGroup/folderopen.svg";

const AuthMenu = () => {
  const baseUrl = "http://localhost:8080";
  const [menuList, setMenuList] = useState([]);
  const [checkedList, setCheckedList] = useState([]); //값 저장
  const [dummy, setDummy] = useState({});
  // 전체 메뉴리스트 호출
  const getAllMenuList = useCallback(async () => {
    let sendData = {
      menuParent: "0",
      menuDepth: "0",
    };
    try {
      let menuRes = await axios.get(`${baseUrl}/menu/tree`, {
        params: sendData,
      });
      setMenuList(menuRes.data);
    } catch (error) {
      console.log(error);
    }
  }, [menuList]);

  // 전체 메뉴리스트 호출
  useEffect(() => {
    getAllMenuList();
  }, []);

  //더미값 보내기
  const sendDummySeq = (e) => {
    console.log("hi");
    console.log(e);
    setDummy(e);
  };

  const sendCheckedList = useCallback(
    (elem) => {
      // let temp = elem[0];
      // setCheckedList(temp);
    },
    [menuList]
  );

  useEffect(() => {
    console.log(dummy);
    sendCheckedList(dummy);
  }, [dummy]);

  useEffect(() => {}, [checkedList]);

  return (
    <div style={{ border: "1px solid #f3f3f3" }}>
      {checkedList}
      <TreeView
        className="menuTree"
        aria-label="file system navigator"
        defaultCollapseIcon={<FolderOpen />}
        defaultExpandIcon={<Folder />}
        sx={{ flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
        defaultExpanded={["1", "2", "3", "4", "5", "6"]}
        multiSelect
      >
        {menuList &&
          menuList.map((menuItem) => (
            <div
              key={menuItem.menuSeq}
              style={{ display: "flex", alignItems: "flex-start" }}
            >
              <input
                type={"checkbox"}
                style={{ marginTop: "5px" }}
                name={menuItem.menuCode}
                value={menuItem.menuSeq}
                id={menuItem.menuSeq.toString()}
                onChange={sendDummySeq}
              />
              <TreeItem
                key={menuItem.menuSeq}
                nodeId={menuItem.menuSeq.toString()}
                label={menuItem.menuName}
                id={menuItem.menuCode}
              >
                <SubMenuGroup
                  parentSeq={menuItem.menuSeq}
                  depth={menuItem.menuDepth}
                  id={menuItem.menuCode}
                  sendDummySeq={sendDummySeq}
                />
              </TreeItem>
            </div>
          ))}
      </TreeView>
    </div>
  );
};
export default React.memo(AuthMenu);
