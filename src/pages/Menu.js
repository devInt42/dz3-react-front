import React, { useEffect, useState } from "react";
import axios from "axios";
import GNB from "../components/GNB";
import LNB from "../components/LNB";

function Menu() {

    const baseUrl = "http://localhost:8080";
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        axios.get(baseUrl + '/menu/menulist').then(response => setMenu(response.data)).catch(error => console.log(error))
    }, []);
    console.log(menu)
    return (
        <div>
            <GNB />
            {/* {menu.map((menu, i) => {
                return (
                    <div key={i}>
                        <div>{menu.menu_id}</div>
                        <div>{menu.menu_name}</div>
                        <div>{menu.menu_parent}</div>
                        <div>{menu.menu_depth}</div>
                        <hr />
                    </div>
                );
            })} */}
        </div>
    );

}



export default Menu;