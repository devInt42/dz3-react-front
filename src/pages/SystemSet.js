import React, { useEffect, useState } from "react";
import axios from "axios";
import GNB from "../components/GNB";
import { Outlet, useNavigate } from "react-router-dom";
import SubMenu from "./SubMenu"

function SystemSet(props) {
    
    const menuId = props.menuId;

    const baseUrl = "http://localhost:8080";
    const [menu, setMenu] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(baseUrl + '/menu/menulist/'+menuId).then(response => setMenu(response.data)).catch(error => console.log(error));
    }, []);

    // const nest = (menu, menuId = "Root", link = 'menu_parent') =>
    //     menu.filter(item => item[link] == menuId)
    //         .map(item => ({ ...item, childrens: nest(menu, item.menuId) }));
    // const tree = nest(menu)
    // console.log(tree)

    const [active, setIsActive] = useState(false);

    return (
        <div>
            {menu.map((menu, i) => {
                return (
                    <div key={i}>
                        {/* {
                            menu.menu_depth == 1 && <div onClick={() => { subMenu(menu, i) }}>{menu.menu_name}<hr /></div>
                        } */}
                        {/* <SubMenu menu={menu} i={i} /> */}
                        <div onClick={()=>{setIsActive(!active)}} style={{paddingLeft: menu.menu_depth*30}}>{menu.menu_name}</div>
                        {
                            active && <SystemSet menuId={menu.menu_id} menuDepth={menu.menu_depth}/>
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