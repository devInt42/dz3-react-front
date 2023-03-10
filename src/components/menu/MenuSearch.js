import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import style from "./css/MenuSearch.module.css"
import { Container, Row, Col } from "react-bootstrap";

import { AiFillFolderOpen } from "react-icons/ai";
import { HiOutlineSearchCircle, HiBan } from "react-icons/hi";

import MenuItems from "./MenuItems";

function MenuSearch(props) {
  const baseUrl = "http://localhost:8080";
  const [menu, setMenu] = useState([]);
  const [subMenu, setSubmenu] = useState([]);
  const [searchMenu, setSearchMenu] = useState([]);

  const [selected, setSelected] = useState(0);
  const [search, setSearch] = useState("");

  // crud후 렌더링을 위한 변수
  const [insertFlag, setInsertFlag] = useState(false);
  const [deleteFlag, setDeleteFlag] = useState(false);
  const [updateFlag, setUpdateFlag] = useState(false);
  const [selectList, setSelectList] = useState([]);
  useEffect(() => {
    setInsertFlag(props.insertFlag);
    setDeleteFlag(props.deleteFlag);
    setUpdateFlag(props.updateFlag);
  }, [props]);
  useEffect(() => {
    setInsertFlag(false);
  }, [insertFlag]);
  useEffect(() => {
    setDeleteFlag(false);
  }, [deleteFlag]);
  // 업데이트후 초기화
  useEffect(() => {
    setUpdateFlag(false);
  }, [updateFlag]);

  const selectedMenu = (e) => {
    setSelected(e.target.value);
  };
  const getSearch = (e) => {
    setSearch(e.target.value);
  };

  // 검색 필터
  const searched = searchMenu.filter((item) => {
    return item.menuName
      .replace(" ", "")
      .toLocaleLowerCase()
      .includes(search.toLocaleLowerCase());
  });

  useEffect(() => {
    getAllList();
    selectMenuList();
  }, []);

  // 전체 리스트 호출
  const getAllList = async () => {
    try {
      let allList = await axios.get(baseUrl + "/menu/menulist");
      setSearchMenu(allList.data);
    } catch (error) {
      console.log(error);
    }
  };

  // 선택한 메뉴 호출
  const selectMenuList = async () => {
    try {
      let selectMenu = await axios.get(baseUrl + "/menu/menulist/" + selected);

      setMenu(selectMenu.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    srMenu();
  }, [selected, deleteFlag, insertFlag, updateFlag]);

  // 검색 메뉴
  const srMenu = useCallback(async () => {
    try {
      let searchRes = await axios.get(baseUrl + "/menu/menulist/" + selected);
      setSubmenu(searchRes.data);
    } catch (error) {
      console.log(error);
    }
  }, [selected, deleteFlag, insertFlag, updateFlag]);

  useEffect(() => {
    srMenu();
  }, [selected, deleteFlag, insertFlag, updateFlag]);

  // 렌더링 수정 전
  // useEffect(() => {
  //   axios
  //     .get(baseUrl + "/menu/menulist")
  //     .then((response) => setSearchMenu(response.data))
  //     .catch((error) => console.log(error));
  // }, []);

  // useEffect(() => {
  //   axios
  //     .get(baseUrl + "/menu/menulist/" + selected)
  //     .then((response) => setMenu(response.data))
  //     .catch((error) => console.log(error));
  // }, []);

  // useEffect(() => {
  //   axios
  //     .get(baseUrl + "/menu/menulist/" + selected)
  //     .then((response) => setSubmenu(response.data))
  //     .catch((error) => console.log(error));
  // }, [selected]);

  const searchInfo = (resultMenu) => {
    props.getSearchInfo(resultMenu);
  };

  useEffect(() => {
    selectMenuList();
    getAllList();
    callSelectMenu();
  }, [subMenu]);

  const callSelectMenu = useCallback(async () => {
    try {
      let listRes = await axios.get(`${baseUrl}/menu/tree`, {
        params: { menuParent: "0", menuDepth: "0" },
      });
      setSelectList(listRes.data);
    } catch (error) {}
  }, [selected]);

  useEffect(() => {}, [selectList]);
  return (
    <div className={style.searchWrap}>
      <Row className={style.searchTop}>
        {selectList && (
          <select
            onChange={selectedMenu}
            onClick={() => {
              setSearch("");
            }}
            defaultValue={selected}
          >
            <option value={0}>전체</option>
            {selectList.map((menu, i) => (
              <option value={menu.menuSeq} key={menu.menuSeq.toString()}>
                {menu.menuName}
              </option>
            ))}
          </select>
        )}
        <div style={{ position: "relative" }}>
          <input
            type="text"
            onChange={getSearch}
            placeholder="메뉴 검색"
            className={style.searchBox}
          />
          <HiOutlineSearchCircle className={style.searchIcon}/>
        </div>
      </Row>
      <Row>
        {search != ""
          ? searched.map((menu) => {
              return (
                <div
                  key={menu.menuSeq}
                  onClick={() => searchInfo(menu)}
                  className={style.menu_list}
                >
                  {menu.menuName}
                </div>
              );
            })
          : subMenu.map((menu, i) => {
              return (
                <div key={i} className={menu.useYN == "Y" ? style.menu_list: style.top_menu_nouse}>
                  <div onClick={() => searchInfo(menu)} className={style.top_menu}>
                    {menu.useYN != "Y" ? 
                    (<HiBan style={{color: "rgba(237, 133, 36, 0.95)"}}/>) :
                    (<AiFillFolderOpen style={{color: "rgba(36, 133, 237, 0.95)"}}/>) }
                    {menu.menuName}
                  </div>
                  <div style={{ paddingLeft: "15px" }}>
                    {
                      <MenuItems
                        insertFlag={insertFlag}
                        deleteFlag={deleteFlag}
                        updateFlag={updateFlag}
                        menuSeq={menu.menuSeq}
                        searchInfo={searchInfo}
                      />
                    }
                  </div>
                </div>
              );
            })}
      </Row>
    </div>
  );
}

export default MenuSearch;
