import React, {useEffect, useState} from 'react'
import dossier1 from './images/dossier1.png'
import axios from 'axios'
import { Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DemandeRow from './DemandeRow'

function DemandeAchatTable() {
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
                                        <h5>Liste des demandes d'achats</h5>
                                       
                                    </div>
                                    <div className="card-body">
                                    <div className="card Recent-Users">
      
        <div className="card-block px-0 py-3">
            <div className="table-responsive" >
                <table className="table table-hover">
                    <tbody>
                    {
                    demandeAchat.map((demande) =>
                        {
                            return   <DemandeRow demande={demande} />
                        })
                    }
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
        </div>
    </div>
    </div>
    
  )
}

export default DemandeAchatTable



