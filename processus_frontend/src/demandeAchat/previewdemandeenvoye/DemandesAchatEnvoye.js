import React, {useEffect, useState} from 'react'

import axios from 'axios'
import DemandeAchatEnvoyeRow from './DemandeAchatEnvoyeRow'
function DemandesAchatEnvoye() {
  const [demandeAchat, setDemandeAchat] = useState([])
  const [AllFiles, setAllFiles] = useState([])
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
      
      async function fetchData() {
          const response = await  axios.get("http://localhost:8080/api/DemandeAchat")
          const l = await response.data
          setDemandeAchat(l)
         
          
      }
      fetchData();

  } ,[setDemandeAchat]);
 
  useEffect(() => {
      
    async function fetchData() {
        const response2 = await  axios.get("http://localhost:8080/files/allFiles")
        const l2 = await response2.data
        console.log(l2)
        setAllFiles(l2)
       
        
    }
    fetchData();

} ,[setAllFiles]);
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
                                        <h5>Liste des demandes d'achats envoyées</h5>
 
                                       
                                    </div>
                                    <div className="card-body">
                                    {demandeAchat.map((demande) =>
                        {
                            return   <DemandeAchatEnvoyeRow demande={demande} AllFiles={AllFiles} />
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

export default DemandesAchatEnvoye