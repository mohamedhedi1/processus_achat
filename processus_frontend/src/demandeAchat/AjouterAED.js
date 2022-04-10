
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
function AjouterAED(props) {
   
  const [titre,setTitre] = useState("AED")
  const [objet, setObjet] = useState("")
  const [id,setId] =useState(1)
  const [fileName,setFileName]= useState('');


const[fichier, setFichier] = useState({})

const [fichierInfo, setFichierInfo] = useState({})

const [previewbtn, setPreviewbtn] =useState(false)

// creating new plugin instance
const defaultLayoutPluginInstance = defaultLayoutPlugin();

// pdf file onChange state
const [pdfFile, setPdfFile]=useState(null);

// pdf file error state
const [pdfError, setPdfError]=useState('');



const  post =async(e) => 
{
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("file",fichier);
    formData.append("titre",titre);
    formData.append("objet",objet);
   

    const res = await  axios.post("http://localhost:8080/files",formData);
   
   setFichierInfo(res.data)
   // props.fctFichierInfo(fichierInfo)
    console.log(
      fichierInfo
   )
   console.log("addin0",res.data)
  
   let t=props.listfichierInfo
  t.push(res.data)
  props.setListfichierInfo(t)
  console.log(
    props.listfichierInfo

)
props.setAed_envoye(!props.setAed_envoye)

      

}
const allowedFiles = ['application/pdf'];
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

 if(id!== -1){
    return (
        <div> <form> <div class="custom-file">
        <input type="file" class="custom-file-input" id="inputGroupFile01" onChange={handleFile} 
          aria-describedby="inputGroupFileAddon01"/>
    
        <label class="custom-file-label" for="inputGroupFile01">Autorisation d'engagement de dépenses AED</label>
    
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
          
    
        <button type="submit" onClick={post} className="btn btn-success btn-lg btn-block">Ajouter l'AED</button>
        </form>
        </div>
      )
 }
 else{return(<><p>AED envoyé et verifié</p></>)}
 
}

export default AjouterAED