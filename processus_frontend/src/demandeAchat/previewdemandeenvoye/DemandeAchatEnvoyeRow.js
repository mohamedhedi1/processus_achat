import React, {useState,useEffect} from 'react'
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
import HorizontalStepper from './HorizontalStepper';
import Steppers from './Steppers';
import axios from 'axios' 
const StepperDossier = (props) =>{
  const [listApprouvation, setlistApprouvation] = useState([])

  console.log("dossierstepperrrrrrrrrrrrrrrr")
  console.log(props)
  useEffect(() => {
      
      async function fetchData() {
          const response = await  axios.get(`http://localhost:8080/approuvationDossier/etat/${props.demandeId}`)
          const l = await response.data
          setlistApprouvation(l)
          console.log(l)
          
      }
      fetchData();

  } ,[setlistApprouvation]);

  return(  <div className="card text-center">
  <div className="card-header">

  <Steppers listApprouvation={listApprouvation} AllFiles={props.AllFiles} />
  </div>
  {/* <div className="card-body">
    <h5 className="card-title">Special title treatment</h5>
    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
    <a href="#" className="btn btn-primary">Go somewhere</a>
  </div>
  <div className="card-footer text-muted">
    2 days ago
  </div> */}
  
</div>)

}
const AfficherDemandeDetails =(demande) =>
{let demand=demande.demande.demande
  console.log("AfficherDemandeDetails")
  console.log(demande)
  console.log(demande.demande.AllFiles)
  const listfichier = demand.files
  return (
    <>
 
   <br/>
    <div className="card text-center">
  <div className="card-header">
  Dossier d'achat : {demand.projet}
  </div>
  <div className="card-body">
  <ul className="list-group list-group-flush">
  <li><StepperDossier demandeId={demand.demandeAchatId} AllFiles={demande.demande.AllFiles} /></li>
  <li className="list-group-item">Estimation du budget :  {demand.estimation}</li>
  <li className="list-group-item">D??lais de r??alisation finale :  {demand.delais}</li>
  <li className="list-group-item">Date de cr??ation :  {demand.datenvoi}</li>
  
</ul>
   
    {listfichier.map((fichier)=>
    <AfficheFichiers fichier={fichier} />
    )}
    {/* 
    <ul className="list-group list-group-flush">
  
  <li className="list-group-item"><a href="#" className="btn btn-outline-secondary">Ajouter un nouveau fichier</a></li>
  <li className="list-group-item"><a href="#" className="btn btn-outline-secondary">Ajouter remarque g??nerale
</a></li>
<li className="list-group-item"><a href="#" className="btn btn-outline-success">Valider le dossier 
</a>  <a href="#" className="btn btn-outline-danger">Rejeter le dossier
</a></li>
  
</ul>
    */}
   

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




function DemandeAchatEnvoyeRow(demande) {
    const [previewfichiers, setPreviewfichiers] =useState(false)
    console.log("DemandeAchatEnvoyeRow")
    console.log(demande)

    
    return (
      <>
       {demande.demande.envoye && <div className="row">
      <div className="col"><img src={dossier1} alt=""></img></div>
      <div className="col"> <h6 class="mb-0">Dossier d'achat</h6>                     
            <p className="m-0">{demande.demande.projet}</p></div>
  
      
  
            <div className="col">
        <p className="m-0">Date de cr??ation</p>
         <h6 className="text-muted"><i className="fas fa-circle text-c-green f-10 m-r-15"></i>{demande.demande.datenvoi}</h6>
        </div>
        <div className="col">
        <h6 class="mb-0">D??lais finale de r??alisation</h6>                     
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
export default DemandeAchatEnvoyeRow