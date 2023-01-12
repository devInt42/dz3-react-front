import React, { useEffect, useState } from "react";
import axios from "axios";
import { VscGithubInverted } from "react-icons/vsc";
import { BsMenuButtonWideFill } from "react-icons/bs";
import { Outlet, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import GNB from "./GNB";

import SystemSet from "../pages/SystemSet";
import style from "../css/LNB.module.css"

function LNB(props) {

    const baseUrl = "http://localhost:8080";
    const [Lmenu, setLmenu] = useState([]);
    const navigate = useNavigate();

    const[menuName, setMenuName] = useState("");
    const[subcall, setSubcall] = useState(false);
    const[menuId, setMenuId] = useState("");

    const [menuVisible, setMenuVisible] = useState(false);

    useEffect(() => {
        axios.get(baseUrl + '/menu/menulist').then(response => setLmenu(response.data)).catch(error => console.log(error))
    }, []);

    console.log(Lmenu)

    return(
            <div className={style.lnb}>
                
                <BsMenuButtonWideFill className={style.lnb_showDetailIcon} onClick={()=>{setMenuVisible(!menuVisible)}}/><hr style={{border:"2px solid white"}}/>
                
                    {
                        Lmenu.map((menu, i) => {
                            return (
                                menu.menuDepth == 0 &&<div key={i}><VscGithubInverted onClick={()=>{setMenuVisible(!menuVisible)}} className={style.lnb_menuIcon}/>
                                {menuVisible &&
                                <button className={style.lnb_callMenu} onClick={()=>{setMenuId(menu.menuCode); setMenuName(menu.menuName); setSubcall(!subcall); navigate(`/dz3/submenu`)}}>{menu.menuName}</button>
                        }
                                </div>);
                        })
                    }
                    <button onClick={() => { navigate(`/dz3/menuset`); }}>set</button><br />
                    <button onClick={() => { navigate(`/dz3/auth`); }}>auth</button><br />
                    <button onClick={() => { navigate(`/dz3/common`); }}>common</button><br />
                    
                    {/* <button onClick={() => { setShow(false); navigate(`/dz3`); }}>닫기</button>
                    onClick={() => { setShow(true); setGnbNum(i); setMenuId(menu.menu_id); setMenuName(menu.menu_name); }} */}
              
            </div>
    );


    // useEffect(() => {
    //     axios.get(baseUrl + '/menu/menulist/' + props.menuId).then(response => setLenu(response.data)).catch(error => console.log(error));
    // }, []);

    // return (

    //     <div className={style.lnb}>
    //         {props.gnbNum == 0 && <div><hr /><h4>{props.menuName} ( {props.menuId} )</h4><hr /><SystemSet menuId={props.menuId} /></div>}
    //         {props.gnbNum == 1 && <div><hr /><h4>{props.menuName} ( {props.menuId} )</h4><hr /><SystemSet menuId={props.menuId} /></div>}
    //         {props.gnbNum == 2 && <div><hr /><h4>{props.menuName} ( {props.menuId} )</h4><hr /><SystemSet menuId={props.menuId} /></div>}
    //         {props.gnbNum == 3 && <div><hr /><h4>{props.menuName} ( {props.menuId} )</h4><hr /><SystemSet menuId={props.menuId} /></div>}
    //         {props.gnbNum == 4 && <div><hr /><h4>{props.menuName} ( {props.menuId} )</h4><hr /><SystemSet menuId={props.menuId} /></div>}
    //         {props.gnbNum == 5 && <div><hr /><h4>{props.menuName} ( {props.menuId} )</h4><hr /><SystemSet menuId={props.menuId} /></div>}
    //     </div>


    // );
}

export default LNB;