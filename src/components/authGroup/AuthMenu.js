import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import SubMenuGroup from "./SubMenuGroup";
import "./AuthGroup.css";
import { TreeView, TreeItem } from "@mui/lab";
import { ReactComponent as Folder } from "../authGroup/folder.svg";
import { ReactComponent as FolderOpen } from "../authGroup/folderopen.svg";
import { set } from "lodash";

const AuthMenu = (props) => {
  const baseUrl = "http://localhost:8080";
  const [menuList, setMenuList] = useState([]);
  const [checkedList, setCheckedList] = useState([]); //값 저장
  const [originList, setOriginList] = useState([]); //값 저장
  const [dummy, setDummy] = useState([]);
  const [authSeq, setAuthSeq] = useState(null);
  const [sendList, setSendList] = useState([]);
  const [insertList, setInsertList] = useState(null);
  const [deleteList, setDeleteList] = useState(null);
  const [selectCompanySeq, setSelectCompanySeq] = useState(null);
  const [pointCompanySeq, setPointCompanySeq] = useState(null);

  useEffect(() => {
    setAuthSeq(props.authSeq);
    setPointCompanySeq(props.pointCompanySeq);
    setSelectCompanySeq(props.selectCompanySeq);
  }, [props]);

  // 기존 db의 권한-메뉴 값 불러오기
  const originLoad = useCallback(async () => {
    if (authSeq != null) {
      try {
        let originRes = await axios.get(`${baseUrl}/auth-menu/${authSeq}`);
        setOriginList(originRes.data);
      } catch (error) {
        console.log(error);
      }
    }
  }, [authSeq]);

  useEffect(() => {
    setCheckedList(originList);
  }, [originList]);

  // 메뉴 권한 db 호출
  useEffect(() => {
    originLoad();
  }, [authSeq]);

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

  // 전체 메뉴리스트 호출
  useEffect(() => {
    getAllMenuList();
  }, [checkedList]);

  useEffect(() => {}, [menuList]);

  // 자식으로 값보내고 받기
  const sendDummySeq = (list, checked) => {
    onCheckedElement(checked, { menuSeq: list[0].menuSeq, authSeq: authSeq });
  };

  // 해당 메뉴값 찾기
  const setAuthDummyMenu = (e) => {
    const temp = [];
    menuList.forEach((list) => {
      if (list.menuSeq == e.target.value) {
        temp.push({ menuSeq: list.menuSeq, authSeq: authSeq });
      }
    });
    onCheckedElement(e.target.checked, temp[0]);
  };

  //개별 클릭시 발생하는 함수
  const onCheckedElement = useCallback(
    async (checked, list) => {
      try {
        if (checked) {
          setCheckedList([...checkedList, list]);
        } else {
          setCheckedList(
            checkedList.filter((el) => el.menuSeq !== list.menuSeq)
          );
        }
      } catch (error) {
        console.log(error);
      }
    },
    [checkedList]
  );

  //check된 값 저장 배열
  useEffect(() => {}, [checkedList]);
  useEffect(() => {}, [onCheckedElement]);
  return (
    <div style={{ border: "1px solid #f3f3f3" }}>
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
                onChange={setAuthDummyMenu}
                checked={(() => {
                  let tempList = checkedList.filter(
                    (data) => data.menuSeq === menuItem.menuSeq
                  );
                  if (tempList.length > 0) {
                    return true;
                  } else {
                    return false;
                  }
                })()}
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
                  checkedList={checkedList}
                />
              </TreeItem>
            </div>
          ))}
      </TreeView>
    </div>
  );
};
export default React.memo(AuthMenu);
