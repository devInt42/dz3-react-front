import React, { useEffect, useState } from "react";
import axios from "axios";

import style from "../css/SystemSet.module.css"

function SubMenu(props) {
    const menuSequence = props.menuSeq

    const baseUrl = "http://localhost:8080";
    const [subMenu, setSubMenu] = useState([]);

    const [childMenu, setChildMenu] = useState("");
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        axios.get(baseUrl + '/menu/menulist/' + menuSequence).then(response => setSubMenu(response.data)).catch(error => console.log(error))
    }, [menuSequence]);

    console.log(subMenu)

    return (
        <div>
            {
                menuSequence == 0 ? <></> :
                    <div>
                        {subMenu.map((menu, i) => {
                            return (
                                <div className={style.check} key={i}>
                                    <div className={style.item} style={{ paddingLeft: (menu.menuDepth - 1) * 30, paddingRight: '20px' }}>
                                        <button className={style.menu_btn} onClick={() => { setIsActive(true); setChildMenu(menu.menuSeq)}}>
                                            {menu.menuName}
                                        </button>
                                    </div>
                                    {
                                        childMenu == menu.menuSeq && isActive && <SubMenu menuSeq={menu.menuSeq} />
                                    }
                                </div>
                            );
                        })}
                    </div>
            }
        </div>
    );

    // return (
    //     <div>
    //         <div>{props.menu.menu_name}</div>
    //         <div>
    //             {props.menu.childrens.map((child) => (<SubMenu menu={child} />))}
    //         </div>
    //     </div>
    // );

    // return (
    //     <div>
    //         <div depth={depth}>[{depth}]{item.menu_Name}</div>
    //         <div>
    //             {item.childrens.map((child) => (
    //                 <SubMenu item={child} depth={depth + 1} />
    //             ))}
    //         </div>
    //     </div>
    // );
}

export default SubMenu;