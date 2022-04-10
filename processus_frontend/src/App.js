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
import AjouterDemandeAchat from './demandeAchat/AjouterDemandeAchat';

import Test from './demandeAchat/images/Test'
import Activite1 from './activites/activite1/Activite1';
import Activite2 from './activites/Activite2/Activite2';
import Activite3 from './activites/activite3/Activite3';
import Activite4 from './activites/activite4/Activite4';
import Activite5 from './activites/activite5/Activite5';
import DemandesAchatEnvoye from './demandeAchat/previewdemandeenvoye/DemandesAchatEnvoye';
import  HorizontalStepper from './demandeAchat/previewdemandeenvoye/HorizontalStepper';
import DemandeAchatEnregistrer from './demandeAchat/previewdossier/DemandeAchatEnregistrer';
import ModifierDemande from './demandeAchat/modifierDemandeAchat/ModifierDemande';
import BasicModal from './demandeAchat/previewdemandeenvoye/BasicModal';
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
   
    

    {/*<ListeDemandeEnregistrer /> <AddDossier />  <DemandeAchatTable />
    <DemandesAchatEnregistrer/>  
    
     <NavAdmin/>
    <DemandeAchatTable />
    <DemandesAchatEnregistrer />
    <AjouterDemandeAchat/>
    <Test />*/}
    
    
    {/*
    <NavAdmin/>
    <ModifierDemande idDemandeAchat={9}/>
    <DemandeAchatEnregistrer />
    <ModifierDemande idDemandeAchat={9}/>
     <Activite1 />
     <Activite2/>
     <Activite3/>
     
    */}
      <NavAdmin/>
    <DemandesAchatEnvoye />
   
    
    {/*
    <Activite1 />

    <Activite2/>
    <Activite3/>
    <Activite4 />
    <Activite5 />
    */}
    
   
    
   

    

    
    
    
    
  
  </>
   
      
      
  );
}

export default App;
