import React, { useEffect, useState } from "react";
import axios from "axios";
import { VscGithubInverted } from "react-icons/vsc";
import { BsMenuButtonWideFill } from "react-icons/bs";
import { Outlet, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import GNB from "./GNB";

import SystemSet from "../pages/SystemSet";
import style from "../css/LNB.module.css";

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
    const sendParent = (menuName, menuSeq) => {
        props.getMenuInfo(menuName, menuSeq);
    }
  const baseUrl = "http://localhost:8080";
 
const [Lmenu, setLmenu] = useState([]);
  const [menuName, setMenuName] = useState("");
    const[menuSeq, setMenuSeq] = useState(0);
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    axios
      .get(baseUrl + "/menu/menulist")
      .then((response) => setLmenu(response.data))
      .catch((error) => console.log(error));
  }, []);

  console.log(Lmenu);

    return(
        
            <div className={style.lnb}>
                
                <BsMenuButtonWideFill className={style.lnb_showDetailIcon} onClick={()=>{setMenuVisible(!menuVisible)}}/><hr style={{border:"2px solid white"}}/>
                
                    {
                       Lmenu&& Lmenu.map((menu) => {
                            return (
                                menu.menuDepth == 0 &&<div id={menu.menuSeq} key={menu.menuSeq}><VscGithubInverted onClick={()=>{setMenuVisible(!menuVisible)}} className={style.lnb_menuIcon}/>
                                {menuVisible &&
                                <button className={style.lnb_callMenu} onClick={()=>{sendParent(menu.menuName); setMenuSeq(menu.menuSeq); setMenuName(menu.menuName); }}>{menu.menuName}</button>
                        }
                                </div>);
                        })
                    }
                    {/* <button onClick={() => { navigate(`/dz3/menuset`); }}>set</button><br />
                    <button onClick={() => { navigate(`/dz3/auth`); }}>auth</button><br />
                    <button onClick={() => { navigate(`/dz3/common`); }}>common</button><br />
                    <button onClick={() => {  }}>권한</button><br />

                    
                    <button onClick={() => { setShow(false); navigate(`/dz3`); }}>닫기</button>
                    onClick={() => { setShow(true); setGnbNum(i); setMenuId(menu.menu_id); setMenuName(menu.menu_name); }} */}

            </div>
          )


}

export default LNB;
