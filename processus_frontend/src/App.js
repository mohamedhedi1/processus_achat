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

import AddDossier from './components/dossierAchat/AddDossier';
import FileApp from './components/dossierAchat/FileApp';
import FilePdf from './components/dossierAchat/FilePdf'
import DemandeAchatTable from './components/dossierAchat/DemandeAchatTable';
import ListeDemandeEnregistrer from './components/dossierAchat/tableauxDemande/ListeDemandeEnregistrer';

import Home from'./components/OTHERS/home';

function App() {
 
  const ROLES={
    APPROUVATION_de_CPT:1,
    PREPARATION_DE_PROJET_DE_CCAP:2,
    FINALISATION_CC_ET_PREPARATION_LA_METHODOLOGIE_DE_DEPOUILLEMENT:3,
    APPROUVATIONLE_CC:4,
    AFFECTATION_DE_DOSSIER_D_ACHAT:5,
    PLANTIFICATION_LES_DATES_DE_LANCEMENTDE_L_AO:6,
    DESIGNATION_DES_MEMBRES_DE_COMMISSION_D_EVALUATION:7,
    DEMANDEUR:8,
    ADMIN:9,

  }
  return (
    <>
     
     <Routes>
      <Route path="/" element={<Layout />}>
      <Route path="login" element={<Login/>}/>
     
      <Route path="file" element={<FileApp></FileApp>}></Route>
        <Route path="unauthorized" element={<Unauthorized />} />
       
        
        <Route element={<RequireAuth allowedRoles={[ROLES.PREPARATION_DE_PROJET_DE_CCAP]} />}>
        <Route path="/non_admin" element={<Home/>}/>
          </Route>

        {/* we want to protect these routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
        <Route path="commission" element={<Commission/>} />
        <Route path="users" element={<User />} />
        <Route path="addUser" element={
        <div>
          <NavAdmin></NavAdmin>
          <AddUser />
        </div>
          } />
          <Route path="addCommission" element={
        <div>
          <NavAdmin></NavAdmin>
        <AddCommission/>
        </div>
           } />
          < Route path="addStructure" element={
        <div>
      <NavAdmin></NavAdmin>
      <AddStructure/>
      </div>} />
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
           <AddUser/>
        </div>
      } />     
        </Route>

      


        

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  
=======


    {/*<ListeDemandeEnregistrer /> <AddDossier />   */}

    

  
  </>
   
      
      
  );
}

export default App;
