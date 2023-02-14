import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

import ContentsMapping from "./ContentsMapping";
import NotSelectedMenu from "./NotSelectedMenu";

import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import style from "../components/menu/css/SystemSet.module.css";

function CallMenu(props) {
  const [lastSeq, setLastSeq] = useState(0);

  const menuSequence = props.menuSeq;

  const baseUrl = "http://localhost:8080";
  const [subMenu, setSubMenu] = useState([]);

  const [childMenu, setChildMenu] = useState([]);
  const [flag, setFlag] = useState(false);
  const [focus, setFocus] = useState("");

  // 메뉴리스트 받아오기
  const getSubMenuList = useCallback(async () => {
    let sendData = { menuParent: menuSequence };
    try {
      const apiResult = await axios.get(`${baseUrl}/auth-employee/employee`, {
        params: sendData,
        headers: {
          Authorization: window.sessionStorage.getItem("empInfo"),
        },
      });
      if (apiResult.data == 0) {
        setLastSeq(menuSequence);
        setFlag(false);
        setSubMenu([]);
      } else {
        setSubMenu(apiResult.data);
        setFlag(true);
      }
    } catch (error) {
      console.log(error);
    }
  }, [menuSequence]);

  useEffect(() => {
    getSubMenuList();
  }, [menuSequence]);
  useEffect(() => {}, [flag]);
  return (
    <div>
      {menuSequence == 0 ? (
        <></>
      ) : (
        // flag == false ? (
        //   <></>
        // ) :
        <div>
          {subMenu.map((menu) => {
            return (
              <div className={style.check} key={menu.menuSeq}>
                <div 
                  className={style.item}
                  style={{
                    paddingLeft: (menu.menuDepth - 1) * 10,
                    // paddingRight: "20px",
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
                    {menu.menuDepth == 1 ? (
                      <div className={style.level1_item}>&nbsp;&nbsp;&nbsp;&nbsp;
                        {menu.menuName}
                        {childMenu.includes(menu.menuSeq) ? (
                          <SlArrowUp style={{float: "right", marginRight: "15px", marginTop:"3px"}}/>
                        ) : (
                          <SlArrowDown style={{float: "right", marginRight: "15px", marginTop:"3px"}}/>
                        )}
                      </div>
                    ) : (
                      <div className={style.menu_sub}>{menu.menuName}</div>
                    )}
                  </div>
                </div>
                {childMenu.includes(menu.menuSeq) && (
                  <CallMenu menuSeq={menu.menuSeq} />
                )}
              </div>
            );
          })}
          {lastSeq == 0 ? (
            // <NotSelectedMenu></NotSelectedMenu>
            <div></div>
          ) : (
            <ContentsMapping lastSeq={lastSeq} />
          )}
        </div>
      )}
    </div>
  );
}

export default CallMenu;
