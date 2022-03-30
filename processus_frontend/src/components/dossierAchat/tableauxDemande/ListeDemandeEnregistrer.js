
import React, {useEffect, useState} from 'react'
import dossier1 from '../images/dossier1.png'
import axios from 'axios'
function ListeDemandeEnregistrer() {

    const [demandeAchat, setDemandeAchat] = useState([])
    useEffect(() => {
        
        async function fetchData() {
            const response = await  axios.get("http://localhost:8080/api/DemandeAchat")
            const l = await response.data
            setDemandeAchat(l)
            console.log(l)
            
        }
        fetchData();

    } ,[setDemandeAchat]);


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
                                    <table class="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>User</th>
                                                        <th>Activity</th>
                                                        <th>Time</th>
                                                        <th>Status</th>
                                                        <th>Actions</th>
                                                        <th class="text-right"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            {/*  <h6 class="m-0"><img class="rounded-circle m-r-10" style="width:40px;" src={dossier1} alt="activity-user"/>Ida Jorgensen</h6>
                                                       */}
                                                            </td>
                                                        <td>
                                                            <h6 class="m-0">The quick brown fox</h6>
                                                        </td>
                                                        <td>
                                                            <h6 class="m-0">3:28 PM</h6>
                                                        </td>
                                                        
                                                        <td class="text-left"><i class="fas fa-circle text-c-green f-5"></i></td>
                                                        <td> <td>
                            <a href="#" class="view" title="" data-toggle="tooltip" data-original-title="View"><i class="material-icons"></i></a>
                            <a href="#" class="edit" title="" data-toggle="tooltip" data-original-title="Edit"><i class="material-icons"></i></a>
                            <a href="#" class="delete" title="" data-toggle="tooltip" data-original-title="Delete"><i class="material-icons"></i></a>
                        </td> </td>
                       
                                                    </tr>

                                                    
                                                   
                                             
                                                    
                                                </tbody>
                                            </table> 
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

export default ListeDemandeEnregistrer