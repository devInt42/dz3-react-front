import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { BsFillGrid3X3GapFill } from "react-icons/bs";

import style from "./css/LNB.module.css";

function LNB(props) {
  const sendParent = (menuName, menuSeq) => {
    props.getMenuInfo(menuName, menuSeq);
  };

  const baseUrl = "http://localhost:8080";

  const [Lmenu, setLmenu] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);

  const getMenuList = useCallback(async () => {
    try {
      const apiResult = await axios.get(`${baseUrl}/auth-employee/employee`, {
        headers: {
          Authorization: window.sessionStorage.getItem("empInfo"),
        },
      });
      console.log(apiResult.data);
      setLmenu(apiResult.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getMenuList();
  }, []);

  return (
    <div className={style.lnb}>
      <BsFillGrid3X3GapFill
        className={style.lnb_showDetailIcon}
        onClick={() => {
          setMenuVisible(!menuVisible);
        }}
      />
      <hr style={{ border: "2px solid white" }} />

      {Lmenu &&
        Lmenu.map((menu) => {
          return (
            menu.menuDepth == 0 && (
              <div
                id={menu.menuSeq}
                key={menu.menuSeq}
                className={style.lnb_select}
                onClick={() => {
                  sendParent(menu.menuName, menu.menuSeq);
                }}
              >
                <span>
                  {menu.menuIcons ? (
                    <img
                      src={process.env.PUBLIC_URL + menu.menuIcons}
                      className={style.lnb_showDetailIcon}
                      style={{
                        width: "35px",
                        height: "35px",
                        backgroundColor: "aliceblue",
                      }}
                    />
                  ) : (
                    <></>
                  )}
                </span>
                {menuVisible && (
                  <>
                    <span className={style.lnb_callMenu}>{menu.menuName}</span>
                  </>
                )}
              </div>
            )
          );
        })}
    </div>
  );
}

export default React.memo(LNB);

// {menu.menuSeq == 1 ? (
//   <FiSettings
//     onClick={() => {
//       setMenuVisible(!menuVisible);
//     }}
//     className={style.lnb_menuIcon}
//   />
// ) : menu.menuSeq == 2 ? (
//   <AiFillAccountBook
//     onClick={() => {
//       setMenuVisible(!menuVisible);
//     }}
//     className={style.lnb_menuIcon}
//   />
// ) : menu.menuSeq == 3 ? (
//   <BsFillPersonLinesFill
//     onClick={() => {
//       setMenuVisible(!menuVisible);
//     }}
//     className={style.lnb_menuIcon}
//   />
// ) : menu.menuSeq == 4 ? (
//   <FaMoneyCheckAlt
//     onClick={() => {
//       setMenuVisible(!menuVisible);
//     }}
//     className={style.lnb_menuIcon}
//   />
// ) : menu.menuSeq == 5 ? (
//   <FaBook
//     onClick={() => {
//       setMenuVisible(!menuVisible);
//     }}
//     className={style.lnb_menuIcon}
//   />
// ) : (
//   <BiTask
//     onClick={() => {
//       setMenuVisible(!menuVisible);
//     }}
//     className={style.lnb_menuIcon}
//   />
// )}
// {menuVisible && (
//   <span
//     className={
//       menuVisible
//         ? style.lnb_callMenu
//         : style.lnb_callMenu_false
//     }
//     onClick={() => {
//       sendParent(menu.menuName, menu.menuSeq);
//     }}
//   >
//   {menu.menuIcons? <img src={process.env.PUBLIC_URL + menu.menuIcons} style={{width: "20px", height: "20px"}}/>:<></>}
//     {menu.menuName}
//   </span>
// )}
