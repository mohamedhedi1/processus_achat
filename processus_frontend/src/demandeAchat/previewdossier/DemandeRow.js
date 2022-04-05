
import axios from 'axios'
import React, {useState} from 'react'
import dossier1 from '../images/dossier.png'
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
const AfficherDemandeDetails =(demande) =>
{let demand=demande.demande.demande
  console.log(demand)
  const listfichier = demand.files
  return (
    <>
    <br/>
    <div className="row">
      <div className="col"></div>
      <div className="col-6"><h3>Dossier d'achat :{demand.projet}</h3></div>
      <div className="col"></div>
    </div>

    <div className="row">
      <div className="col"></div>
      <div className="col-6"><h3>Estimation du budget :{demand.budget}</h3></div>
      <div className="col"></div>
    </div>

    <div className="row">
      <div className="col"></div>
      <div className="col-6"><h3>Délais de réalisation finale :{demand.delais}</h3></div>
      <div className="col"></div>
    </div>

    
    <div className="row">
      <div className="col"></div>
      <div className="col-6"><h3>Date de création :{demand.datenvoi}</h3></div>
      <div className="col"></div>
    </div>


   
    {listfichier.map((fichier)=>
    <AfficheFichiers fichier={fichier} />
    )}

<div className="row">
     
     <div className="col"><button onClick={()=>{ }} type="button" className="btn label theme-bg text-white f-12">Envoyer la demande</button></div>
     <div className="col-6"></div>
     <div className="col"><button onClick={()=>{ }} type="button" className="btn label theme-bg2 text-white f-12">Supprimer la demande</button></div>
   </div>
   <br/>
   <br/>
   <br/>

    </>


  )
}
const AfficheFichiers = (fichier) => 
  {
    let titre =fichier.fichier.titre
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    if(titre!==""){
      return (<>
      
      <br/> 
      <br/>
      <br/>
      <div className="row">
      <div className="col"></div>
      <div className="col-6"><h1>Cahier des prescriptions techniques CPT</h1></div>
      <div className="col"></div>
    </div>


    <div className="row">
      <div className="col"></div>
      <div className="col-6"><h3>Titre: {fichier.fichier.titre}</h3></div>
      <div className="col"></div>
    </div>

    <div className="row">
      <div className="col"></div>
      <div className="col-6"><h3>Objet: {fichier.fichier.objet}</h3></div>
      <div className="col"></div>
    </div>
    
    <div className="row">
          <div className="col"></div>
      <div className="col-6">
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js">
      <Viewer fileUrl={fichier.fichier.fileDownloadUri}
      plugins={[defaultLayoutPluginInstance]}></Viewer>
    </Worker>
      </div>
       <div className="col"></div>
      </div>
    </>
   
      
     
      )

    }
    else 
    {
      return ( <>
        <br/>
        <br/>
        <div className="row">
          
          <div className="col"></div>
      <div className="col-6">
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js">
      <Viewer fileUrl={fichier.fichier.fileDownloadUri}
      plugins={[defaultLayoutPluginInstance]}></Viewer>
    </Worker>
      </div>
       <div className="col"></div>
      </div>
     
      </>

   
       
      )
    }
    
    
  }

function DemandeRow(demande) {
  
  const [previewfichiers, setPreviewfichiers] =useState(false)
  return (
    <>
    {demande.demande.envoye && <div className="row">
    <div className="col"><img src={dossier1}></img></div>
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

export default DemandeRow