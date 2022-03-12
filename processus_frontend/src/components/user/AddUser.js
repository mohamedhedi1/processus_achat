import React from 'react'

const AddUser = () => {
  return (  <>
   <div className="pcoded-main-container">
        <div className="pcoded-wrapper">
            <div className="pcoded-content">
                <div className="pcoded-inner-content">
                   
                   


                    <div className="main-body">
                        <div className="page-wrapper">
                          

                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h5>Ajouter un utilisateur</h5>
                                        </div>
                                        <div className="card-body">
                                           
                                            
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <form>
                                                        <div className="form-group">
                                                            <label for="exampleInputEmail1">Email</label>
                                                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="email" />
                                                        </div>
                                                        <div className="form-group">
                                                            <label for="nom">Nom</label>
                                                            <input type="text" className="form-control" id="nom" aria-describedby="emailHelp" placeholder="Nom" />
                                                        </div>
                                                        <div className="form-group">
                                                            <label for="prenom">Prénom</label>
                                                            <input type="text" className="form-control" id="prenom" aria-describedby="emailHelp" placeholder="Prénom" />
                                                        </div>
                                                        <div className="form-group">
                                                            <label for="poste">Poste</label>
                                                            <input type="text" className="form-control" id="poste" aria-describedby="emailHelp" placeholder="Poste" />
                                                        </div>
                                                        <select class="mb-3 form-control">
                                                        <option>Choisir role</option>
                                                    </select>
                                                        <div className="form-group">
                                                            <label for="cin">pass hidden</label>
                                                            <input type="text" className="form-control" id="cin" aria-describedby="emailHelp" placeholder="Cin" />
                                                        </div>

                                                        
                                                        <button type="submit" className="btn btn-primary">Ajouter</button>
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
      </>
     
    
  )
}

export default AddUser