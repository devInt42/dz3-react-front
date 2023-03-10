import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

import style from "../css/SystemSet.module.css";
import ContentsMapping from "./ContentsMapping";

function SubMenu(props) {
  const [lastSeq, setLastSeq] = useState(0);

  const menuSequence = props.menuSeq;

  const baseUrl = "http://localhost:8080";
  const [subMenu, setSubMenu] = useState([]);

  const [childMenu, setChildMenu] = useState([]);
  const [isActive, setIsActive] = useState(false);

  const getSubMenuList = useCallback(async () => {
    try {
      const apiResult = await axios({
        url: baseUrl + "/menu/menulist/" + menuSequence,
        method: "get",
      });
      if (apiResult.data == 0) {
        setLastSeq(menuSequence);
      } else {
        setSubMenu(apiResult.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [menuSequence]);

  useEffect(() => {
    getSubMenuList();
  }, [menuSequence]);

  return (
    <div>
      {menuSequence == 0 ? (
        <></>
      ) : (
        <div>
          {subMenu.map((menu) => {
            return (
              <div className={style.check} key={menu.menuSeq}>
                <div
                  className={style.item}
                  style={{
                    paddingLeft: (menu.menuDepth - 1) * 20,
                    paddingRight: "20px",
                  }}
                >
                  <div
                    className={style.menu_btn}
                    onClick={() => {
                      childMenu.includes(menu.menuSeq)
                        ? setChildMenu(
                            childMenu.filter((data) => data != menu.menuSeq)
                          )
                        : setChildMenu([...childMenu, menu.menuSeq]);
                    }}
                  >
                    {menu.menuName}
                  </div>
                </div>
                {childMenu.includes(menu.menuSeq) && (
                  <SubMenu menuSeq={menu.menuSeq} />
                )}
              </div>
            );
          })}
          {lastSeq == 0 ? <></> : <ContentsMapping lastSeq={lastSeq} />}
        </div>
      )}
    </div>
  );
}

export default React.memo(SubMenu);
