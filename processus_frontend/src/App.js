import { BrowserRouter, Route, Routes }from 'react-router-dom';

import AddUser from './components/user/AddUser'
import ResetPassword from "./components/ResetPassword"
import Login from './components/Login'
import Header from './components/Header'
import Layout from './components/Layout';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import RequireAuth from './components/RequireAuth';
import User from './components/user/User';
import DataTable from './components/commission/CommissionTable'
import AddCommission from './components/commission/AddCommission';
import AddStructure from './components/Structure/AddStructure';
import Structure from './components/Structure/Structure';
import Admine from './components/AdminHome';
import Commission from './components/commission/commission';
import NavAdmin from './components/NavAdmin';
function App() {
  const ROLES = {
    'User': 2001,
    'Editor': 1984,
    'Admin': 5150
  }
  return (
    <>
     
     <Routes>
      <Route path="/" element={<Layout />}>
      <Route path="addStructure" element={
        <div>
      <NavAdmin></NavAdmin>
      <AddStructure/>
      </div>} />
      
        {/* public routes */}
        <Route path="addCommission" element={
        <div>
          <NavAdmin></NavAdmin>
        <AddCommission/>
        </div>
        } />
        
        <Route path="commission" element={<Commission/>} />
        <Route path="users" element={<User />} />
        <Route path="structure" element={<Structure/>} />
        <Route path="login" element={<Login />} />
        <Route path="addUser" element={
        <div>
          <NavAdmin></NavAdmin>
           <AddUser />
        </div>
      } />
        <Route path="unauthorized" element={<Unauthorized />} />
       
       
        {/* we want to protect these routes */}
        <Route element={<RequireAuth allowedRoles={['ADMIN']} />}>
          <Route path="admin" element={<Admine />} />
          
        </Route>

      


        

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  
   
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
