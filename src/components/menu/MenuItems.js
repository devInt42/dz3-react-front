import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import style from "./css/MenuItems.module.css";

import { RiPagesLine, RiPagesFill } from "react-icons/ri";
import { BsFolder, BsFolder2Open, BsFileEarmarkCheck } from "react-icons/bs";
import { CgFileDocument } from "react-icons/cg";

function MenuItems(props) {
  const menuSequence = props.menuSeq;

  const baseUrl = "http://localhost:8080";
  const [subMenu, setSubMenu] = useState([]);

  const [childMenu, setChildMenu] = useState([]);
  const [insertFlag, setInsertFlag] = useState(false);
  const [deleteFlag, setDeleteFlag] = useState(false);
  const [updateFlag, setUpdateFlag] = useState(false);
  useEffect(() => {
    setInsertFlag(props.insertFlag);
    setDeleteFlag(props.deleteFlag);
    setUpdateFlag(props.updateFlag);
  }, [props]);
  // 삽입후 초기화
  useEffect(() => {
    setInsertFlag(false);
  }, [insertFlag]);
  // 삭제후 초기화
  useEffect(() => {
    setDeleteFlag(false);
  }, [deleteFlag]);
  // 업데이트후 초기화
  useEffect(() => {
    setUpdateFlag(false);
  }, [updateFlag]);
  useEffect(() => {
    axios
      .get(baseUrl + "/menu/menulist/" + menuSequence)
      .then((response) => {
        setSubMenu(response.data);
      })
      .catch((error) => console.log(error));
  }, [menuSequence, insertFlag, deleteFlag, updateFlag]);

  const send = (resultMenu) => {
    props.searchInfo(resultMenu);
  };

  return (
    <div>
      {subMenu.map((menu) => {
        return (
          <div key={menu.menuSeq} className={menu.useYN == "Y" ? style.menu_item : style.menu_item_nouse}>
            <div
              style={{
                paddingLeft: (menu.menuDepth - 1) * 18,
                // paddingRight: "20px",
              }}
            >
              <div
                onClick={() => {
                  childMenu.includes(menu.menuSeq)
                    ? setChildMenu(
                        childMenu.filter((data) => data != menu.menuSeq)
                      )
                    : setChildMenu([...childMenu, menu.menuSeq]);
                  send(menu);
                }}
              >
                <CgFileDocument style={menu.useYN == "Y" ? {color: "#00AAFF"} : {color: "rgba(237, 133, 36, 0.95)"}}/>
                {menu.menuName}
              </div>
            </div>
            {childMenu.includes(menu.menuSeq) && (
              <MenuItems menuSeq={menu.menuSeq} searchInfo={props.searchInfo} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default MenuItems;
