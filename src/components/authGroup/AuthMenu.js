import React, { useState, useEffect } from "react";
import axios from "axios";
import SubMenuGroup from "./SubMenuGroup";
import "./AuthGroup.css";
import { TreeView, TreeItem } from "@mui/lab";
import { ReactComponent as Folder } from "../authGroup/folder.svg";
import { ReactComponent as FolderOpen } from "../authGroup/folderopen.svg";

const AuthMenu = () => {
  const baseUrl = "http://localhost:8080";
  const [menuList, setMenuList] = useState([]);
  let checkedList = []; //값 저장

  // 전체 메뉴리스트 호출
  const getAllMenuList = async () => {
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
  };

  useEffect(() => {
    getAllMenuList();
  }, []);

  const changeCheckedList = (e) => {
    if (checkedList.includes(e.target.value)) {
      checkedList.pop(e.target.value);
    } else {
      checkedList.push(e.target.value.toString());
    }
    console.log(checkedList);
  };
  return (
    <div style={{ border: "1px solid #f3f3f3" }}>
      <TreeView
        className="menuTree"
        aria-label="file system navigator"
        defaultCollapseIcon={<FolderOpen />}
        defaultExpandIcon={<Folder />}
        sx={{ flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
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
                name={menuItem.menu}
                value={menuItem.menuSeq}
                id={menuItem.menuSeq.toString()}
                onChange={changeCheckedList}
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
                />
              </TreeItem>
            </div>
          ))}
      </TreeView>
    </div>
  );
};
export default AuthMenu;
