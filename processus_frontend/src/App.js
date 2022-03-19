import { BrowserRouter, Route, Routes }from 'react-router-dom';
import Nav from './components/Nav'
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
        {/* public routes */}
        <Route path="comtable" element={<DataTable/>} />
        <Route path="com" element={<AddCommission/>} />
        <Route path="l" element={<User />} />
        <Route path="login" element={<Login />} />
        <Route path="user" element={<AddUser />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="users" element={<DataTable />} />
        {/* we want to protect these routes */}
        <Route element={<RequireAuth allowedRoles={['ADMIN']} />}>
          <Route path="users" element={<DataTable />} />
          <Route path="user" element={<AddUser />} />
        </Route>

      


        <Route element={<RequireAuth allowedRoles={['USER']} />}>
          <Route path="n" element={<Nav></Nav>} />
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
