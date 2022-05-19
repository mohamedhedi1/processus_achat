import React from 'react'
import Fichier from "../components/dossierAchat/Fichier"
import axios from 'axios' ;
import { useState, useEffect } from 'react'
import AjouterAED from './AjouterAED';
import AjouterFichier from './AjouterFichier';
import useAuth from "../components/hooks/useAuth"
import AjouterAutreFichier from './AjouterAutreFichier';
import { useNavigate } from 'react-router-dom';
function AjouterDemandeAchat() {
    const navigate = useNavigate();
    const {auth} = useAuth();

    const [projetList, setProjetList] = useState([])

    useEffect(() => {
        async function fetchData() {
            
            const response=await axios.get("http://localhost:8080/api/projet/names")
            const r2=await response.data
            setProjetList(r2)
            console.log(r2)
            
          }
         fetchData();
    },[])




    const [aed_envoye,setAed_envoye] =useState(true)
    const[cpt_envoye,setCpt_envoye]=useState(true)
    const [demande, setDemande] =useState({projet:"",estimation:0,delais:null,files:[],useremail:auth.user})
    const [listfichier, setListfichier]= useState([])
    const [listfichierInfo, setListfichierInfo] = useState([])
    const [nbrfichier,setNbrfichier] = useState(0)
    const [listepath, setListepath] = useState([])
    const [vcpt,setVcpt] = useState(false)
    const [vaed,setVaed] = useState(false)

   
    const newfichierComponent = (e) => 
    {
        e.preventDefault()
   //fctFichierInfo =  { infos =>  setListfichierInfo(...listfichierInfo,infos)} 
       setNbrfichier(nbrfichier+1)
       console.log(nbrfichier)
        setListfichier([...listfichier,<AjouterAutreFichier  listfichierInfo={listfichierInfo} setListfichierInfo={setListfichierInfo}  id={nbrfichier} />])
    }
    
    
    const  post =async(e) => 
    {
        let t =demande
        t.files=listfichierInfo
        t.estimation=parseInt(t.estimation)
        console.log("oui",t)
       e.preventDefault();
       
   
        const res = await  axios.post("http://localhost:8080/api/DemandeAchat",t);
        
              
       console.log(res.data)
       navigate("/demandeachatenvoye")
    }
   
    const  post2 =async(e) => 
    {
       let t =demande
       t.files=listfichierInfo
       t.estimation=parseInt(t.estimation)
       console.log("oui",t)
       
       e.preventDefault();
      
   
        const res = await  axios.post("http://localhost:8080/api/DemandeAchat/nonenvoye",t);
              
       console.log(res.data)
       navigate("/demandeachatenregister")
    }
    const handleChange =(e) =>
    {
       const value = e.target.value;
        console.log(e);
        console.log(value)
        setDemande(
            {...demande, [e.target.name]: value}
        )
        console.log(demande)
   
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
                                        <h5>Ajouter une demande d'achat</h5>
                                    </div>
                                    <div className="card-body">
                                       
                                        
                                        <div className="row ">
                                            <div className="col-md-8">
                                                <form>

                                                <div class="form-group">
                                                          <label for="exampleFormControlSelect1">Projet d'achat</label>
                                                          <select  name="projet" required
                                                          onChange={(e) =>{handleChange(e)}} 
                                                          class="form-control" id="exampleFormControlSelect1" >      
                                                              {projetList.map(struct => {
                                                                  return  <option value={struct} >{struct}</option>
                                                              })}
                                                              
                                                                     
                                                         </select>
                                                </div>
                                            

                                                  {/*   <div className="form-group">
                                                        <label for="exampleInputEmail1">Projet d'achat</label>
                                                        <input  name="projet"   required
                                                        type="text" 
                                                        onChange={(e) =>{handleChange(e)}}
                                                        className="form-control"  placeholder="Projet d'achat" />
                                                    </div>
                                                     */}
                                                    <div className="form-group">
                                                        <label for="exampleInputEmail1">Estimation du budget</label>
                                                        <input  name="estimation"  required
                                                        type="number" min="0"
                                                        onChange={(e) =>{handleChange(e)}}
                                                        className="form-control"  placeholder="Estimation du budget" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label for="exampleInputEmail1">Délais de réalisation finale</label>
                                                        <input  name="delais"  required
                                                        type="date" 
                                                        onChange={(e) =>{handleChange(e)}}
                                                        className="form-control"  placeholder="Délais de réalisation finale" />
                                                    </div>
                                                    
                                                  
                                                   
                                                  { /*
                                                            <div className="form-group">
                                                            <div class="form-group">
                                                                 <label for="exampleFormControlFile1">Ajouter un fichier</label>
                                                                <input type="file" 
                                                                onChange={(e) =>handleChange(e)}
                                                                class="form-control-file" id="exampleFormControlFile1" />
                                                             </div>
                                                             </div>*/
                                                     }
                                                   {cpt_envoye &&    <button onClick={() =>{setVcpt(!vcpt)}} type="button" class="btn btn-light btn-lg btn-block">Ajouter Cahier des prescriptions techniques CPT</button>}
                                                     {!cpt_envoye && 
                                                     <div class="alert alert-success" role="alert">
                                                     Cahier des prescriptions techniques CPT ajouté avec succes
                                                   </div>
                                                     }
                                                    {cpt_envoye && vcpt && <AjouterFichier listfichierInfo={listfichierInfo} setListfichierInfo={setListfichierInfo}  id={nbrfichier} cpt_envoye={cpt_envoye} setCpt_envoye={setCpt_envoye} />}
                                                    
                                                  {aed_envoye && <button onClick={() =>{setVaed(!vaed)}} type="button" class="btn btn-light btn-lg btn-block">Ajouter Autorisation d'engagement de dépenses AED</button>}  
                                                  {!aed_envoye && 
                                                   <div class="alert alert-success" role="alert">
                                                   Autorisation d'engagement de dépenses AED ajouté avec succes
                                                 </div>
                                                  }
                                                    {aed_envoye && vaed && <AjouterAED listfichierInfo={listfichierInfo} setListfichierInfo={setListfichierInfo}  id={nbrfichier}  aed_envoye={aed_envoye} setAed_envoye={setAed_envoye} />}
                                                  
                                                   

                                                    
                                                    
                                                    
                                                    
         
<button type="button" onClick={(e)=> newfichierComponent(e)}  class="btn btn-light btn-lg btn-block">Ajouter autres fichiers</button>
                                                    {listfichier}

                                                    <br/>
                                                    <br/>
                                                    <button type="submit"
                                                     onClick={post}
                                                      className="btn  theme-bg text-white f-12">Envoyer la demande</button>
                                                    <button type="button"
                                                     onClick={post2}
                                                      className="btn  theme-bg2 text-white f-12">Enregistrer la demande</button>
                                                       
                                                 
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

export default AjouterDemandeAchat