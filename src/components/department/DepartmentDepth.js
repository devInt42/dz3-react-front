import axios from 'axios';
import { useEffect, useState } from 'react';
import { AiFillFolder, AiFillFolderOpen } from 'react-icons/ai';

const DepartmentDepth = (props) => {

    const baseUrl = "http://localhost:8080";
    const [department, setDepartment] = useState([]);
    const [depth, setDepth] = useState(0);
    const [seq, setSeq] = useState(0);
    const [count, setCount] = useState(0);
    const [index, setIndex] = useState([]);
    useEffect(() => {
        setDepth(props.depth + 1);
        setSeq(props.seq);
    }, [props])
    const getChildCount = async () => {
        let sendChild = {
            departmentDepth: depth,
            departmentParent: seq
        };
        try {
            let childRes = await axios.get(`${baseUrl}/department/count`, {
                params: sendChild
            });
            setCount(childRes);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getChildCount();
    }, [seq, depth])
    const getData = async () => {
        let sendChild = {
            departmentDepth: depth,
            departmentParent: seq,
        };
        try {
            if (count != 0) {
                const childRes = await axios.get(`${baseUrl}/department/list`, {
                    params: sendChild
                });
                setDepartment(childRes.data)
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getData();
    }, [count])
    
    useEffect(() => {
    },[props.refresh])

    useEffect(() => {
    }, [department])

    return (
        <div>
            {
                department && department.map((child) => {
                    return (
                        <div key={child.departmentSeq}>
                            {child.departmentParent == seq &&
                                <div style={{ paddingLeft: depth * 20 + 20 }}
                                    >
                                     <div onClick={() => {
                                        index.includes(child.departmentSeq) ?
                                        setIndex(index.filter(department => department !=child.departmentSeq)) :
                                        setIndex([...index, child.departmentSeq]);
                                        props.setWorkplaceSeq(child.workplaceSeq);
                                        props.setDepartmentSeq(child.departmentSeq);
                                        props.setCompanySeq(child.companySeq);
                                        props.setSearch(false);
                                        props.setDetailFlag(true);
                                    }}>
                                        {index.includes(child.departmentSeq) ? <AiFillFolderOpen className="departmentlist-icon" /> :
                                            <AiFillFolder className="departmentlist-icon" />}
                                        {child.departmentCode}.{child.departmentName}
                                    </div>
                                </div>
                            }
                            {index.includes(child.departmentSeq) && <DepartmentDepth depth={child.departmentDepth} 
                            key={child.departmentSeq} seq={child.departmentSeq} setDepartmentSeq = {props.setDepartmentSeq} 
                            setWorkplaceSeq = {props.setWorkplaceSeq} setCompanySeq = {props.setCompanySeq}
                            setSearch = {props.setSearch} setDetailFlag = {props.setDetailFlag} 
                            />}
                        </div>
                    )

                })
            }
        </div>
    )
}

export default DepartmentDepth;