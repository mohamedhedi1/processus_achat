import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from './components/Nav'
import AddUser from './components/user/AddUser'
import ResetPassword from "./components/user/ResetPassword"
import Login from './components/Login'
import Header from './components/Header'
function App() {
  return (
    <>
    
    <BrowserRouter>
    
    <Routes>
      <Route index element={<Login></Login>}></Route>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/resetPassword" element={<ResetPassword/>}></Route>
      <Route path="/nav" element={<Nav />}></Route>
      <Route path="/header" element={<Header/>}></Route>
      
    </Routes>
    </BrowserRouter> 
  
  </>
   
      
      
  );
}
/*
function App() {
  return (
    <>
    
   <Login />
  </>
   
      
      
  );
}
*/
export default App;
