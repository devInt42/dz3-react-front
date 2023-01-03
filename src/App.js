import React from 'react';
import Company from './component/Company';
import {Route, Routes} from 'react-router-dom';
import CompanyDetail from './component/CompanyDetail';
import CompanyInsert from './component/CompanyInsert';

function App() {
    return (
        <div>
            <Routes>
            <Route exact path = '/company/info' element={<Company/>}/>
            <Route exact path = "/company/info/:companyCode" element={<CompanyDetail/>}/>
            <Route exact path = "/company/insert" element = {<CompanyInsert/>}/>
            </Routes>
        </div>
    );
}

export default App;