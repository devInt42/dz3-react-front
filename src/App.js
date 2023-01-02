import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Proxytest from "./components/Proxytest";
import Home from "./pages/HomePage";
import Employee from "./pages/Employee";

function App() {

    const baseUrl = "http://localhost:8080"
//    const [hello, setHello] = useState('')

//     useEffect(() => {
      
//         axios.get('/api/hello')
//         .then(response => setHello(response.data))
//         .catch(error => console.log(error))
//     }, []);

//     return (
//         <div>
//             백엔드에서 가져온 데이터입니다 : {hello}
//         </div>
//     );

    // const [user2, setUser2] = useState([]);
    // useEffect(()=>{
    //     axios.get(baseUrl+'/user/userlist').then(response => setUser2(response.data)).catch(error => console.log(error))
    // }, []);

    // return(
    //     <div>
    //         {user2.map((user2, i)=>{
    //             return(
    //             <div key={i}>
    //                 <div>id : {user2.id}</div><br />
    //                 <div>이름 : {user2.name}</div><br />
    //                 <div>회사 : {user2.company}</div><br />
    //                 <hr />
    //             </div>
    //             );
    //         })}
            
    //     </div>
    // );
  return (
    <Router>
      <Routes>
        <Route path="/dz3/">
          <Route path="" element={<Home />} />
          <Route path="test" element={<Proxytest />} />
          <Route path="employee" element={<Employee/>}/>
        </Route>
      </Routes>
    </Router>
  );

}

export default App;
