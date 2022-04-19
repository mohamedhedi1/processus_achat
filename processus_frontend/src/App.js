import { BrowserRouter, Route, Routes, useLocation }from 'react-router-dom';

import Activite1 from './activites/activite1/Activite1';
import Activite2 from './activites/Activite2/Activite2';
import Activite3 from './activites/activite3/Activite3';
import Activite4 from './activites/activite4/Activite4';
import Activite5 from './activites/activite5/Activite5';
import Activite7 from './activites/activite7/Activite7';
import DemandesAchatEnvoye from './demandeAchat/previewdemandeenvoye/DemandesAchatEnvoye';
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


import  HorizontalStepper from './demandeAchat/previewdemandeenvoye/HorizontalStepper';
import DemandeAchatEnregistrer from './demandeAchat/previewdossier/DemandeAchatEnregistrer';
import { Navigate } from 'react-router-dom';

import Activite6 from './activites/activite6/Activite6';
import Activite8 from './activites/activite8/Activite8';
import Home from'./components/OTHERS/home';
import AjouterDemandeAchat from './demandeAchat/AjouterDemandeAchat';
import Etape7 from './activites/activite7/Etape7';
import Test from './demandeAchat/images/Test'
import Navbar from './components/Navbar';
import Etape9 from './activites/activite9/Etape9';
import useAuth from './components/hooks/useAuth';
import Activite9 from './activites/activite9/Activite9';
import { useEffect } from 'react';
import { Refresh } from '@mui/icons-material';
import RefreshTest from './RefreshTest';

import { useState } from 'react';
import axios from 'axios';
function App() {
  const { auth,setAuth } = useAuth();
  const [roles,setRoles]=useState();
  const [user,setUser] =useState();
  const [all,setall] =useState();
  const location =useLocation();
  useEffect(()=>{
    if(user==null){
      async function fetchData() {
          const response=await axios.get("http://localhost:8080/api/v1/user/AllMails")
          const r2=await response.data
         
          
          let roles=JSON.parse(localStorage.getItem("roles"));
         
          let user=JSON.parse(localStorage.getItem("user"))
           setall({user,roles})
          setUser(user)
         
      
      }
      fetchData()
      console.log(all)
      console.log("roles")
      console.log(roles)}
  },[user,roles,all])
  
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
   
   

    {/*<ListeDemandeEnregistrer /> <AddDossier />  <DemandeAchatTable />
    <DemandesAchatEnregistrer/>  
    
     <NavAdmin/>
    <DemandeAchatTable />
    <DemandesAchatEnregistrer />
    <AjouterDemandeAchat/>
    <Test />*/}
  
    <Routes>
      <Route path="/" element={<Layout />}>
      
      <Route path="navbar" element={ 
        
    <>
     <NavAdmin></NavAdmin>
    </>}/>
      <Route path="login" element={<Login/>}/>
      
      <Route path="demandeachatenregister" element={ <> 
        <Navbar></Navbar> 
          <DemandeAchatEnregistrer> 

          </DemandeAchatEnregistrer> </> 
        
        }/>
      <Route path="demandeachatenvoye" element={  <> 
        <Navbar></Navbar>  <DemandesAchatEnvoye/> </> }/>
  
      <Route path="ajoutdemandeachat" element={  <> 
        <Navbar></Navbar> <AjouterDemandeAchat/> </> }/>
       
      <Route path="activite1" element={  <> 
        <Navbar></Navbar>
       <Activite1></Activite1> 
      </>}/>
      <Route path="activite2" element={  
        <> 
        <Navbar></Navbar>
        <Activite2></Activite2>
        </>
        }/>
      <Route path="activite3" element={ <> 
        <Navbar></Navbar>
           <Activite3></Activite3>
           </>
          }/>
      <Route path="activite4" element={ <> 
         
        { 
         
         (localStorage.getItem("user") !== null) &&(
          
          <>
          
           <Navbar></Navbar>  
           <Activite4></Activite4>
        </>
        )
        } 
        {   (localStorage.getItem("user") == null) &&(
          console.log("navgifze"),
      
          <Navigate to="/login" state={{ from: location }} replace />
        )
        }
             
        
        </>}/>
      <Route path="activite5" element={ <> 
        <Navbar></Navbar>   <Activite5></Activite5></>}/>
      <Route path="activite6" element={ <> 
        
        <Navbar></Navbar>   <Activite6></Activite6>
       
        </>}/>
        <Route path="activite7" element={ <> 
        <Navbar></Navbar>   <Activite7></Activite7></>}/>
        <Route path="activite9" element={ <> 
        <Navbar></Navbar>   <Activite9></Activite9></>}/>
        <Route path="activite8" element={ <> 
        
        
        <Navbar></Navbar>   <Activite8></Activite8></>}/>
      <Route path="commission" element={  <> 
        <Navbar></Navbar> <Commission/> </> } />
        <Route path="users" element={
            <> 
        <Navbar></Navbar> 
        <User /> 
        </> } />
        <Route path="addUser" element={
        <div>
           
        <Navbar></Navbar>
          <AddUser />
        </div>
          } />
          <Route path="addCommission" element={
        <div>
           <Navbar></Navbar>
        <AddCommission/>
        </div>
           } />
          < Route path="addStructure" element={
        <div>
       <Navbar></Navbar>
      <AddStructure/>
      </div>} />
        <Route path="structure" element={ 
      <div>
        <Navbar></Navbar>
        <Structure/>
        </div>} />

        <Route path="addCommission" element={
        <div>
       
       <Navbar></Navbar>
        <AddCommission/>
        </div>
        } />
          <Route path="addUser" element={
        <div>
           <Navbar></Navbar>
           <AddUser/>
        </div>
    
      } />  
      <Route path="file" element={<FileApp></FileApp>}></Route>
        <Route path="unauthorized" element={<Unauthorized />} />
       
        
        <Route element={<RequireAuth allowedRoles={[ROLES.PREPARATION_DE_PROJET_DE_CCAP]} />}>
        <Route path="/non_admin" element={<Home/>}/>
          </Route>

        {/* we want to protect these routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
       
        

      
        <Route path="adddemande" element={
        <div>
          <NavAdmin></NavAdmin>
          <AjouterDemandeAchat/>
        </div>
        } />

        </Route>

      


        

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  
   

  
  </>
   
      
      
  );
}

export default App;
