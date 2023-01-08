import React, { useEffect, useState } from "react";
import axios from "axios";

import Form from 'react-bootstrap/Form';

function MenuSet() {

    const baseUrl = "http://localhost:8080";
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        axios.get(baseUrl + '/menu/menulist').then(response => setMenu(response.data)).catch(error => console.log(error))
    }, []);

    const [menuId, setMenuId] = useState("");
    const [menuName, setMenuName] = useState("");
    const [menuParent, setMenuParent] = useState("");
    const [menuDepth, setMenuDepth] = useState(0);

    const insertMenuId = (e) => {
        setMenuId(e.target.value);
    }
    const insertMenuName = (e) => {
        setMenuName(e.target.value);
    }
    const insertMenuParent = (e) => {
        setMenuParent(e.target.value);
    }
    const insertMenuDepth = (e) => {
        setMenuDepth(e.target.value);
    }

    return (
        <div>
            메뉴 아이디 : <input type="text" onChange={insertMenuId}/><br />
            메뉴 이름 : <input type="text" onChange={insertMenuName}/><br />
            상위 메뉴 :
            <select onChange={insertMenuParent} value={menuParent}>
                {menu.map((menu, i)=>(
                    <option value={menu.menu_name} key={i}>
                        {menu.menu_name}
                    </option>
                ))}
            </select><br />
            메뉴 레벨 : <input type="text" /><br />
            selected: {menuParent}
            depth : {menuDepth}
        </div>
    );
}

export default MenuSet;
