import React, {useState} from 'react'
import axios from "axios"
import { Worker } from '@react-pdf-viewer/core';
// Import the main Viewer component
import { Viewer } from '@react-pdf-viewer/core';
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
// default layout plugin
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
// Import styles of default layout plugin
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
function AjouterFichier(props) {
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
  
const  post =async(e) => 
{
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("file",fichier);
    formData.append("titre",titre);
    formData.append("objet",objet);
    formData.append("type","PROJET");
    

  
   
   

    const res = await  axios.post("http://localhost:8080/files/verif",formData);
  console.log("statusssssssssssssssssssssssssssssssssssssssssssssssssssssssss")
  console.log(res.status)
   setFichierInfo(res.data)
   // props.fctFichierInfo(fichierInfo)
    console.log(
      fichierInfo
   )
   console.log(res.data)
  
   let t=props.listfichierInfo
  t.push(res.data)
  props.setListfichierInfo(t)
  props.setCpt_envoye(!props.cpt_envoye)
          

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
const handleChangetitre = (e) =>
{
  const value = e.target.value;
  setTitre(value)
  console.log(titre)

  


}
const handlechangeobjet = (e) =>
{
  const value = e.target.value;
  setObjet(value)
}

  return (
    <div>
      <form>
         <div className="form-group">
            <label for="exampleInputEmail1">Titre </label>
            <input  name="titre"   required onChange={(e)=>{handleChangetitre(e)}}
            type="text" 
            className="form-control"  placeholder="Titre" />
         </div>
         <div class="form-group">
    <label for="exampleFormControlTextarea1">Objet</label>
    <textarea class="form-control" id="exampleFormControlTextarea1" name="objet" 
   onChange={(e)=> {handlechangeobjet(e)}}
    rows="3"></textarea>
  </div>

         <div class="input-group">
<div class="input-group-prepend">

</div>
<div class="custom-file">
<input type="file" class="custom-file-input" id="inputGroupFile01" name="file" onChange={handleFile} 
  aria-describedby="inputGroupFileAddon01"/>
<label class="custom-file-label" for="inputGroupFile01">Cahier des prescriptions techniques CPT</label>
</div>
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
          
<button type="submit" onClick={post} class="btn btn-success btn-lg btn-block">Ajouter le CPT</button>
</form>
    </div>
  )
}

export default AjouterFichier