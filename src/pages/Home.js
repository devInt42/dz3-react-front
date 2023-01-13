import { Outlet, useNavigate } from "react-router-dom";
import LNB from "../components/LNB";
import GNB from "../components/GNB";
import React, { useEffect, useState } from "react";
import axios from "axios";
import SystemSet from "../pages/SystemSet";
import { Container, Row, Col } from "react-bootstrap";

import style from "../css/LNB.module.css";

import { VscGithubInverted } from "react-icons/vsc";
import { BsMenuButtonWideFill } from "react-icons/bs";

function Home() {

    const baseUrl = "http://localhost:8080";
    const [Lmenu, setLmenu] = useState([]);

    const [menuName, setMenuName] = useState("");
    const [menuSep, setMenuSeq] = useState(0);
   
    const [menuVisible, setMenuVisible] = useState(false);

    useEffect(() => {
        axios.get(baseUrl + '/menu/menulist').then(response => setLmenu(response.data)).catch(error => console.log(error))
    }, []);

    return (
        <Container fluid>
            <Row>
                <Col md="auto" style={{ border: "1px solid black", padding: "0px", height: "100vh" }}>
                    <div className={style.lnb}>

                        <BsMenuButtonWideFill className={style.lnb_showDetailIcon} onClick={() => { setMenuVisible(!menuVisible) }} /><hr style={{ border: "2px solid white" }} />

                        {
                            Lmenu && Lmenu.map((menu) => {
                                return (
                                    <div key={menu.menuSeq}>
                                        <VscGithubInverted onClick={() => { setMenuVisible(!menuVisible) }} className={style.lnb_menuIcon} />
                                        {menuVisible &&
                                            <button className={style.lnb_callMenu} 
                                                    onClick={() => { 
                                                        setMenuName(menu.menuName);
                                                        setMenuSeq(menu.menuSeq);
                                                    }}>{menu.menuName}</button>
                                        }
                                    </div>);
                            })
                        }

                    </div>
                </Col>

                <Col style={{ border: "1px solid black", padding: "0px" }}>
                    <Row><GNB menuName={menuName}/></Row>
                    <Row>
                        <Col className="subMenu" md="auto" style={{ border: "1px solid black", padding: "0px", width: "20%", height: "100vh", margin: "20px" }}><Outlet /></Col>
                        <Col className="contents"><Outlet /></Col>
                    </Row>
                </Col>
            </Row>

        </Container>

    );
}

export default Home;

{/* <div className="layout">
            <GNB />
            <div> */}
{/* <Col><LNB /></Col> */ }
        //         <Col>
        //             <Container>
        //                 <Outlet />
        //             </Container>
        //         </Col>
        //     </div>
        // </div>