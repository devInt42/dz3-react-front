import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { CgMenuBoxed } from "react-icons/cg";
import style from "../css/GNB.module.css";

import LNB from "./LNB";

function GNB(props) {
    const navigate = useNavigate();

    const [show, setShow] = useState(false);

    const [gnbNum, setGnbNum] = useState(0);
    const [menuId, setMenuId] = useState("");
    const [menuName, setMenuName] = useState("");

    const baseUrl = "http://localhost:8080";
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        axios.get(baseUrl + '/menu/menulist').then(response => setMenu(response.data)).catch(error => console.log(error))
    }, []);

    return (

        <div>
            <div style={{ height: "40px" }}><h2>LastDanth<span style={{color:"rgba(64, 192, 228, 0.929)", fontWeight:"bolder"}}>10</span></h2></div>
            <div className={style.gnb_bar}><CgMenuBoxed style={{width: "50px", height: "50px", margin: "10px"}}/>{props.menuName}</div>
        </div>

        // <div className={style.gnb_bar}>
        //     <div style={{ height: "30px" }}><h3>Last Dance</h3></div>
        //     <div className={style.gnb_content}>
        //         <span onClick={() => { navigate(`/dz3`); }}>GNB</span>
        //         <span className={style.gnb_menu}>
        //             {
        //                 menu.map((menu, i) => {
        //                     return (
        //                         menu.menu_depth == 0 &&
        //                         <button className={style.gnb_callLnb} key={i} onClick={() => { setShow(true); setGnbNum(i); setMenuId(menu.menu_id); setMenuName(menu.menu_name); }}><VscGithubInverted />  {menu.menu_name}</button>
        //                     );
        //                 })
        //             }
        //             <button onClick={() => { setShow(false); navigate(`/dz3`); }}>닫기</button>
        //             <button onClick={() => { navigate(`/dz3/menuset`); }}>menusetting</button>
        //         </span>
        //     </div>

        //     {
        //         show == true ?
        //             <><LNB gnbNum={gnbNum} menuId={menuId} menuName={menuName} />
        //             </> :
        //             <div>false</div>
        //     }
        // </div>



    );
}

export default GNB;