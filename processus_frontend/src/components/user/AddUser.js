import React from 'react'

const AddUser = () => {
  return (  <>
   <div className="pcoded-main-container">
        <div className="pcoded-wrapper">
            <div className="pcoded-content">
                <div className="pcoded-inner-content">
                   
                    <div className="page-header">
                        <div className="page-block">
                            <div className="row align-items-center">
                                <div className="col-md-12">
                                    <div className="page-header-title">
                                        <h5 className="m-b-10">Form Elements</h5>
                                    </div>
                                    <ul className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="index.html"><i className="feather icon-home"></i></a></li>
                                        <li className="breadcrumb-item"><a href="javascript:">Form Componants</a></li>
                                        <li className="breadcrumb-item"><a href="javascript:">Form Elements</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    


                    <div className="main-body">
                        <div className="page-wrapper">
                          

                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h5>Basic Componant</h5>
                                        </div>
                                        <div className="card-body">
                                            <h5>Form controls</h5>
                                            
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <form>
                                                        <div className="form-group">
                                                            <label for="exampleInputEmail1">Email address</label>
                                                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                                                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                                        </div>
                                                        <div className="form-group">
                                                            <label for="exampleInputPassword1">Password</label>
                                                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                                                        </div>
                                                        <div className="form-group form-check">
                                                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                                            <label className="form-check-label" for="exampleCheck1">Check me out</label>
                                                        </div>
                                                        <button type="submit" className="btn btn-primary">Submit</button>
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