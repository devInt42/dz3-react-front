import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

import ContentsMapping from "./ContentsMapping";
import NotSelectedMenu from "./NotSelectedMenu"

import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { FiPlusSquare } from "react-icons/fi";
import style from "../components/menu/css/SystemSet.module.css";

import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';

function CallMenu(props) {

    const [lastSeq, setLastSeq] = useState(0);

    const menuSequence = props.menuSeq;

    const baseUrl = "http://localhost:8080";
    const [subMenu, setSubMenu] = useState([]);

    const [childMenu, setChildMenu] = useState([]);
    
    const getSubMenuList = useCallback(async () => {
        try {
            const apiResult = await axios({
                url: baseUrl + "/menu/menulist/" + menuSequence,
                method: "get",
            });
            //console.log(apiResult.data)
            if (apiResult.data == 0) {
                setLastSeq(menuSequence);
            } else {
                setSubMenu(apiResult.data);
            }
        } catch (error) {
            console.log(error);
        }
    }, [menuSequence]);

    useEffect(() => {
        getSubMenuList();
    }, [menuSequence]);

    return (
        <div>
            {menuSequence == 0 ? (
                <></>
            ) : (
                <div>
                    {subMenu.map((menu) => {
                        return (
                            <div className={style.check} key={menu.menuSeq}>
                                <div className={style.item}
                                    style={{
                                        paddingLeft: (menu.menuDepth -1) * 10,
                                        paddingRight: "20px",
                                    }}>
                                    <div className={style.menu_btn}
                                        onClick={() => {
                                            childMenu.includes(menu.menuSeq) ? setChildMenu(childMenu.filter(data => data != menu.menuSeq)) :
                                            setChildMenu([...childMenu, menu.menuSeq]);
                                        }}>{
                                            menu.menuDepth == 1 ?
                                                <div style={{backgroundColor : "rgba(195, 201, 206, 0.63)"}}>
                                                    {childMenu.includes(menu.menuSeq) ? <MdExpandLess/> : <MdExpandMore/>}{menu.menuName}
                                                </div> : 
                                                <div className={style.menu_sub}>{menu.menuName}</div>
                                            }
                                        
                                    </div>
                                </div>
                                {childMenu.includes(menu.menuSeq) && (
                                    <CallMenu menuSeq={menu.menuSeq} />
                                )}
                            </div>
                        );
                    })}
                    {lastSeq == 0 ? <NotSelectedMenu></NotSelectedMenu>: <ContentsMapping lastSeq={lastSeq} />}
                </div>
            )}
        </div>
        // <TreeView
        //     aria-label="file system navigator"
        //     defaultCollapseIcon={<ExpandMoreIcon />}
        //     defaultExpandIcon={<ChevronRightIcon />}
        //     sx={{ flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
        // >
        //     {menuSequence == 0 ? (<></>) : (
        //         <div>
        //             {subMenu.map((menu) => {
        //                 return (
        //                     <div key={menu.menuSeq}>
        //                         <TreeItem key={menu.menuSeq} nodeId={menu.menuSeq.toString()} label={menu.menuName} >
        //                             <CallMenu menuSeq={menu.menuSeq} />
        //                         </TreeItem>
        //                     </div>
        //                 );
        //             })}
        //             {lastSeq == 0 ? <></> : <ContentsMapping lastSeq={lastSeq} />}
        //         </div>
        //     )}
        // </TreeView>
    );
}

export default CallMenu;