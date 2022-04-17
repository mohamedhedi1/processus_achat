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

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios"


const AfficherDemandeDetails =(demande) =>
{ const [CCAtive , setCCAtive] = useState("false")
  let demand=demande.demande.demande

  console.log("oui777777777777777777777777777777777777777777777777777777")
  console.log(demand)
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
  
  <li className="list-group-item">Estimation du budget :  {demand.estimation}</li>
  <li className="list-group-item">Délais de réalisation finale :  {demand.delais}</li>
  <li className="list-group-item">Date de création :  {demand.datenvoi}</li>
  
</ul>
   
    {listfichier.map((fichier)=>
    <AfficheFichiers fichier={fichier} />
    )}
   <ul className="list-group list-group-flush">
 
  {!CCAtive && <li className="list-group-item"><button onClick={()=>{setCCAtive(true)}} className="btn btn-outline-secondary">Ajouter Cahier des charges CC</button></li>}
 {CCAtive && <li> <AjouterCC  demandeAchatId={demand.demandeAchatId} /> </li>} 
 {
   /*
   <li className="list-group-item"><a href="#" className="btn btn-outline-success">Valider le dossier 
</a>  <a href="#" className="btn btn-outline-danger">Rejeter le dossier
</a></li>
   */
 }
  
</ul>

  </div>
  
  
</div>


   
 
   <br/>
   

    </>


  )
}

/* **************************************************************
****************************************************************
****************************************************************
Ajouter cc 
******************************************************
*********************************
*******************
*/

function FormDialog(props) {
  const [open, setOpen] = React.useState(true);
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    
    setOpen(false);
    props.setFaux(false)
  };

  return (
    <div>
      
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Erreur format du fichier</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Verifier votre Cahier des charges
          </DialogContentText>
         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Fermer</Button>
          
        </DialogActions>
      </Dialog>
    </div>
      );
    }
    
const AjouterCC= (props) =>
{ let demandeAchatId=props.demandeAchatId
  const  post =async(e) => 
{
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("file",fichier);
    formData.append("titre","CC");
    formData.append("objet",objet);
    formData.append("type","CC");
    

  
   
   

    const res = await  axios.post("http://localhost:8080/files/verif",formData);
    if(res.data.titre==="faux")
    {
      setFaux(true)

    }
    else 
    {  console.log(demandeAchatId)
      const res1= await axios.post(`http://localhost:8080/api/DemandeAchat/addfile/${demandeAchatId}`)
      let dossier ={approuvationId:0,approuvation:"a",remarque:"",etape:4,demandeAchat:demandeAchatId}
      console.log(dossier)
      const res2 = await axios.post("http://localhost:8080/approuvationDossier/add",dossier);

    }

}
  
const handleFile = (e) =>{
  let selectedFile = e.target.files[0];
  setFichier(selectedFile)
   console.log(selectedFile);
   setFileName(selectedFile.name)
  if(selectedFile){
    if(selectedFile&&allowedFiles.includes(selectedFile.type)){
      let reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend=(e)=>{
        setPdfError('');
        setPdfFile(e.target.result);
      }
    }
    else{
      setPdfError('Pas un pdf valide : Veuillez sélectionner uniquement PDF');
      setPdfFile('');
    }
  }
  else{
    console.log('Veuillez sélectionner un PDF');
  }
}
  
  const [faux,setFaux]=useState(false)

  const[fichier, setFichier] = useState({})
  const [titre,setTitre] = useState("")
  const [objet, setObjet] = useState("")
  const [fichierInfo, setFichierInfo] = useState({})
  const allowedFiles = ['application/pdf'];
  // pdf file onChange state
const [pdfFile, setPdfFile]=useState(null);
const [previewbtn, setPreviewbtn] =useState(false)
const defaultLayoutPluginInstance = defaultLayoutPlugin();
// pdf file error state
const [pdfError, setPdfError]=useState('');
const [fileName,setFileName]= useState('');

  return (
    <div> <form> <div class="custom-file">
    <input type="file" class="custom-file-input" id="inputGroupFile01" onChange={handleFile} 
      aria-describedby="inputGroupFileAddon01"/>

    <label class="custom-file-label" for="inputGroupFile01">Cahier des charges CC</label>

    </div>
    {fileName && <span className='text-success'>{fileName}</span> }
    {pdfError&&<span className='text-danger'>{pdfError}</span>}
    <br/>
    <button type="button" 
     onClick={() => {
        setPreviewbtn(!previewbtn)

     }}
    
    class="btn btn-light btn-lg btn-block">Afficher</button>
     {previewbtn && pdfFile &&(
           <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js">
             <Viewer fileUrl={pdfFile}
             plugins={[defaultLayoutPluginInstance]}></Viewer>
           </Worker>
         )}
      

    <button type="submit" onClick={post} className="btn btn-success ">Ajouter et verifier Cahier des charges</button>
    {faux &&  <FormDialog open={true} setFaux={setFaux}  />}
    </form>
    </div>
  )
}



/*********************************************************
 * *********************************************************
 * *
 * **************************************************************
 * ***********************************************************
 */

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
    if(titre.length>4){
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
  
</div>



   
    
   


    
     
    </>
   
      
     
      )

    }
   
    else 
    {
      return ( <>
        <div className="card" >
        <div class="card-header">Autre fichier {titre}</div>
        <div class="card-body">
        <img src={Filepng} />
        <p>{fichier.fichier.filename}</p>
        <br/>
    
    <a onClick={()=>{setBtnAffiche(!btnAffiche)}} class="btn theme-bg text-white">Afficher le fichier</a>
   {btnAffiche &&  <AfficheFichier fichier={fichier} /> }
  </div>
  

</div>
      </>

   
       
      )
    }
    
    
  }





function Activite4Row(demande) {
    const [previewfichiers, setPreviewfichiers] =useState(false)
  return (
    <>
    {demande.demande.envoye && <div className="row">
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

export default Activite4Row