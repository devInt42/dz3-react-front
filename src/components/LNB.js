import React, { useEffect, useState } from "react";
import axios from "axios";
import { VscGithubInverted } from "react-icons/vsc";
import GNB from "./GNB";

import SystemSet from "../pages/SystemSet";
import style from "../css/LNB.module.css"

function LNB(props) {

    const baseUrl = "http://localhost:8080";
    const [Lmenu, setLmenu] = useState([]);

    const[menuName, setMenuName] = useState("");

    useEffect(() => {
        axios.get(baseUrl + '/menu/menulist').then(response => setLmenu(response.data)).catch(error => console.log(error))
    }, []);

    return(
            <div className={style.lnb}>
                
                    {
                        Lmenu.map((menu, i) => {
                            return (
                                menu.menu_depth == 0 &&
                                <button className={style.lnb_callMenu} key={i} onClick={()=>setMenuName(menu.menu_name)}><VscGithubInverted />  {menu.menu_name}</button>
                            );
                        })
                    }<GNB menuName={menuName}/>
                    {/* <button onClick={() => { setShow(false); navigate(`/dz3`); }}>닫기</button>
                    <button onClick={() => { navigate(`/dz3/menuset`); }}>menusetting</button>
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