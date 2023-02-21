import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";

import styles from "./css/MenuIcons.module.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
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
                  <TableRow>
                    <TableCell
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      <img
                        src={process.env.PUBLIC_URL + "/menuIcons/icon1.png"}
                        className={styles.icons}
                        onClick={() => props.setImgFile("/menuIcons/icon1.png")}
                      />
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      <img
                        src={process.env.PUBLIC_URL + "/menuIcons/icon2.png"}
                        className={styles.icons}
                        onClick={() => props.setImgFile("/menuIcons/icon2.png")}
                      />
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      <img
                        src={process.env.PUBLIC_URL + "/menuIcons/icon3.png"}
                        className={styles.icons}
                        onClick={() => props.setImgFile("/menuIcons/icon3.png")}
                      />
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      <img
                        src={process.env.PUBLIC_URL + "/menuIcons/icon4.png"}
                        className={styles.icons}
                        onClick={() => props.setImgFile("/menuIcons/icon4.png")}
                      />
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      <img
                        src={process.env.PUBLIC_URL + "/menuIcons/icon5.png"}
                        className={styles.icons}
                        onClick={() => props.setImgFile("/menuIcons/icon5.png")}
                      />
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      <img
                        src={process.env.PUBLIC_URL + "/menuIcons/icon6.png"}
                        className={styles.icons}
                        onClick={() => props.setImgFile("/menuIcons/icon6.png")}
                      />
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      <img
                        src={process.env.PUBLIC_URL + "/menuIcons/icon7.png"}
                        className={styles.icons}
                        onClick={() => props.setImgFile("/menuIcons/icon7.png")}
                      />
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      <img
                        src={process.env.PUBLIC_URL + "/menuIcons/icon8.png"}
                        className={styles.icons}
                        onClick={() => props.setImgFile("/menuIcons/icon8.png")}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      <img
                        src={process.env.PUBLIC_URL + "/menuIcons/icon9.png"}
                        className={styles.icons}
                        onClick={() => props.setImgFile("/menuIcons/icon9.png")}
                      />
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      <img
                        src={process.env.PUBLIC_URL + "/menuIcons/icon10.png"}
                        className={styles.icons}
                        onClick={() =>
                          props.setImgFile("/menuIcons/icon10.png")
                        }
                      />
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      <img
                        src={process.env.PUBLIC_URL + "/menuIcons/icon11.png"}
                        className={styles.icons}
                        onClick={() =>
                          props.setImgFile("/menuIcons/icon11.png")
                        }
                      />
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      <img
                        src={process.env.PUBLIC_URL + "/menuIcons/icon12.png"}
                        className={styles.icons}
                        onClick={() =>
                          props.setImgFile("/menuIcons/icon12.png")
                        }
                      />
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      <img
                        src={process.env.PUBLIC_URL + "/menuIcons/icon14.png"}
                        className={styles.icons}
                        onClick={() =>
                          props.setImgFile("/menuIcons/icon14.png")
                        }
                      />
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      <img
                        src={process.env.PUBLIC_URL + "/menuIcons/icon15.png"}
                        className={styles.icons}
                        onClick={() =>
                          props.setImgFile("/menuIcons/icon15.png")
                        }
                      />
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      <img
                        src={process.env.PUBLIC_URL + "/menuIcons/icon16.png"}
                        className={styles.icons}
                        onClick={() =>
                          props.setImgFile("/menuIcons/icon16.png")
                        }
                      />
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      <img
                        src={process.env.PUBLIC_URL + "/menuIcons/icon18.png"}
                        className={styles.icons}
                        onClick={() =>
                          props.setImgFile("/menuIcons/icon18.png")
                        }
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      <img
                        src={process.env.PUBLIC_URL + "/menuIcons/icon19.png"}
                        className={styles.icons}
                        onClick={() =>
                          props.setImgFile("/menuIcons/icon19.png")
                        }
                      />
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      <img
                        src={process.env.PUBLIC_URL + "/menuIcons/icon20.png"}
                        className={styles.icons}
                        onClick={() =>
                          props.setImgFile("/menuIcons/icon20.png")
                        }
                      />
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      <img
                        src={process.env.PUBLIC_URL + "/menuIcons/icon21.png"}
                        className={styles.icons}
                        onClick={() =>
                          props.setImgFile("/menuIcons/icon21.png")
                        }
                      />
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      <img
                        src={process.env.PUBLIC_URL + "/menuIcons/icon22.png"}
                        className={styles.icons}
                        onClick={() =>
                          props.setImgFile("/menuIcons/icon22.png")
                        }
                      />
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      <img
                        src={process.env.PUBLIC_URL + "/menuIcons/icon23.png"}
                        className={styles.icons}
                        onClick={() =>
                          props.setImgFile("/menuIcons/icon23.png")
                        }
                      />
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      <img
                        src={process.env.PUBLIC_URL + "/menuIcons/icon24.png"}
                        className={styles.icons}
                        onClick={() =>
                          props.setImgFile("/menuIcons/icon24.png")
                        }
                      />
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      <img
                        src={process.env.PUBLIC_URL + "/menuIcons/icon25.png"}
                        className={styles.icons}
                        onClick={() =>
                          props.setImgFile("/menuIcons/icon25.png")
                        }
                      />
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      <img
                        src={process.env.PUBLIC_URL + "/menuIcons/icon27.png"}
                        className={styles.icons}
                        onClick={() =>
                          props.setImgFile("/menuIcons/icon27.png")
                        }
                      />
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      <img
                        src={process.env.PUBLIC_URL + "/menuIcons/icon28.png"}
                        className={styles.icons}
                        onClick={() =>
                          props.setImgFile("/menuIcons/icon28.png")
                        }
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      <img
                        src={process.env.PUBLIC_URL + "/menuIcons/icon26.png"}
                        className={styles.icons}
                        onClick={() =>
                          props.setImgFile("/menuIcons/icon26.png")
                        }
                      />
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      <img
                        src={process.env.PUBLIC_URL + "/menuIcons/icon13.png"}
                        className={styles.icons}
                        onClick={() =>
                          props.setImgFile("/menuIcons/icon13.png")
                        }
                      />
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      <img
                        src={process.env.PUBLIC_URL + "/menuIcons/icon17.png"}
                        className={styles.icons}
                        onClick={() =>
                          props.setImgFile("/menuIcons/icon17.png")
                        }
                      />
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      <img
                        src={
                          process.env.PUBLIC_URL + "/menuIcons/calculator.png"
                        }
                        className={styles.icons}
                        onClick={() =>
                          props.setImgFile("/menuIcons/calculator.png")
                        }
                      />
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      <img
                        src={process.env.PUBLIC_URL + "/menuIcons/calendar.png"}
                        className={styles.icons}
                        onClick={() =>
                          props.setImgFile("/menuIcons/calendar.png")
                        }
                      />
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      <img
                        src={process.env.PUBLIC_URL + "/menuIcons/email.png"}
                        className={styles.icons}
                        onClick={() => props.setImgFile("/menuIcons/email.png")}
                      />
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      <img
                        src={process.env.PUBLIC_URL + "/menuIcons/phone.png"}
                        className={styles.icons}
                        onClick={() => props.setImgFile("/menuIcons/phone.png")}
                      />
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      <img
                        src={process.env.PUBLIC_URL + "/menuIcons/printer.png"}
                        className={styles.icons}
                        onClick={() =>
                          props.setImgFile("/menuIcons/printer.png")
                        }
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      <img
                        src={process.env.PUBLIC_URL + "/menuIcons/script.png"}
                        className={styles.icons}
                        onClick={() =>
                          props.setImgFile("/menuIcons/script.png")
                        }
                      />
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      <img
                        src={
                          process.env.PUBLIC_URL + "/menuIcons/statistics.png"
                        }
                        className={styles.icons}
                        onClick={() =>
                          props.setImgFile("/menuIcons/statistics.png")
                        }
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default Icons;
