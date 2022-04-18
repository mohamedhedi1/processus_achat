import React, {useEffect, useState} from 'react'
import axios from 'axios'

function ModifierDemande(idDemandeAchat) {
    const [demandeAchat, setDemandeAchat] = useState({})
    useEffect(() => {
      
        async function fetchData() {
          const r =await axios.get(`http://localhost:8080/api/DemandeAchat/getDemandeById/${idDemandeAchat.idDemandeAchat}`)
            const l =  r.data
            setDemandeAchat(l)
            console.log(l)
            
        }
        fetchData();
  
    } ,[setDemandeAchat]);
    const afficher =() =>
    {
        console.log("oui")
        console.log(idDemandeAchat.idDemandeAchat)
        console.log(demandeAchat)
    }

    const handleChange =(e) =>
    {
       const value = e.target.value;
        console.log(e);
        console.log(value)
        setDemandeAchat(
            {...demandeAchat, [e.target.name]: value}
        )
        console.log(demandeAchat)
   
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
                                        <h5>Modifier la demande d'achat </h5>
                                        <button onClick={afficher}>click me </button>
                                       
                                    </div>
                                    <div className="card-body">
                                       
                                        <div className="row ">
                                            <div className="col-md-8">
                                                <form>
                                                    <div className="form-group">
                                                        <label for="exampleInputEmail1">Projet d'achat</label>
                                                        <input  name="projet" value={demandeAchat.projet}   required
                                                        type="text" 
                                                        onChange={(e) =>{handleChange(e)}}
                                                        className="form-control"  placeholder="Projet d'achat" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label for="exampleInputEmail1">Estimation du budget</label>
                                                        <input  name="estimation" value={demandeAchat.estimation} required
                                                        type="number" min="0"
                                                        onChange={(e) =>{handleChange(e)}}
                                                        className="form-control"  placeholder="Estimation du budget" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label for="exampleInputEmail1">Délais de réalisation finale</label>
                                                        <input  name="delais" value={demandeAchat.delais} required
                                                        type="date" 
                                                        onChange={(e) =>{handleChange(e)}}
                                                        className="form-control"  placeholder="Délais de réalisation finale" />
                                                    </div>
                                                    
                                                    <div className="form-group">
                                                            <div class="form-group">
                                                                 <label for="exampleFormControlFile1">Ajouter un fichier</label>
                                                                <input type="file" 
                                                                onChange={(e) =>handleChange(e)} 
                                                                class="form-control-file" id="exampleFormControlFile1" />
                                                             </div>
                                                             </div>
                                                   
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

export default ModifierDemande