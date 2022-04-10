import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Activite4Row from './Activite5Row'
function Activite5() {

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
                                        <h5>Liste des demandes d'achats </h5>
                                       
                                    </div>
                                    <div className="card-body">
                                    {demandeAchat.map((demande) =>
                        {
                            return   <Activite4Row demande={demande} />
                        }) 
                        
                    
                    }
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

export default Activite5