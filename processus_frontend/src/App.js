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
import CheckBoxPrivelage from './components/AppRole/CheckBoxPrivelage';
import AppRole from './components/AppRole/AppRole'
<<<<<<< HEAD
import FileApp from './components/dossierAchat/FileApp';
=======
import AddDossier from './components/dossierAchat/AddDossier';
import FileApp from './components/dossierAchat/FileApp';
import FilePdf from './components/dossierAchat/FilePdf'
import DemandeAchatTable from './components/dossierAchat/DemandeAchatTable';
import ListeDemandeEnregistrer from './components/dossierAchat/tableauxDemande/ListeDemandeEnregistrer';


>>>>>>> d46ebd7667dada70b9e6fe3bc0c9ac0a64da747e
function App() {
 

  return (
<<<<<<< HEAD
    <>
     
     <Routes>
      <Route path="/" element={<Layout />}>
      <Route path="login" element={<Login/>}/>
      <Route path="users" element={<User />} />
      <Route path="role" element={<AppRole />} />
      
      <Route path="file" element={<FileApp></FileApp>}></Route>
        <Route path="unauthorized" element={<Unauthorized />} />
       
        <Route path="commission" element={<Commission/>} />
        <Route path="users" element={<User />} />
        <Route path="structure" element={<Structure/>} />
        <Route path="addStructure" element={
        <div>
      <NavAdmin></NavAdmin>
      <AddStructure/>
      </div>} />
      
        
        <Route path="addCommission" element={
        <div>
          <NavAdmin></NavAdmin>
        <AddCommission/>
        </div>
        } />
          <Route path="addUser" element={
        <div>
          <NavAdmin></NavAdmin>
           <AddUser />
        </div>
      } />
        {/* we want to protect these routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
        <Route path="commission" element={<Commission/>} />
        <Route path="users" element={<User />} />
        <Route path="structure" element={<Structure/>} />
        <Route path="addStructure" element={
        <div>
      <NavAdmin></NavAdmin>
      <AddStructure/>
      </div>} />
      
        
        <Route path="addCommission" element={
        <div>
          <NavAdmin></NavAdmin>
        <AddCommission/>
        </div>
        } />
          <Route path="addUser" element={
        <div>
          <NavAdmin></NavAdmin>
           <AddUser />
        </div>
      } />
          
        </Route>

      


        

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  
=======
   <>
   <NavAdmin /> 
>>>>>>> d46ebd7667dada70b9e6fe3bc0c9ac0a64da747e
   
    {/*<ListeDemandeEnregistrer /> <AddDossier />   */}
    <DemandeAchatTable/>
    

  
  </>
   
      
      
  );
}

export default App;
