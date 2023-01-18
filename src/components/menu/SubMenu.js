import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

import style from "./css/SystemSet.module.css";
import MenuSet from "../../pages/MenuSet";
import { Outlet, useNavigate } from "react-router-dom";
import ContentsMapping from "../../pages/ContentsMapping";

function SubMenu(props) {
  const navigate = useNavigate();

  // const sendLastSeq = (lastSeq) => {
  //   <ContentsMapping />
  //   console.log(lastSeq)
  //   console.log("여기까지는 오는데 왜 안돼 ㅅㅂ")

  //   props.getLastMenuSeq(lastSeq);
  // }

  const [lastSeq, setLastSeq] = useState(0);

  const menuSequence = props.menuSeq;

  const baseUrl = "http://localhost:8080";
  const [subMenu, setSubMenu] = useState([]);

  const [childMenu, setChildMenu] = useState("");
  const [isActive, setIsActive] = useState(false);

  const getSubMenuList = useCallback(async () => {
    console.log(menuSequence);
    try {
      const apiResult = await axios({
        url: baseUrl + "/menu/menulist/" + menuSequence,
        method: "get",
      });
      //console.log(apiResult.data)
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

  // useEffect(() => {
  //     axios.get(baseUrl + '/menu/menulist/' + menuSequence).then(response => setSubMenu(response.data)).catch(error => console.log(error))
  // }, [menuSequence]);

  // console.log(menuSequence)
  // console.log(subMenu)

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
                      setIsActive(true);
                      setChildMenu(menu.menuSeq);
                    }}
                  >
                    {menu.menuName}
                  </div>
                </div>
                {childMenu == menu.menuSeq && isActive && (
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

  // return (
  //     <div>
  //         <div>{props.menu.menu_name}</div>
  //         <div>
  //             {props.menu.childrens.map((child) => (<SubMenu menu={child} />))}
  //         </div>
  //     </div>
  // );

  // return (
  //     <div>
  //         <div depth={depth}>[{depth}]{item.menu_Name}</div>
  //         <div>
  //             {item.childrens.map((child) => (
  //                 <SubMenu item={child} depth={depth + 1} />
  //             ))}
  //         </div>
  //     </div>
  // );
}

export default React.memo(SubMenu);
