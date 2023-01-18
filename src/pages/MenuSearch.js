import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";

import { AiFillFolderOpen } from "react-icons/ai";

import MenuItems from "./MenuItems";

function MenuSearch() {

    const baseUrl = "http://localhost:8080";
    const [menu, setMenu] = useState([]);
    const [subMenu, setSubmenu] = useState([]);
    const [isOpen, setIsOpen] = useState(true);

    const [selected, setSelected] = useState(0);

    const selectedMenu = (e) => {
        setSelected(e.target.value);
    }

    useEffect(() => {
        axios.get(baseUrl + '/menu/menulist/' + selected).then(response => setMenu(response.data)).catch(error => console.log(error))
    }, []);

    useEffect(() => {
        axios.get(baseUrl + '/menu/menulist/' + selected).then(response => setSubmenu(response.data)).catch(error => console.log(error))
    }, [selected]);
    
    return (
        <div>
            <Row>
                {/* onChange={insertMenuParent} value={menuParent} */}
                <select onChange={selectedMenu}>
                    {menu.map((menu, i) => (
                        <option value={menu.menuSeq} key={i}>
                            {menu.menuName}
                        </option>
                    ))}
                </select>
                {/* <select>
                    {subMenu.map((menu, i) => (
                        <option value={menu.menuSeq} key={i}>
                            {menu.menuName}
                        </option>
                    ))}
                </select> */}
                <input style={{ backgroundColor: "rgba(126, 179, 229, 0.734)" }} type="text" placeholder="메뉴 검색" readOnly />
            </Row>
            <Row>
                {subMenu.map((menu, i) => {
                    return (
                        <div key={i}>
                            <div><AiFillFolderOpen />{menu.menuName}</div>
                            {<MenuItems menuSeq={menu.menuSeq}/>}
                        </div>
                    );
                })}
            </Row>
        </div>
    );

}



export default MenuSearch;