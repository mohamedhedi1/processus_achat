import React, {useState, useEffect} from 'react'
import axios from "axios"

function AjouterProjet() {
    useEffect(() => {
        async function fetchData() {
            
             const response=await axios.get("http://localhost:8080/api/projet/structureNames")
             const r2=await response.data
             setStructureName(r2)
             console.log(r2)
             
           }
          fetchData();
    }, [])

    const [projet , setProjet] = useState({name:"",nomStructure:"",type:"",delai_de_realisation:""})
    const [StructureName, setStructureName] = useState([])

    const handleChange =(e) =>
    {
       const value = e.target.value;
        console.log(e);
        console.log(value)
        setProjet(
            {...projet, [e.target.name]: value}
        )
        console.log(projet)
   
    }
    const  post =async(e) => 
    { e.preventDefault()
        console.log(projet)
        const res = await  axios.post("http://localhost:8080/api/projet/add",projet);

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
                                        <h5>Ajouter un projet d'achat</h5>
                                    </div>
                                    <div className="card-body">
                                       
                                        
                                        <div className="row ">
                                            <div className="col-md-8">
                                                <form>
                                                    <div className="form-group">
                                                        <label for="exampleInputEmail1">Nom de projet</label>
                                                        <input  name="name"   required
                                                        type="text" 
                                                        onChange={(e) =>{handleChange(e)}} 
                                                        className="form-control"  placeholder="Nom de projet" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label for="exampleInputEmail1">Type</label>
                                                        <input  name="type"   required
                                                        type="text" 
                                                        onChange={(e) =>{handleChange(e)}} 
                                                        className="form-control"  placeholder="Type de projet" />
                                                    </div>

                                                    <div class="form-group">
                                                          <label for="exampleFormControlSelect1">Structure</label>
                                                          <select  name="nomStructure" required
                                                          onChange={(e) =>{handleChange(e)}} 
                                                          class="form-control" id="exampleFormControlSelect1" >      
                                                              {StructureName.map(struct => {
                                                                  return  <option value={struct} >{struct}</option>
                                                              })}
                                                                     
                                                         </select>
                                                    </div>
                                                    <div className="form-group">
                                                        <label for="exampleInputEmail1">Délais de réalisation</label>
                                                        <input  name="delai_de_realisation"  required
                                                        type="date" 
                                                        onChange={(e) =>{handleChange(e)}}
                                                        className="form-control"  placeholder="Délais de réalisation" />
                                                    </div>
                                                   
                                                    
                                              
                                                    <button type="submit"
                                                     onClick={post}
                                                      className="btn  theme-bg text-white f-12">Ajouter le projet</button>
                                                    
                                                       
                                                 
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

export default AjouterProjet