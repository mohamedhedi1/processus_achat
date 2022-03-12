import React from 'react'

const AddCommission = () => {
  return (
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
                                            <h5>Ajouter une commission</h5>
                                        </div>
                                        <div className="card-body">
                                           
                                            
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <form>
                                                        <div className="form-group">
                                                            <label for="exampleInputEmail1">Nom du commission</label>
                                                            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Nom du commission" />
                                                        </div>
                                                        <div className="form-group">
                                                            <label for="nom">Role du commission</label>
                                                            <input type="text" className="form-control" id="nom" aria-describedby="emailHelp" placeholder="Role du commission" />
                                                        </div>
                                                        <div className="form-group">
                                                            <label for="Abriviation">Abriviation</label>
                                                            <input type="text" className="form-control" id="Abriviation" aria-describedby="emailHelp" placeholder="Abriviation" />
                                                        </div>
                                                        <h5 class="mt-3">Les membres de la commission</h5>
                                                        <hr/>
                                                        <div class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input" id="customCheck1"/>
                                                <label class="custom-control-label" for="customCheck1">user n</label>
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
  )
}

export default AddCommission