
const CompanySearch = () => {


    return (
        <div>
            회사 <input type="text" placeholder='회사코드/회사명을 입력하세요.'
                onChange={e => {
                    isNaN(e.target.value) ? (setSearchCompanyName(e.target.value) || setSearchCompanyCode(0))
                        : (setSearchCompanyCode(e.target.value) || setSearchCompanyName(""))
                }} />
            사용여부 <select onChange={e => setSearchUseYN(e.target.value)}>
                <option value="Y" selected>사용</option>
                <option value="N">미사용</option>
            </select>
            <button onClick={FindCompany}>찾기</button>
        </div>
    )
}