import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { FiSettings } from "react-icons/fi";
import { BsFillPersonLinesFill, BsFillGrid3X3GapFill } from "react-icons/bs";
import { AiFillAccountBook } from "react-icons/ai";
import { BiTask } from "react-icons/bi";
import { FaMoneyCheckAlt, FaBook } from "react-icons/fa";
import style from "./css/LNB.module.css";

function LNB(props) {
  // const setParent = () => {
  //     props.getTest("go to parent");
  // }

  // return(
  //     <div>
  //         {/* <h1>{props.text}</h1> */}
  //         <a onClick={()=>{setParent()}}>값 보내기</a>
  //     </div>
  // )

  // const sendParent = useCallback( (menuName, menuSeq) => {
  //     props.getMenuInfo(menuName, menuSeq);
  // }, [])

  const sendParent = (menuName, menuSeq) => {
    props.getMenuInfo(menuName, menuSeq);
  };

  const baseUrl = "http://localhost:8080";

  const [Lmenu, setLmenu] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);

  const getMenuList = useCallback(async () => {
    try {
      const apiResult = await axios({
        url: baseUrl + "/menu/menulist",
        method: "get",
      });
      setLmenu(apiResult.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getMenuList();
  }, []);

  // useEffect(() => {
  //     axios
  //         .get(baseUrl + "/menu/menulist")
  //         .then((response) => setLmenu(response.data))
  //         .catch((error) => console.log(error));
  // }, []);

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
              <div id={menu.menuSeq} key={menu.menuSeq}>
                {menu.menuSeq == 1 ? (
                  <FiSettings
                    onClick={() => {
                      setMenuVisible(!menuVisible);
                    }}
                    className={style.lnb_menuIcon}
                  />
                ) : menu.menuSeq == 2 ? (
                  <AiFillAccountBook
                    onClick={() => {
                      setMenuVisible(!menuVisible);
                    }}
                    className={style.lnb_menuIcon}
                  />
                ) : menu.menuSeq == 3 ? (
                  <BsFillPersonLinesFill
                    onClick={() => {
                      setMenuVisible(!menuVisible);
                    }}
                    className={style.lnb_menuIcon}
                  />
                ) : menu.menuSeq == 4 ? (
                  <FaMoneyCheckAlt
                    onClick={() => {
                      setMenuVisible(!menuVisible);
                    }}
                    className={style.lnb_menuIcon}
                  />
                ) : menu.menuSeq == 5 ? (
                  <FaBook
                    onClick={() => {
                      setMenuVisible(!menuVisible);
                    }}
                    className={style.lnb_menuIcon}
                  />
                ) : (
                  <BiTask
                    onClick={() => {
                      setMenuVisible(!menuVisible);
                    }}
                    className={style.lnb_menuIcon}
                  />
                )}
                {menuVisible && (
                  <button
                    className={menuVisible ? style.lnb_callMenu : style.lnb_callMenu_false}
                    onClick={() => {
                      sendParent(menu.menuName, menu.menuSeq);
                    }}
                  >
                    {menu.menuName}
                  </button>
                )}
              </div>
            )
          );
        })}
    </div>
  );
}

export default React.memo(LNB);
