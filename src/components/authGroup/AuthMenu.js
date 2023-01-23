import React, { useState, useEffect } from "react";
import axios from "axios";
import SubMenuGroup from "./SubMenuGroup";
import "./AuthGroup.css";
import { TreeView, TreeItem } from "@mui/lab";
import { ReactComponent as Folder } from "../authGroup/folder.svg";

const AuthMenu = () => {
  const baseUrl = "http://localhost:8080";
  const [menuList, setMenuList] = useState([]);

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

  return (
    <div style={{ border: "1px solid #f3f3f3" }}>
      <TreeView
        className="check"
        aria-label="file system navigator"
        defaultCollapseIcon={<Folder />}
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
                name="checkVal"
                value={menuItem.menuSeq}
                id={menuItem.menuCode}
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
