import { Button } from '@mui/material';
import React from 'react';
import NavAdmin from '../NavAdmin';
import DataTable from './UserTable';
import useAuth from '../hooks/useAuth';
const User = () => {
  const {auth,setAuth}=useAuth();
  const test=()=>{
    console.log(auth,"this is")
  }
  return ( 
    
    <div>

    
    <NavAdmin></NavAdmin>
    <div class="pcoded-main-container">
        <div class="pcoded-wrapper">
            <div class="pcoded-content">
                <div class="pcoded-inner-content">
                <button onClick={test} > cilck me to logeed n user</button>
                </div>
    <DataTable></DataTable>
    </div>
    </div>
    </div>
    
    </div>

  );
}
 
export default User;