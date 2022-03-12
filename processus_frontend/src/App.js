import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from './components/Nav'
import Navo from './components/Navo'
import AddUser from './components/user/AddUser'
import ResetPassword from "./components/user/ResetPassword"
import Login from './components/Login'
import Header from './components/Header'
import AddCommission from './components/commission/AddCommission';
/*function App() {
  return (
    <>
    
    <BrowserRouter>
    
    <Routes>
    
      <Route index element={<Login></Login>}></Route>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/resetPassword" element={<ResetPassword/>}></Route>
      <Route path="/nav" element={<><Nav></Nav></>}></Route>
      <Route path="/header" element={<Header/>}></Route>
      
    </Routes>
    </BrowserRouter> 
  
  </>
   
      
      
  );
}*/
/*
    private String emailId;
    private String firstName;
    private String lastName;
    private String post;
    private String cin;
    
    private String password;
*/

function App() {
  return (
    <>
   <Nav/>
   <AddUser></AddUser>
   <AddCommission></AddCommission>
  </>
   
      
      
  );
}

export default App;
