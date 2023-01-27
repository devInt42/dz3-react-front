import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { AiFillFolder, AiFillFolderOpen } from 'react-icons/ai';

const DepartmentDepth = (props) => {

    const baseUrl = "http://localhost:8080";
    const [departmentIsOpen, setDepartmentIsOpen] = useState(false);
    const [department, setDepartment] = useState([]);
    useEffect(() => {
        axios.get(`${baseUrl}/department/list/${props.depth}`)
            .then(res => setDepartment(res.data))
            .catch(error => console.log(error));
    }, [])
    return (
        <div>
            <div style={{ paddingLeft: props.departmentDepth * 20 + 20 }}
                onClick={() => {
                    setDepartmentIsOpen(!departmentIsOpen);
                }}>
                <div>
                    {departmentIsOpen ? <AiFillFolderOpen className="departmentlist-icon" /> :
                        <AiFillFolder className="departmentlist-icon" />}
                </div>
            </div>
            {
                department && department.map((child, idx) => {
                    return (
                        <div>
                            {departmentIsOpen && <DepartmentDepth depth={child.departmentDepth + 1} key={idx} />}
                        </div>
                    )

                })
            }
        </div>
    )
}

export default DepartmentDepth;