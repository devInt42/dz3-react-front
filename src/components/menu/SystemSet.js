import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import style from "./css/SystemSet.module.css"

function SystemSet(props) {

    const menuId = props.menuId;

    const baseUrl = "http://localhost:8080";
    const [Lmenu, setLenu] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(baseUrl + '/menu/menulist/' + menuId).then(response => setLenu(response.data)).catch(error => console.log(error));
    }, []);

    const [active, setIsActive] = useState(false);
    const [clickMenu, setClickMenu] = useState(false);
    const [parentMenu, setParentMenu] = useState("");
    const [subMenu, setSubMenu] = useState("");

    const alertClicked = () => {
        alert('You clicked the third ListGroupItem');
    };
    if (Lmenu.length == 0) {
        console.log("asdasdads")
    }
    return (
        <div>
            {Lmenu.map((menu, i) => {
                return (
                    <div className={style.check} key={i}>
                        <div className={style.item} style={{ paddingLeft: menu.menu_depth * 30, paddingRight: '20px' }}>
                            <button className={style.menu_btn} action onClick={() => { setIsActive(true); setSubMenu(menu.menu_id); }}>
                                {menu.menu_name}
                            </button>
                        </div>
                        {
                            subMenu == menu.menu_id && active && <SystemSet menuId={menu.menu_id} menuDepth={menu.menu_depth} />
                        }
                    </div>
                );
            })}

        </div>
    );
}


function subMenu(menu, i) {
    console.log("하위메뉴")
    console.log(menu)
    console.log(i)
    return (
        <div>
            {menu.map((sub, i) => {
                return (
                    <div key={i}>
                        <div>
                            {sub.menu_depth}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default SystemSet;