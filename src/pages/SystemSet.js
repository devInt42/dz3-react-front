import React, { useEffect, useState } from "react";
import axios from "axios";
import GNB from "../components/GNB";
import { Outlet, useNavigate } from "react-router-dom";

import SubMenu from "./SubMenu"
import MenuSet from "./MenuSet";

function SystemSet(props) {
    
    const menuId = props.menuId;

    const baseUrl = "http://localhost:8080";
    const [Lmenu, setLenu] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(baseUrl + '/menu/menulist/'+menuId).then(response => setLenu(response.data)).catch(error => console.log(error));
    }, []);

    const [active, setIsActive] = useState(false);
    const [parentMenu, setParentMenu] = useState("");
    const [subMenu, setSubMenu] = useState("");

    return (
        <div>
            {Lmenu.map((menu, i) => {
                return (
                    <div key={i}>
                        <div onClick={()=>{setIsActive(!active); setSubMenu(menu.menu_parent)}} style={{paddingLeft: menu.menu_depth*30}}>
                            {
                               menu.menu_name
                            }
                        </div>
                        {
                            
                            active && <SystemSet menuId={menu.menu_id} menuDepth={menu.menu_depth}/>
                        }
                    </div>
                );
            })}
            <button onClick={() => {navigate(`/dz3/menuset`); }}>menusetting</button>
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