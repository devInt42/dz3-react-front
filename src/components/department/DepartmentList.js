import CompanyData from "./CompanyData";
const DepartmentList = (props) => {
    return (
        <>
            <CompanyData setDepartmentSeq = {props.setDepartmentSeq} setWorkplaceSeq = {props.setWorkplaceSeq} 
            setCompanySeq = {props.setCompanySeq} refresh = {props.refresh}/>
        </>
    )
    
}
export default DepartmentList;