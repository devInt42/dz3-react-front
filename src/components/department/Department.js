import DepartmentDetail from './DepartmentDetail';
import DepartmentList from './DepartmentList';


const Department = () => {

    return (
        <div>

            <h2>회사 정보</h2>
            <hr className="line"></hr>

            <div department-info>
                <DepartmentList />
                <DepartmentDetail />
            </div>
        </div>
    )
}

export default Department;