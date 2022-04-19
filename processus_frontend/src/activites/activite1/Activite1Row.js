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
import axios from "axios"
import AjouterFichier  from "./AjouterFichier"
import Switch from '@mui/material/Switch';
import NotesIcon from '@mui/icons-material/Notes';
import Fab from '@mui/material/Fab';
import { green } from '@mui/material/colors';
import Alert from "./Alert"

let alert=<></>
const AfficherDemandeDetails =(demande) =>
{
  
  const[AfficheAlert,setAfficheAlert] = useState(false)
  let demand=demande.demande.demande
  let demandeId=demand.demandeAchatId
  console.log(demandeId)
  const listfichier = demand.files
  const[remarquegenerale,setRemarquegenerale] = useState("")
  const [remaquegeneraleActive,setRemarquegeneraleActive]=useState(false)
  const[appdossier,setAppdossier]= useState({approuvationId:0,approuvation:"a",remarque:"",etape:1,demandeAchat:demandeId})
  const handleChange1 = (e) =>
  {
    setRemarquegenerale(e.target.value)
   
  }
  const fctAjouterFichier = async(e) =>
  {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file",fichier);
    formData.append("titre","");
    formData.append("objet","");

    const r1= await axios.post("http://localhost:8080/files",formData)
    const r= await axios.post(`http://localhost:8080/api/DemandeAchat/addfile/${demandeId}`)
    setfichierAjouter(true)
  }
  const validerdossier=async(e)=>
  { const valider =async(e) =>
    {
      //let appfile=approvationfile
      //appfile['remarque']=remarque
      e.preventDefault();
      //console.log(appfile)
      //let r=listFichierEtat
      //r.push(appfile)
     // setListFichierEtat(r)
      //console.log("rrrr")
     // console.log(listFichierEtat)
     /* const res = await axios.post("http://localhost:8080/approuvationFile/add",appfile);*/
    
    }
    let r = listFichierEtat
    let toutvalide=true
    if(r.length !==0)
    {
      toutvalide=true
    }  
    else 
    {
      toutvalide=false
    }
     


    for(let i=0;i<r.length;i++)
    {
      if(r[i].approuvation === false)
      {
        toutvalide=false 
        break;
        
      }

    }
    if(toutvalide)
    {
      for(let i =0;i<r.length;i++)
      {
        const res = await axios.post("http://localhost:8080/approuvationFile/add",r[i]);
        console.log("file")
      }
      let dossier=appdossier
      dossier["remarque"]=remarquegenerale
      const res1 = await axios.post("http://localhost:8080/approuvationDossier/add",dossier);
      console.log("dossier")

    }
    else 
    {
      setAfficheAlert(!AfficheAlert)
      
     

      

    }
    /*
  let dossier=appdossier
  dossier["remarque"]=remarquegenerale
  e.preventDefault();
  console.log(dossier)*/
  
  //const res = await axios.post("http://localhost:8080/approuvationDossier/add",dossier);

  }
  const rejeterdossier=async(e)=>
  {
    let dossier=appdossier
    dossier['approuvation']="r"
    dossier["remarque"]=remarquegenerale
  e.preventDefault();
    console.log(dossier)
  
  const res = await axios.post("http://localhost:8080/approuvationDossier/add",dossier);

  }
  
  /*  initialisation des listes fichiers et fichiers infos
  *********************************************************
  ***********************************************************
  ***********************************************************
  */
 const [fichierAjouter,setfichierAjouter]= useState(false)
 const [zonefichier,setzonefichier]= useState(false)


  const [previewbtn, setPreviewbtn] =useState(false)
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [pdfFile, setPdfFile]=useState(null);
  const allowedFiles = ['application/pdf'];
  const[fichier, setFichier] = useState({})
  const [pdfError, setPdfError]=useState('');
  const [fileName,setFileName]= useState('');
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

  /* ****** toggle approuvation *** */
  const [listFichierEtat,setListFichierEtat] = useState([])

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
    <AfficheFichiers fichier={fichier} listFichierEtat={listFichierEtat} setListFichierEtat={setListFichierEtat} />
    )}
   <ul className="list-group list-group-flush">
   {/*parti ajouter fichiersssssssssssssss
   sssssssssssssssssss
  sssssssssssssssssss
    sssssssssssssssssssss*/}
    {fichierAjouter && <li className="list-group-item"> <div class="alert alert-success" role="alert">
    Fichier ajouté.
  </div></li>
   
    }
    {!fichierAjouter &&
   
    <li className="list-group-item">
     {!zonefichier && <button onClick={()=>{setzonefichier(!zonefichier)}} className="btn btn-outline-secondary">Ajouter un nouveau fichier</button>}
    {zonefichier && <>
      <div class="custom-file">
      <input type="file" class="custom-file-input" id="inputGroupFile01" onChange={handleFile} 
        aria-describedby="inputGroupFileAddon01"/>
  
      <label class="custom-file-label" for="inputGroupFile01">Choisir un fichier</label>
  
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
          <button type="submit" onClick={fctAjouterFichier} className="btn btn-success ">Ajouter le fichier</button>
    </>}
    
        
      </li>
    }
 

  {/*listfichiers*/}
 
 
 
 
  <li className="list-group-item">
  {!remaquegeneraleActive &&  <button onClick={()=>{setRemarquegeneraleActive(!remaquegeneraleActive)}}
   className="btn btn-outline-secondary">Ajouter remarque génerale
</button>}
{remaquegeneraleActive && 
  <textarea class="form-control" id="exampleFormControlTextarea1"  onChange={(e) =>{handleChange1(e)}} name="remarquegenrale" rows="3"></textarea>
}
</li>
<li className="list-group-item">
  <button type="button" onClick={validerdossier} className="btn btn-outline-success">Valider le dossier 
</button>  
{AfficheAlert && <Alert />}
<button type="button" onClick={rejeterdossier}  className="btn btn-outline-danger">Rejeter le dossier
</button></li>
  
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
      <Viewer fileUrl={fichier.fileDownloadUri}
      plugins={[defaultLayoutPluginInstance]}></Viewer>
    </Worker>
    </>)

}




const AfficheFichiers = ({fichier,listFichierEtat,setListFichierEtat}) => 
  {/*----------------------------------------------------------
  ---------------------------------------------------------------
  --------------------------------------------------------------- */
    console.log("listEtat")
    console.log(listFichierEtat)
     let ficheId=fichier.fileId
    const [remarqueActive,setRemarqueActive]= useState(false)
    const [remarque,setRemarque]=useState("")
    const [approuve,setApprouve]=useState(true)
    const [approvationfile, setApprouvationfile]= useState({approuvationId:0,file:ficheId,approuvation:approuve,remarque:remarque,etape:1})
   
    /* fichier details */
    const handleChange =(e) =>
    {
      setRemarque(e.target.value)
      console.log(remarque)
     
      console.log("oui")
      console.log(approvationfile.remarque)
    }
    
const valider =async(e) =>
{
  //let appfile=approvationfile
  //appfile['remarque']=remarque
  e.preventDefault();
  //console.log(appfile)
  //let r=listFichierEtat
  //r.push(appfile)
 // setListFichierEtat(r)
  //console.log("rrrr")
 // console.log(listFichierEtat)
 /* const res = await axios.post("http://localhost:8080/approuvationFile/add",appfile);*/

}

const rejeter=async(e) =>
{
  let appfile=approvationfile
  appfile['remarque']=remarque
  appfile['approuvation']=false
  e.preventDefault();
  console.log(appfile)
  const res = await axios.post("http://localhost:8080/approuvationFile/add",appfile);


}


    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const [btnAffiche,setBtnAffiche]=useState(false)
    const handleChangeToggle = (event) => {
      setChecked(event.target.checked);
      let appfile=approvationfile
      appfile['remarque']=remarque
      appfile['approuvation']=true
     
       let r=listFichierEtat
       let touve=false 
       let itouve=-1
      for(let i=0;i<r.length;i++)
      {
        if(r[i].file===appfile['file'])
        {
          touve=true
          itouve=i
          break;
        }
      }
      if(!touve)
       {r.push(appfile)}
      else 
      {r[itouve].approuvation= !r[itouve].approuvation}
       setListFichierEtat(r)
       console.log(r)
       //console.log(listFichierEtat)

    };
    let titre =fichier.titre
    const [Vtitre, setVtitre]=useState("Autre fichiers")
    const [checked, setChecked] = React.useState(false);
    /*******************************
     * **********************cpt*****
     */
  if(titre.length>3 && titre!=="CCAP")
return(
  <>
        

     
    <div className="card" >
    <div class="card-header">Cahier des prescriptions techniques CPT</div>
    <div class="card-body">
    <img src={Filepng} />
    <p>{fichier.filename}</p>
    <br/>

<a onClick={()=>{setBtnAffiche(!btnAffiche)}} class="btn theme-bg text-white">Afficher le fichier</a>
{btnAffiche &&  <AfficheFichier fichier={fichier} /> }
</div>
<ul className="list-group list-group-flush">

<li className="list-group-item">Titre: {fichier.titre}</li>
<li className="list-group-item">Objet: {fichier.objet}</li>

</ul>
<div className="card-body">
  
<Switch
      checked={checked}
    
      onChange={handleChangeToggle}
      inputProps={{ 'aria-label': 'controlled' }}
    />
   
    <Fab size="small"  onClick={()=>{setRemarqueActive(!remarqueActive)}} sx={{ m:1  }} className="label theme-bg2 text-white f-12" aria-label="edit">
    <NotesIcon/>
      </Fab>
      {remarqueActive && <input type="text" name="remarque" onChange={(e) =>{handleChange(e)}} />}


</div>
</div>

 
</>
)
else
{
  return (
    <>
        

     
    <div className="card" >
    <div class="card-header">Autre fichier  {titre}</div>
    <div class="card-body">
    <img src={Filepng} />
    <p>{fichier.filename}</p>
    <br/>

<a onClick={()=>{setBtnAffiche(!btnAffiche)}} class="btn theme-bg text-white">Afficher le fichier</a>
{btnAffiche &&  <AfficheFichier fichier={fichier} /> }
</div>

<div className="card-body">
<Switch
      checked={checked}
    
      onChange={handleChangeToggle}
      inputProps={{ 'aria-label': 'controlled' }}
    />
   
    <Fab size="small"  onClick={()=>{setRemarqueActive(!remarqueActive)}} sx={{ m:1  }} className="label theme-bg2 text-white f-12" aria-label="edit">
    <NotesIcon/>
      </Fab>
    
{/* <button onClick={()=>{setRemarqueActive(!remarqueActive)}} class="btn btn-outline-secondary">Ajouter une Remarque</button>*/}

{remarqueActive && <input type="text" name="remarque" onChange={(e) =>{handleChange(e)}} />}
{/* <button type="button" onClick={rejeter} className="btn btn-outline-danger">Rejeter</button> */}

</div>
</div>

 
</>
  )
}
  
    
    
    
  }




function Activite1Row(demande) {
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
export default Activite1Row