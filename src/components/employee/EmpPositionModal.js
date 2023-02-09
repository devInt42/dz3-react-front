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
    const [departmentList, setDepartmentList] = React.useState([]);
    React.useEffect(() => {
        if(props.companySeq != null && props.companySeq != undefined) {
        axios.get(`${baseUrl}/department-employee/select/list/${props.companySeq}`)
            .then(res => setDepartmentList(res.data))
            .catch(error => console.log(error))
        }
    }, [props.companySeq])
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
                        <b>부서를 선택해 주십시오.</b>
                    </div>
                    <div id="modal-modal-description" sx={{ mt: 2 }}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 550 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>회사</TableCell>
                                        <TableCell>사업장</TableCell>
                                        <TableCell>부서 코드</TableCell>
                                        <TableCell>부서</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {

                                        departmentList && departmentList.map((department, idx) => {
                                            return (
                                                <TableRow key={idx} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    onClick={() => {
                                                        props.setDepartmentSeq(department.departmentSeq);
                                                        props.setDepartmentName(department.departmentName);
                                                        props.setDepartmentCall(department.departmentCall);
                                                        props.setDepartmentFax(department.departmentFax);
                                                        props.setWorkplaceSeq(department.workplaceSeq);
                                                        handleClose();
                                                    }}
                                                    id="department-modal"
                                                >
                                                    <TableCell>{department.companyName}</TableCell>
                                                    <TableCell>{department.workplaceName}</TableCell>
                                                    <TableCell>{department.departmentCode}</TableCell>
                                                    <TableCell>{department.departmentName}</TableCell>
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