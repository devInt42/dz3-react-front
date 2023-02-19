<<<<<<< HEAD
import React, { useEffect, useState } from "react";

function Icons() {
  const icon1 =
    "M7 4V2h10v2h3.007c.548 0 .993.445.993.993v16.014a.994.994 0 0 1-.993.993H3.993A.994.994 0 0 1 3 21.007V4.993C3 4.445 3.445 4 3.993 4H7zm0 2H5v14h14V6h-2v2H7V6zm2-2v2h6V4H9z";

  return (
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <g>
          <path fill="none" d="M0 0h24v24H0z" />
          <path d={icon1} />
        </g>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <g>
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M20 22H6.5A3.5 3.5 0 0 1 3 18.5V5a3 3 0 0 1 3-3h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1zm-1-2v-3H6.5a1.5 1.5 0 0 0 0 3H19z" />
        </g>
      </svg>
    </div>
  );
=======
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';

import styles from "./css/MenuIcons.module.css"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function Icons(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button onClick={handleOpen}>찾기</Button>
            <Button onClick={() => props.setImgFile("")}>지우기</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div id="modal-modal-title" variant="h6" component="h2">
                        <b>사용할 메뉴 아이콘을 선택해 주세요.</b>
                    </div>
                    <div id="modal-modal-description" sx={{ mt: 2 }}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 550 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Icons</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow onClick={()=> {handleClose();}}>
                                        <TableCell><img src={process.env.PUBLIC_URL + "/menuIcons/icon1.png"} className={styles.icons} onClick={()=> props.setImgFile("/menuIcons/icon1.png")}/></TableCell>
                                        <TableCell><img src={process.env.PUBLIC_URL + "/menuIcons/icon2.png"} className={styles.icons} onClick={()=> props.setImgFile("/menuIcons/icon2.png")}/></TableCell>
                                        <TableCell><img src={process.env.PUBLIC_URL + "/menuIcons/icon3.png"} className={styles.icons} onClick={()=> props.setImgFile("/menuIcons/icon3.png")}/></TableCell>
                                        <TableCell><img src={process.env.PUBLIC_URL + "/menuIcons/icon4.png"} className={styles.icons} onClick={()=> props.setImgFile("/menuIcons/icon4.png")}/></TableCell>
                                        <TableCell><img src={process.env.PUBLIC_URL + "/menuIcons/icon5.png"} className={styles.icons} onClick={()=> props.setImgFile("/menuIcons/icon5.png")}/></TableCell>
                                        <TableCell><img src={process.env.PUBLIC_URL + "/menuIcons/icon6.png"} className={styles.icons} onClick={()=> props.setImgFile("/menuIcons/icon6.png")}/></TableCell>
                                        <TableCell><img src={process.env.PUBLIC_URL + "/menuIcons/icon7.png"} className={styles.icons} onClick={()=> props.setImgFile("/menuIcons/icon7.png")}/></TableCell>
                                        <TableCell><img src={process.env.PUBLIC_URL + "/menuIcons/icon8.png"} className={styles.icons} onClick={()=> props.setImgFile("/menuIcons/icon8.png")}/></TableCell>
                                        <TableCell><img src={process.env.PUBLIC_URL + "/menuIcons/icon9.png"} className={styles.icons} onClick={()=> props.setImgFile("/menuIcons/icon9.png")}/></TableCell>
                                        <TableCell><img src={process.env.PUBLIC_URL + "/menuIcons/icon10.png"} className={styles.icons} onClick={()=> props.setImgFile("/menuIcons/icon10.png")}/></TableCell>
                                        <TableCell><img src={process.env.PUBLIC_URL + "/menuIcons/calculator.png"} className={styles.icons} onClick={()=> props.setImgFile("/menuIcons/calculator.png")}/></TableCell>
                                        <TableCell><img src={process.env.PUBLIC_URL + "/menuIcons/calendar.png"} className={styles.icons} onClick={()=> props.setImgFile("/menuIcons/calendar.png")}/></TableCell>
                                        <TableCell><img src={process.env.PUBLIC_URL + "/menuIcons/email.png"} className={styles.icons} onClick={()=> props.setImgFile("/menuIcons/email.png")}/></TableCell>
                                        <TableCell><img src={process.env.PUBLIC_URL + "/menuIcons/phone.png"} className={styles.icons} onClick={()=> props.setImgFile("/menuIcons/phone.png")}/></TableCell>
                                        <TableCell><img src={process.env.PUBLIC_URL + "/menuIcons/printer.png"} className={styles.icons} onClick={()=> props.setImgFile("/menuIcons/printer.png")}/></TableCell>
                                        <TableCell><img src={process.env.PUBLIC_URL + "/menuIcons/script.png"} className={styles.icons} onClick={()=> props.setImgFile("/menuIcons/script.png")}/></TableCell>
                                        <TableCell><img src={process.env.PUBLIC_URL + "/menuIcons/statistics.png"} className={styles.icons} onClick={()=> props.setImgFile("/menuIcons/statistics.png")}/></TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </Box>
            </Modal>
        </div>
    );
>>>>>>> 3da230fe5c231f013b0b36350cee20c9aebdf4bd
}

export default Icons;
