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


export default function EmpPositionModal(props) {
    const baseUrl = "http://localhost:8080";
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [list, setList] = React.useState([]);
    
    function setP(value) {
        props.setPosition(value.position);
        props.setPositionCode(value.positionCode);
    }
    function setD(value) {
        props.setDuty(value.duty); 
        props.setDutyCode(value.dutyCode);
    }
    React.useEffect(() => {
       
        if(props.type === "POSITION") {
            axios.get(`${baseUrl}/department-employee/position`)
            .then(res => setList(res.data))
            .catch(error => console.log(error))
        }
        else if(props.type === "DUTY") {
            axios.get(`${baseUrl}/department-employee/duty`)
            .then(res => setList(res.data))
            .catch(error => console.log(error))
        }
        console.log(list);
    }, [])
    return (
        <div>
            <Button onClick={handleOpen}>찾기</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div id="modal-modal-title" variant="h6" component="h2">
                        <b>직급을 선택해 주십시오.</b>
                    </div>
                    <div id="modal-modal-description" sx={{ mt: 2 }}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 550 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>코드</TableCell>
                                        <TableCell>직급</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {

                                        list && list.map((item, idx) => {
                                            return (
                                                <TableRow key={idx} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    onClick={() => {
                                                        props.type === "POSITION" ?
                                                        setP(item) :
                                                        setD(item)
                                                        handleClose();
                                                    }}
                                                    id="item-modal"
                                                >
                                                {
                                                props.type === "POSITION" && 
                                                <>
                                                    <TableCell>{item.positionCode}</TableCell>
                                                    <TableCell>{item.position}</TableCell>
                                                </>
                                                }
                                                {
                                                    props.type === "DUTY" &&
                                                    <>
                                                        <TableCell>{item.dutyCode}</TableCell>
                                                        <TableCell>{item.duty}</TableCell>
                                                    </>
                                                }
                                                    
                                                    
                                                </TableRow>
                                            )
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}