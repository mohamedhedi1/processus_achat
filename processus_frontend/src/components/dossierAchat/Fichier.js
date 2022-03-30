import React from 'react'
import {useState} from 'react'
import { Worker } from '@react-pdf-viewer/core';
// Import the main Viewer component
import { Viewer } from '@react-pdf-viewer/core';
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
// default layout plugin
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
// Import styles of default layout plugin
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import axios from 'axios'
function Fichier(props) {
const [id,setId] =useState(props.id)


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
    

     const res = await  axios.post("http://localhost:8080/files",formData);
    
    setFichierInfo(res.data)
    // props.fctFichierInfo(fichierInfo)
     console.log(
       fichierInfo
    )
    console.log("addin0",res.data)
    console.log(
      props.listfichierInfo
  ) 
  let t=props.listfichierInfo
  t.push(res.data)
    //props.setListfichierInfo([...props.listfichierInfo,res.data])
    props.setListfichierInfo(t)
    console.log(
        props.listfichierInfo

    )
    setId(-1)


           

 }




 const allowedFiles = ['application/pdf'];
 const handleFile = (e) =>{
   let selectedFile = e.target.files[0];
   setFichier(selectedFile)
    console.log(selectedFile);
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
  if(id!== -1){ return (
    <from>
     <div className="form-group">
     <div class="form-group">
          <label for="exampleFormControlFile1">Ajouter un fichier</label>
        
        {/*input */}
         <input type="file" name="file"
         onChange={handleFile} 
         class="form-control-file" id="exampleFormControlFile1" />
     {pdfError&&<span className='text-danger'>{pdfError}</span>}
      </div>
 
 
     {/*Les buttons  */}
      <button type="submit"
      onClick={post}
       class="btn btn-dark" title="" data-toggle="tooltip" data-original-title="btn btn-black">Ajouter au dossier</button>
      <button type="button" class="btn btn-light"
      onClick={() => {
         setPreviewbtn(!previewbtn)
 
      }}
      title="" data-toggle="tooltip" data-original-title="btn btn-light">Afficher</button>
      <button type="button" onClick={() => 
      
      {console.log(id)
       setId(-1)
     
     }} class="btn btn-danger" title="" data-toggle="tooltip" data-original-title="btn btn-danger">Retirer</button>
      
      {/* render this if we have a pdf file */}
 
 
      {previewbtn && pdfFile &&(
           <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js">
             <Viewer fileUrl={pdfFile}
             plugins={[defaultLayoutPluginInstance]}></Viewer>
           </Worker>
         )}
      
      </div> 
      </from>
   
   
   )}
   else {
     return (<></>)
   }
  
}

export default Fichier