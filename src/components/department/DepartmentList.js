import CompanyData from "./CompanyData";
const DepartmentList = (props) => {
    return (
        <>
            <CompanyData setDepartmentSeq = {props.setDepartmentSeq} setWorkplaceSeq = {props.setWorkplaceSeq} 
            setCompanySeq = {props.setCompanySeq} refresh = {props.refresh} setSearch = {props.setSearch}
            setDetailFlag = {props.setDetailFlag}/>
        </>
    )
    
}
export default DepartmentList;