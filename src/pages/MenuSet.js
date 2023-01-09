import React, { useEffect, useState } from "react";
import axios from "axios";

import style from "../css/MenuSet.module.css"

function MenuSet() {

    const baseUrl = "http://localhost:8080";
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        axios.get(baseUrl + '/menu/menulist').then(response => setMenu(response.data)).catch(error => console.log(error))
    }, []);

    const [menuId, setMenuId] = useState("");
    const [menuName, setMenuName] = useState("");
    const [menuParent, setMenuParent] = useState("SS01");
    const [menuDepth, setMenuDepth] = useState(0);

    const insertMenuId = (e) => {
        setMenuId(e.target.value);
    }
    const insertMenuName = (e) => {
        setMenuName(e.target.value);
    }
    const insertMenuParent = (e) => {
        setMenuParent(e.target.value);
        //axios.get(baseUrl + '/menu/menulist/' + menuParent).then(response => setMenuDepth(response.data)).catch(error => console.log(error))
    }
    const insertMenuDepth = (e) => {
        setMenuDepth(e.target.value);
    }

    useEffect(() => {
        axios.get(baseUrl + '/menu/menulist/getdepth/' + menuParent).then(response => { console.log(response.data); setMenuDepth(response.data) }).catch(error => console.log(error));
    }, [menuParent]);

    return (
        <div>
            메뉴 아이디 : <input type="text" onChange={insertMenuId} /><br />
            메뉴 이름 : <input type="text" onChange={insertMenuName} /><br />
            상위 메뉴 :
            <select onChange={insertMenuParent} value={menuParent}>
                {menu.map((menu, i) => (
                    <option value={menu.menu_id} key={i}>
                        {menu.menu_name}
                    </option>
                ))}
            </select><br />
            메뉴 레벨 : <input type="text" value={menuDepth + 1} readOnly /><br />
            <button onClick={insertMenu}>저장</button>
        </div>
    );

    async function insertMenu() {
        const url = baseUrl + "/menu";
        const data = {
            menuId: menuId,
            menuName: menuName,
            menuParent: menuParent,
            menuDepth: menuDepth + 1
        }
        console.log(data)
        axios({
            method: "post",
            url: url,
            data: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        }).then((res) => { console.log("저장성공!!"); }).catch((error) => { console.log(error); });
    }

}

export default MenuSet;
