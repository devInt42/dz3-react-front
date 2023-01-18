import React, { useEffect, useState } from "react";
import axios from "axios";

import { RiPagesLine, RiPagesFill } from "react-icons/ri";

function MenuItems(props) {

    const menuSequence = props.menuSeq

    const baseUrl = "http://localhost:8080";
    const [subMenu, setSubMenu] = useState([]);

    const [childMenu, setChildMenu] = useState("");

    useEffect(() => {
        axios.get(baseUrl + '/menu/menulist/' + menuSequence)
        .then(response => {setSubMenu(response.data)})
        .catch(error => console.log(error))
    }, [menuSequence]);

    return (
        <div>
            {subMenu.map((menu) => {
                return (
                    <div key={menu.menuSeq}>
                        <div style={{ paddingLeft: (menu.menuDepth - 1) * 22, paddingRight: '20px' }}>
                            <div onClick={()=>setChildMenu(menu.menuSeq)}>
                                <RiPagesLine/>{menu.menuName}
                            </div>
                        </div>
                        {
                            childMenu == menu.menuSeq && <MenuItems menuSeq={menu.menuSeq} />
                        }
                    </div>
                );
            })}
        </div>
    );
}

export default MenuItems;