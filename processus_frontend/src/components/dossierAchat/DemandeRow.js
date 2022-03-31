import React, {useState} from 'react'
import dossier1 from './images/dossier1.png'
import PDFViewer from 'pdf-viewer-reactjs'
import { Worker } from '@react-pdf-viewer/core';
// Import the main Viewer component
import { Viewer } from '@react-pdf-viewer/core';
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
// default layout plugin
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
// Import styles of default layout plugin
import '@react-pdf-viewer/default-layout/lib/styles/index.css';



const AfficheFichiers = (path) => 
  {
    
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    return (/*  <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js">
    <Viewer fileUrl={path.path[0]}
    plugins={[defaultLayoutPluginInstance]}></Viewer>
  </Worker>
   */
          <>
          <PDFViewer
          document={{
              url: path.path[0],
          }}
      />
         
          
    
      </>
   
    )
  }

function DemandeRow(demande) {
  const [pathfichierss,setPathfichierss] = useState(demande.demande.pathfichiers)
  const [previewfichiers, setPreviewfichiers] =useState(false)
  /*
  
  */
  
  
  return ( <>
    {demande.demande.envoye && 
      <tr className="unread" onClick={() => {setPreviewfichiers(!previewfichiers)}}>
      <td> <img src={dossier1}></img></td>
      <td></td>
      <td>
          
          <p className="m-0">{demande.demande.projet}</p>
      </td>
      <td></td>
      <td>
       
       <h6 className="text-muted"><i className="fas fa-circle text-c-green f-10 m-r-15"></i>{demande.demande.datenvoi}</h6>
      </td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td>
      <a onClick={()=>{setPreviewfichiers(!previewfichiers);
      console.log(pathfichierss)}} className="label theme-bg text-white f-12">Consulter</a>
      </td>
      
      
      </tr>

    }
    {!demande.demande.envoye && 
      <tr className="unread" onClick={() => {}}>
        <td></td>
      <td></td>
      <td> <img src={dossier1}></img></td>
      <td></td>
      <td>
          
          <p className="m-0">{demande.demande.projet}</p>
      </td>
      <td></td>
      <td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
     <h6 className="text-muted"><i className="fas fa-circle text-c-red f-10 m-r-15"></i>{demande.demande.datenvoi}</h6>
      </td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td><a href="#!" className="label theme-bg text-white f-12">Enoyer</a></td>
      <td><a href="#!" className="label theme-bg2 text-white f-12">Modifier</a></td>
      <td><a href="#!" className="label theme-bg text-white f-12">Supprimer</a></td>
     {/* <td><a href="#!" className="label theme-bg text-white f-12">Enoyer</a>
      <a href="#!" className="label theme-bg2 text-white f-12">Modifier</a>
      <a href="#!" className="label theme-bg text-white f-12">Supprimer</a>
    </td>*/}
      
      
      </tr>

    }
    <tr>
    {previewfichiers && 
    
    <AfficheFichiers path={pathfichierss} />
  

  }
    </tr>
    
    </>

  )
}

export default DemandeRow

