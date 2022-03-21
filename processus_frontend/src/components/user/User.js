import React from 'react';
import NavAdmin from '../NavAdmin';
import DataTable from './UserTable';
const User = () => {
  return ( 
    <div>
    <NavAdmin></NavAdmin>
    <div class="pcoded-main-container">
        <div class="pcoded-wrapper">
            <div class="pcoded-content">
                <div class="pcoded-inner-content"></div>
    <DataTable></DataTable>
    </div>
    </div>
    </div>
    </div>

  );
}
 
export default User;