import React from 'react'

function Test() {
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
                                        <h5>Liste des demandes d'achats enregistrées</h5>
                                       
                                    </div>
                                    <div className="card-body">

                                        <div className="row">
                                            <div className="col">dossierimage</div>
                                            <div className="col"><h6>Dossier d'achat</h6></div>
                                            <div className="col">estimation</div>
                                            <div className="col">date denvoi </div>
                                            <div className="col"><button onClick={()=>{ }} type="button" className="btn label theme-bg text-white f-12">Consulter</button></div>
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

export default Test