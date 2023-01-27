import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

import style from "../css/SystemSet.module.css";
import MenuSet from "./MenuSet";
import { Outlet, useNavigate } from "react-router-dom";
import ContentsMapping from "./ContentsMapping";

import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';

function SubMenu(props) {
  const navigate = useNavigate();

  // const sendLastSeq = (lastSeq) => {
  //   <ContentsMapping />
  //   console.log(lastSeq)
  //   console.log("여기까지는 오는데 왜 안돼 ㅅㅂ")

  //   props.getLastMenuSeq(lastSeq);
  // }

  const [lastSeq, setLastSeq] = useState(0);

  const menuSequence = props.menuSeq;

  const baseUrl = "http://localhost:8080";
  const [subMenu, setSubMenu] = useState([]);

  const [childMenu, setChildMenu] = useState([]);
  const [isActive, setIsActive] = useState(false);

  console.log("childfhfghfghfghfghfghfgh" + childMenu)
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
                    paddingLeft: (menu.menuDepth - 1) * 20,
                    paddingRight: "20px",}}>
                  <div className={style.menu_btn}
                    onClick={() => {childMenu.includes(menu.menuSeq) ? setChildMenu(childMenu.filter(data => data != menu.menuSeq)) :
                     setChildMenu([...childMenu, menu.menuSeq]);}}>
                   {menu.menuName}
                  </div>
                </div>
                {childMenu.includes(menu.menuSeq)  && (
                  <SubMenu menuSeq={menu.menuSeq} />
                )}
              </div>
            );
          })}
          {lastSeq == 0 ? <></> : <ContentsMapping lastSeq={lastSeq} />}
        </div>
      )}
    </div>


    // <TreeView
    //   aria-label="file system navigator"
    //   defaultCollapseIcon={<ExpandMoreIcon />}
    //   defaultExpandIcon={<ChevronRightIcon />}
    //   sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
    // >
    //      {menuSequence == 0 ? (<></>) : (
    //     <div>
    //       {subMenu.map((menu) => {
    //         return (
    //         <div>
    //             <div onClick={() => { setIsActive(true); setChildMenu(menu.menuSeq);}}>
    //                <TreeItem key={menu.menuSeq} nodeId={menu.menuSeq} label={menu.menuName}/>
    //               </div>
    //             {childMenu == menu.menuSeq && isActive && (
    //               <SubMenu menuSeq={menu.menuSeq} />
    //             )}
    //           </div>
    //         );
    //       })}
    //       {lastSeq == 0 ? <></> : <ContentsMapping lastSeq={lastSeq} />}
    //     </div>
    //   )}
    // </TreeView>
  );
}

export default React.memo(SubMenu);
