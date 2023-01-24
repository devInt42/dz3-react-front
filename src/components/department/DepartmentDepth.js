import { AiFillFolder } from 'react-icons/ai';

const DepartmentDepth = (props) => {
    return (
        <div>
            <div style={{ paddingLeft: props.departmentDepth * 20 + 20 }}>
                <AiFillFolder className="departmentlist-icon"/>
                {props.departmentCode}.{props.departmentName}
            </div>
            {
                props.department && props.department.map((department, idx) => {
                    <DepartmentDepth key={idx} department={department} />
                })
            }
        </div>
    )
}

export default DepartmentDepth;