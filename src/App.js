import React from 'react';
import Company from './components/company/Company';
import {Route, Routes} from 'react-router-dom';
import CompanyDetail from './components/company/CompanyDetail';
import CompanyInsert from './components/company/CompanyInsert';
import CompanyUpdateform from './components/company/CompanyUpdateform';
function App() {
    return (
        <div>
            <Routes>
            <Route exact path = '/company/info' element={<Company/>}/>
            <Route exact path = "/company/info/:companyCode" element={<CompanyDetail/>}/>
            <Route exact path = "/company/insert" element = {<CompanyInsert/>}/>
            <Route exact path = "/company/update/:companyCode" element={<CompanyUpdateform/>}/>
            </Routes>
        </div>
    );
}

export default App;