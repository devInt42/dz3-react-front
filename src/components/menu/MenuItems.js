import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import style from "./css/MenuItems.module.css"

import { RiPagesLine, RiPagesFill } from "react-icons/ri";
import { BsFolder, BsFolder2Open, BsFileEarmarkCheck } from "react-icons/bs";
import { CgFileDocument } from "react-icons/cg";

function MenuItems(props) {
  const menuSequence = props.menuSeq;

  const baseUrl = "http://localhost:8080";
  const [subMenu, setSubMenu] = useState([]);

  const [childMenu, setChildMenu] = useState([]);

  useEffect(() => {
    axios
      .get(baseUrl + "/menu/menulist/" + menuSequence)
      .then((response) => {
        setSubMenu(response.data);
      })
      .catch((error) => console.log(error));
  }, [menuSequence]);

  const send = (resultMenu) => {
    props.searchInfo(resultMenu);
  };

  return (
    <div>
      {subMenu.map((menu) => {
        return (
          <div key={menu.menuSeq} className={style.menu_item}>
            <div
              style={{
                paddingLeft: (menu.menuDepth - 1) * 22,
                paddingRight: "20px",
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
                <CgFileDocument />
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
