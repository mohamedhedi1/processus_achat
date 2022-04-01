import axios from 'axios' ;
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import DropFileInput from './DropFile/components/drop-file-input/DropFileInput'
import { DropzoneAreaBase } from 'material-ui-dropzone';
import Fichier  from './Fichier'
import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
/*
function MyDropzone() {

    



  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    const file = acceptedFiles[0];
    console.log(file);
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()}>

      <input {...getInputProps()}   />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <img src="./cloud-upload-regular-240.png"/>
          
      }
    </div>
  )
}
*/
function AddDossier() { 

 const [demande, setDemande] =useState({projet:"",estimation:0,delais:0,pathfichiers:[]})
 const [listfichier, setListfichier]= useState([])
 const [listfichierInfo, setListfichierInfo] = useState([])
 const [nbrfichier,setNbrfichier] = useState(0)
 const [listepath, setListepath] = useState([])

 const newfichierComponent = (e) => 
 {
     e.preventDefault()
//fctFichierInfo =  { infos =>  setListfichierInfo(...listfichierInfo,infos)} 
    setNbrfichier(nbrfichier+1)
    console.log(nbrfichier)
     setListfichier([...listfichier,<Fichier  listfichierInfo={listfichierInfo} setListfichierInfo={setListfichierInfo}  id={nbrfichier} />])
 }
 
 const  post =async(e) => 
 {
    const listf = []
    listfichierInfo.map(listfi => (
        listf.push(listfi.fileDownloadUri)
    ))
    setListepath(listf)
    setDemande({...demande,pathfichiers:listf})
     let t =demande
     t.pathfichiers=listf
    e.preventDefault();
    

     const res = await  axios.post("http://localhost:8080/api/DemandeAchat",t);
           
    console.log(res.data)
 }

 const  post2 =async(e) => 
 {
    const listf = []
    listfichierInfo.map(listfi => (
        listf.push(listfi.fileDownloadUri)
    ))
    setListepath(listf)
    setDemande({...demande,pathfichiers:listf})
     let t =demande
     t.pathfichiers=listf
    e.preventDefault();
    

     const res = await  axios.post("http://localhost:8080/api/DemandeAchat/nonenvoye",t);
           
    console.log(res.data)
 }
 const handleChange =(e) =>
 {
    const value = e.target.value;
     console.log(e);
     console.log(value)
     setDemande(
         {...demande, [e.target.name]: value}
     )

 }






























  return (
    <div className="pcoded-main-container">
        <div className="pcoded-wrapper">
            <div className="pcoded-content">
                <div className="pcoded-inner-content">
                    <div className="main-body">
                        <div className="page-wrapper">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h5>Ajouter une demande d'achat</h5>
                                        </div>
                                        <div className="card-body">
                                           
                                            
                                            <div className="row ">
                                                <div className="col-md-8">
                                                    <form>
                                                        <div className="form-group">
                                                            <label for="exampleInputEmail1">Nom projet</label>
                                                            <input  name="projet"  
                                                            type="text" 
                                                            onChange={(e) =>{handleChange(e)}}
                                                            className="form-control"  placeholder="Nom projet" />
                                                        </div>
                                                        <div className="form-group">
                                                            <label for="exampleInputEmail1">Estimation</label>
                                                            <input  name="estimation"  
                                                            type="number" min="0"
                                                            onChange={(e) =>{handleChange(e)}}
                                                            className="form-control"  placeholder="Estimation" />
                                                        </div>
                                                        <div className="form-group">
                                                            <label for="exampleInputEmail1">Délais</label>
                                                            <input  name="delais"  
                                                            type="number" min="0" 
                                                            onChange={(e) =>{handleChange(e)}}
                                                            className="form-control"  placeholder="Délais" />
                                                        </div>
                                                        
                                                        <button type="button" onClick={(e)=> newfichierComponent(e)}  class="btn btn-info">Ajouter un fichier</button>
                                                        {listfichier}
                                                       
                                                      { /*
                                                                <div className="form-group">
                                                                <div class="form-group">
                                                                     <label for="exampleFormControlFile1">Ajouter un fichier</label>
                                                                    <input type="file" 
                                                                    onChange={(e) =>handleChange(e)}
                                                                    class="form-control-file" id="exampleFormControlFile1" />
                                                                 </div>
                                                                 </div>*/
                                                         }
                                                        
                                                        
                                                        
                                                       

                                                        
                                                        <button type="submit"
                                                         onClick={post}
                                                          className="btn label theme-bg text-white f-12">Envoyer la demande</button>
                                                        <button type="button"
                                                         onClick={post2}
                                                          className="btn theme-bg2 text-white f-12">Enregistrer la demande</button>
                                                       
                                                    </form>
                                                </div>
                                            </div>
                                        </div> 
                                    </div>
                                </div>
                            </div>   
                        </div>   
                    </div>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default AddDossier