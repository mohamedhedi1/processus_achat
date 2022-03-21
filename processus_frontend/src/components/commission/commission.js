import React from 'react';
import CommissionDataTable from './CommissionTable';
import NavAdmin from '../NavAdmin';
const Commission = () => {
    return ( 
        <div>
           <NavAdmin></NavAdmin>
        <div class="pcoded-main-container">
        <div class="pcoded-wrapper">
            <div class="pcoded-content">
                <div class="pcoded-inner-content">
        <CommissionDataTable>

        </CommissionDataTable>
        </div>
        </div>
        </div>
        </div>
        </div>
     );
}
 
export default Commission;