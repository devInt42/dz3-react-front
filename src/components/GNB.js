import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

import LNB from "./LNB";

function GNB() {
    const navigate = useNavigate();

    const [show, setShow] = useState(false);

    const [gnbNum, setGnbNum] = useState(0);
    const [menuId, setMenuId] = useState("");
    const [menuName, setMenuName] = useState("");

    const baseUrl = "http://localhost:8080";
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        axios.get(baseUrl + '/menu/menulist').then(response => setMenu(response.data)).catch(error => console.log(error))
    }, []);

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand onClick={() => { navigate(`/dz3`); }}>GNB</Navbar.Brand>
                    <Nav className="me-auto">
                        {
                            menu.map((menu, i) => {
                                return (
                                    menu.menu_depth == 0 &&
                                    <Nav.Link key={i} href={`#features${i}`} onClick={() => { setShow(true); setGnbNum(i); setMenuId(menu.menu_id); setMenuName(menu.menu_name); }}>{menu.menu_name}</Nav.Link>
                                );
                            })
                        }
                        <Nav.Link href="#pricing5" onClick={() => { setShow(false); navigate(`/dz3`); }}>닫기</Nav.Link>
                        <button onClick={() => { navigate(`/dz3/menuset`); }}>menusetting</button>
                    </Nav>
                </Container>
            </Navbar>

            {
                show == true ?
                    <><LNB gnbNum={gnbNum} menuId={menuId} menuName={menuName} />
                    </> :
                    <div>false</div>
            }
        </div>



    );
}

export default GNB;