import React from 'react';
import Company from './component/Company';
import {Route, Routes} from 'react-router-dom';
function App() {
    return (
        <div>
            <Routes>
            <Route exact path = '/company' element={<Company/>}/>
            </Routes>
        </div>
    );
}

export default App;