import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import DropFileInput from './DropFile/components/drop-file-input/DropFileInput'
import { DropzoneAreaBase } from 'material-ui-dropzone';


function AddDossier() { 
 const [demande, setDemande] =useState({projet:"",file:null})
 const [projet, setProjet] = useState('')
 const [file, setFile] = useState(null)
 
 const  post =async(e) => 
 {
     e.preventDefault();
     const res = await  axios.post("http://localhost:8080/api/DemandeAchat",demande);
           

 }
 const handleChange =(e) =>
 {
    const value = e.target.value;
     console.log(e);

 }
  return (
    <div className="pcoded-main-container">
        <div className="pcoded-wrapper">
            <div className="pcoded-content">
                <div className="pcoded-inner-content">
                    <div className="main-body">
                        <div className="page-wrapper">
                            <div className="row">
                                <div className="col-sm-5">
                                    <div className="card">
                                        <div className="card-header">
                                            <h5>Ajouter une demande d'achat</h5>
                                        </div>
                                        <div className="card-body">
                                           
                                            
                                            <div className="row">
                                                <div className="col-md-8">
                                                    <form>
                                                        <div className="form-group">
                                                            <label for="exampleInputEmail1">Nom projet</label>
                                                            <input  name="text"  
                                                            type="text" 
                                                            onChange={(e) =>handleChange(e)}
                                                            className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Nom projet" />
                                                        </div>
                                                      
                                                        <div className="form-group">
                                                       {/*<DropzoneAreaBase
  onAdd={(fileObjs) => console.log('Added Files:', fileObjs)}
  onDelete={(fileObj) => console.log('Removed File:', fileObj)}
  onAlert={(message, variant) => console.log(`${variant}: ${message}`)}
/>*/} 
                                                       
                                                                <div class="form-group">
                                                                     <label for="exampleFormControlFile1">Ajouter un fichier</label>
                                                                    <input type="file" 
                                                                    onChange={(e) =>handleChange(e)}
                                                                    class="form-control-file" id="exampleFormControlFile1" />
                                                                 </div>

                                                        </div>
                                                       

                                                        
                                                        <button type="submit"
                                                         onClick={post}
                                                          className="btn btn-primary">Ajouter</button>
                                                    
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