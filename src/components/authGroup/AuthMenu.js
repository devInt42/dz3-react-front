import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import SubMenuGroup from "./SubMenuGroup";
import "./AuthGroup.css";
import { TreeView, TreeItem } from "@mui/lab";
import { ReactComponent as Folder } from "../authGroup/folder.svg";
import { ReactComponent as FolderOpen } from "../authGroup/folderopen.svg";

const AuthMenu = (props) => {
  const baseUrl = "http://localhost:8080";
  const [menuList, setMenuList] = useState([]);
  const [checkedList, setCheckedList] = useState([]); //값 저장
  const [originList, setOriginList] = useState([]); //값 저장
  const [authSeq, setAuthSeq] = useState(null);
  const [selectCompanySeq, setSelectCompanySeq] = useState(null);
  const [pointCompanySeq, setPointCompanySeq] = useState(null);
  const [allMenuSeq, setAllmenuSeq] = useState(null);
  const [selectFlag, setSelectFlag] = useState(false);
  const [cancelFlag, setCancelFlag] = useState(false);
  const [insertFlag, setInsertFlag] = useState(false);
  const [deleteFlag, setDeleteFlag] = useState(false);
  // insert 성공시 렌더링
  useEffect(() => {
    setInsertFlag(false);
  }, [insertFlag]);

  // delete 성공시 렌더링
  useEffect(() => {
    setDeleteFlag(false);
  }, [deleteFlag]);

  const callMenuSeq = useCallback(async () => {
    let seq = await axios.get(`${baseUrl}/menu/menulist`);
    if (seq.data.length > 0) {
      let temp = [];
      seq.data.map((list) => {
        temp.push(list.menuSeq);
      });
      setAllmenuSeq(temp);
    }
  }, []);
  useEffect(() => {
    callMenuSeq();
  }, []);

  useEffect(() => {
    addListSelectAll();
    setSelectFlag(false);
  }, [selectFlag]);

  useEffect(() => {
    cancelListSelectAll();
    setCancelFlag(false);
  }, [cancelFlag]);

  // 전체 선택
  const addListSelectAll = useCallback(() => {
    if (selectFlag === true) {
      let temp = [];
      allMenuSeq.map((item) => {
        temp.push({ menuSeq: item, authSeq: authSeq });
      });
      allCheckedElement(temp, true);
    }
  }, [selectFlag]);

  // 전체 해제
  const cancelListSelectAll = () => {
    if (cancelFlag === true) {
      setCheckedList([]);
    }
  };

  useEffect(() => {}, [allMenuSeq]);

  useEffect(() => {
    setAuthSeq(props.authSeq);
    setPointCompanySeq(props.pointCompanySeq);
    setSelectCompanySeq(props.selectCompanySeq);
    setCancelFlag(props.cancelFlag);
    setSelectFlag(props.selectFlag);
    setInsertFlag(props.insertFlag);
    setDeleteFlag(props.deleteFlag);
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
  }, [authSeq, deleteFlag, insertFlag]);

  // 원본 리스트 전송
  useEffect(() => {
    setCheckedList(originList);
    sendOriginList();
  }, [originList]);

  const sendOriginList = () => {
    props.sendOriginList(originList);
  };

  // 메뉴 권한 db 호출
  useEffect(() => {
    originLoad();
  }, [authSeq, insertFlag, deleteFlag]);

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
    list.forEach((el) => {
      onCheckedElement(checked, { menuSeq: el.menuSeq, authSeq: authSeq });
    });
  };

  //전체 클릭시 발생하는 함수
  const allCheckedElement = useCallback(
    async (list, checked) => {
      const temp = [];

      list.map((item) => {
        let flag = true;
        checkedList.map((li) => {
          if (item.menuSeq === li.menuSeq) {
            flag = false;
          }
        });
        if (flag === true) {
          temp.push(item);
        }
      });
      try {
        if (checked) {
          setCheckedList([...checkedList, ...temp]);
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

  // 부모에게 체크리스트 전송
  const sendCheckedList = () => {
    props.sendCheckedList(checkedList);
  };

  // 해당 메뉴값 찾기
  const setAuthMenuValue = (e) => {
    const temp = [];
    menuList.forEach((list) => {
      if (list.menuSeq == e.target.value) {
        temp.push({ menuSeq: list.menuSeq, authSeq: authSeq });
      }
    });
    onCheckedElement(e.target.checked, temp[0]);
  };

  // 자식 전체체크
  const sendChildListSeq = (list, flag) => {
    const temp = [];
    list.forEach((elem) => {
      temp.push({ menuSeq: elem.menuSeq, authSeq: authSeq });
    });
    allCheckedElement(temp, flag);
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
  useEffect(() => {
    sendCheckedList();
  }, [checkedList]);
  useEffect(() => {}, [onCheckedElement]);

  return (
    <div style={{ border: "1px solid #f3f3f3" }}>
      {allMenuSeq && (
        <TreeView
          className="menuTree"
          aria-label="file system navigator"
          defaultCollapseIcon={<FolderOpen />}
          defaultExpandIcon={<Folder />}
          sx={{ flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
          defaultExpanded={["1", "2", "3", "4", "5", "6"]}
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
                  onClick={setAuthMenuValue}
                  // onChange={setAuthMenuValue }
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
                    sendChildListSeq={sendChildListSeq}
                    checkedList={checkedList}
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
                </TreeItem>
              </div>
            ))}
        </TreeView>
      )}
    </div>
  );
};
export default React.memo(AuthMenu);
