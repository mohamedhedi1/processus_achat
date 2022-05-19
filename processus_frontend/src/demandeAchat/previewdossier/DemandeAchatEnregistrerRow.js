import React, {useState} from 'react'
import dossier1 from './dossier.png'
//import PDFViewer from 'pdf-viewer-reactjs'
import { Worker } from '@react-pdf-viewer/core';
// Import the main Viewer component
import { Viewer } from '@react-pdf-viewer/core';
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
// default layout plugin
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
// Import styles of default layout plugin
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import Filepng from './file2.png';
import axios from 'axios' ;
import { useNavigate } from 'react-router-dom';
localStorage.setItem('idDemandeAchat',-1)


const AfficherDemandeDetails =(demande) =>
{const navigate = useNavigate();
  let demand=demande.demande.demande
  console.log("oui")
  const listfichier = demand.files

  const ModifierDemande = async(e) =>
    {
      e.preventDefault()
       const navigate = useNavigate();
      console.log("45555555555555555555555555555555555555555555555555")
      
      console.log(demand.demandeAchatId)
         
      localStorage.setItem('idDemandeAchat', 7);

      //navigate("/modifierDemande?id="+demand.idDemandeAchat)
     
    

    }
   
     const EnvoyerDemande = async(e) =>
     {
        
         
         console.log(demand.demandeAchatId)
         const res = await  axios.post(`http://localhost:8080/api/DemandeAchat/envoyer/${demand.demandeAchatId}`);
              navigate("/demandeachatenregister")
        // console.log(res.data)
     }
     const EnvoyerDemande2 = async(e) =>
     {
       
      
        
         // localStorage.removeItem('idDemandeAchat')
        // console.log(demand.demandeAchatId)
        // localStorage.setItem('idDemandeAchat', demand.demandeAchatId);
         navigate("/modifierDemande")
        // const res = await  axios.post(`http://localhost:8080/api/DemandeAchat/envoyer/${demand.demandeAchatId}`);
              
        // console.log(res.data)
     }
     const SupprimerDemande =async(e) =>
     {
        e.preventDefault()
        const res = await  axios.delete(`http://localhost:8080/api/DemandeAchat/envoyer/${demand.demandeAchatId}`);
        navigate("/demandeachatenregister")
        
              
        console.log(res.data)

     }

  return (
    <>
 
   <br/>
    <div className="card text-center">
  <div className="card-header">
  Dossier d'achat : {demand.projet}
  </div>
  <div className="card-body">
  <ul className="list-group list-group-flush">
  <li className="list-group-item">Estimation du budget :  {demand.estimation}</li>
  <li className="list-group-item">Délais de réalisation finale :  {demand.delais}</li>
  <li className="list-group-item">Date de création :  {demand.datenvoi}</li>
  
</ul>
   
    {listfichier.map((fichier)=>
    <AfficheFichiers fichier={fichier} />
    )}
   
    <ul className="list-group list-group-flush">
  
  
<li className="list-group-item">
  {/* <form> </form>  */}
  <button onClick={EnvoyerDemande} className="btn btn-outline-success">Envoyer la demande
</button>  

<button  onClick={()=>{
  localStorage.setItem('idDemandeAchat', demand.demandeAchatId);
  navigate("/modifierDemande")}} className="btn btn-outline-secondary">Modifier la demande
</button> 
<button onClick={SupprimerDemande} className="btn btn-outline-danger">Supprimer la demande
</button>
</li>
  
</ul>
  
   

  </div>
  
  
</div>


   
 
   <br/>
   

    </>


  )
}


const AfficheFichier = (fichier) =>
{
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    return (
        <>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js">
      <Viewer fileUrl={fichier.fichier.fichier.fileDownloadUri}
      plugins={[defaultLayoutPluginInstance]}></Viewer>
    </Worker>
    </>)

}


const AfficheFichiers = (fichier) => 
  {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const [btnAffiche,setBtnAffiche]=useState(false)
    let titre =fichier.fichier.titre
    
    if(titre!==""){
      return (<>
        

     
        <div className="card" >
        <div class="card-header">Cahier des prescriptions techniques CPT</div>
        <div class="card-body">
        <img src={Filepng} />
        <p>{fichier.fichier.filename}</p>
        <br/>
    
    <a onClick={()=>{setBtnAffiche(!btnAffiche)}} class="btn theme-bg text-white">Afficher le fichier</a>
   {btnAffiche &&  <AfficheFichier fichier={fichier} /> }
  </div>
  <ul className="list-group list-group-flush">
  
    <li className="list-group-item">Titre: {fichier.fichier.titre}</li>
    <li className="list-group-item">Objet: {fichier.fichier.objet}</li>
    
  </ul>
  {/*
   <div className="card-body">
 
    <a href="#" className="btn btn-outline-success">Valider</a>
    <a href="#" class="btn btn-outline-secondary">Ajouter une Remarque</a>
    <a href="#" className="btn btn-outline-danger">Rejeter</a>
  </div>
  */}
 
</div>



   
    
   


    
     
    </>
   
      
     
      )

    }
    else 
    {
      return ( <>
        <div className="card" >
        <div class="card-header">Autre fichier</div>
        <div class="card-body">
        <img src={Filepng} />
        <p>{fichier.fichier.filename}</p>
        <br/>
    
    <a onClick={()=>{setBtnAffiche(!btnAffiche)}} class="btn theme-bg text-white">Afficher le fichier</a>
   {btnAffiche &&  <AfficheFichier fichier={fichier} /> }
  </div>
  
  {/*
  <div className="card-body">
 
    <a href="#" className="btn btn-outline-success">Valider</a>
    <a href="#" class="btn btn-outline-secondary">Ajouter une Remarque</a>
    <a href="#" className="btn btn-outline-danger">Rejeter</a>
  </div>
  */}
</div>
      </>

   
       
      )
    }
    
    
  }




function DemandeAchatEnregistrerRow(demande) {
    const [previewfichiers, setPreviewfichiers] =useState(false)

    
    return (
      <>
       {!demande.demande.envoye && <div className="row">
      <div className="col"><img src={dossier1} alt=""></img></div>
      <div className="col"> <h6 class="mb-0">Dossier d'achat</h6>                     
            <p className="m-0">{demande.demande.projet}</p></div>
  
      
  
            <div className="col">
        <p className="m-0">Date de création</p>
         <h6 className="text-muted"><i className="fas fa-circle text-c-green f-10 m-r-15"></i>{demande.demande.datenvoi}</h6>
        </div>
        <div className="col">
        <h6 class="mb-0">Délais finale de réalisation</h6>                     
            <p className="m-0">{demande.demande.delais}</p>
        </div>
        
        <div className="col">
        <button onClick={()=>{setPreviewfichiers(!previewfichiers); }} type="button" className="btn label theme-bg text-white f-12">Consulter</button>
        
        </div>
      </div>
       
  
      }
        {previewfichiers && 
    <div><AfficherDemandeDetails demande={demande} /></div>
}


      </>
     
      
)
}
export default DemandeAchatEnregistrerRow