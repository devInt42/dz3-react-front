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
    const [menuVisible, setMenuVisible] = useState(false);

    useEffect(() => {
        axios
            .get(baseUrl + "/menu/menulist")
            .then((response) => setLmenu(response.data))
            .catch((error) => console.log(error));
    }, []);

    return (

        <div className={style.lnb}>

            <BsMenuButtonWideFill className={style.lnb_showDetailIcon} onClick={() => { setMenuVisible(!menuVisible) }} /><hr style={{ border: "2px solid white" }} />

            {
                Lmenu && Lmenu.map((menu) => {
                    return (
                        menu.menuDepth == 0 && <div id={menu.menuSeq} key={menu.menuSeq}><VscGithubInverted onClick={() => { setMenuVisible(!menuVisible) }} className={style.lnb_menuIcon} />
                            {menuVisible &&
                                <button className={style.lnb_callMenu} onClick={() => { sendParent(menu.menuName, menu.menuSeq);}}>{menu.menuName}</button>
                            }
                        </div>);
                })
            }

        </div>
    )


}

export default LNB;
