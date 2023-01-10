import React from 'react';
import Company from './component/Company';
import {Route, Routes} from 'react-router-dom';
import CompanyDetail from './component/CompanyDetail';
import CompanyInsert from './component/CompanyInsert';
import CompanyUpdateform from './component/CompanyUpdateform';
import Test from './component/Test';
function App() {
    return (
        <div>
            <Routes>
            <Route exact path = '/company/info' element={<Company/>}/>
            <Route exact path = "/company/info/:companyCode" element={<CompanyDetail/>}/>
            <Route exact path = "/company/insert" element = {<CompanyInsert/>}/>
            <Route exact path = "/company/update/:companyCode" element={<CompanyUpdateform/>}/>
            <Route exact path = "/test" element = {<Test/>}/>
            </Routes>
        </div>
    );
}

export default App;