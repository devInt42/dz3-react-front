import { useCallback, useEffect, useState } from 'react';
import { AiFillFolder,AiFillFolderOpen } from 'react-icons/ai';

const DepartmentDepth = (props) => {

    const [departmentIsOpen, setDepartmentIsOpen] = useState(false);
    const [depth, setDepth] = useState([]);
    const save = {};
    
    return (
        <div>
            <div style={{ paddingLeft: props.departmentDepth * 20 + 20 }} 
            onClick = {()=> {
                setDepartmentIsOpen(!departmentIsOpen);
                setDepth([...depth, props.departmentDepth]);
            }}>

                <div>
                {departmentIsOpen ? <AiFillFolderOpen className="departmentlist-icon"/>: 
                <AiFillFolder className = "departmentlist-icon"/> }
                {props.departmentCode}.{props.departmentName}
                </div>

            </div>
            {
                props.department && props.department.map((child, idx) => {
                    return(
                        <div>
                            {departmentIsOpen && <DepartmentDepth child = {child} key = {idx}/>}
                            {console.log("gdgd")}
                        </div>
                    )
                    
                })
            }
        </div>
    )
}

export default DepartmentDepth;