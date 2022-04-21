
import Activite2Row from './Activite2Row'
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import pasDossier from '../pasdossier.PNG'
function Activite2() {
    const [demandeAchat, setDemandeAchat] = useState([])
  useEffect(() => {
      
      async function fetchData() {
          const response = await  axios.get("http://localhost:8080/approuvationDossier/2")
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
                            return   <Activite2Row demande={demande} />
                        }) 
                        
                    
                    }
                     {demandeAchat.length===0 && <center>
                    <img src={pasDossier} />
                    </center>}
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

export default Activite2