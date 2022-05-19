import React, {useEffect, useState} from 'react'
import axios from 'axios'


import Fab from '@mui/material/Fab';

import DeleteIcon from'@mui/icons-material/Delete';
import AjouterAED from '../AjouterAED';
import AjouterFichier from '../AjouterFichier';
import AjouterAutreFichier from '../AjouterAutreFichier';
import useAuth from '../../components/hooks/useAuth';


function ModifierDemande(idDemandeAchat) {
  

    const {auth} = useAuth();
   
    const [aed_envoye,setAed_envoye] =useState(true)
    const[cpt_envoye,setCpt_envoye]=useState(true)
    const [listfichier, setListfichier]= useState([])
    const [listfichierInfo, setListfichierInfo] = useState([])
    const [nbrfichier,setNbrfichier] = useState(0)
    const [listepath, setListepath] = useState([])
    const [vcpt,setVcpt] = useState(false)
    const [vaed,setVaed] = useState(false)
    const [demandeAchat, setDemandeAchat] = useState({})
    const [files, setFiles] = useState([])
    const [CptExist,setCptExist]= useState(false)
    const [AedExist,setAedExist]= useState(false)
    const [HideElement, SetHideElement] = useState(false)
    const [listFileSupp,setlistFileSupp]= useState([])
    const [oldCpt,setOldCpt]= useState(<></>)
    const [oldCptId,setOldCptId]= useState(-1)
    const [oldAedId,setOldAedId]= useState(-1)
    const [oldAed,setOldAed] = useState(<></>)
    const [filesF,setFilesF]=useState([])

    const newfichierComponent = (e) => 
    {
        e.preventDefault()
   //fctFichierInfo =  { infos =>  setListfichierInfo(...listfichierInfo,infos)} 
       setNbrfichier(nbrfichier+1)
       console.log(nbrfichier)
        setListfichier([...listfichier,<AjouterAutreFichier  listfichierInfo={listfichierInfo} setListfichierInfo={setListfichierInfo}  id={nbrfichier} />])
    }

    useEffect(() => {
      
        async function fetchData() {
          const r =await axios.get(`http://localhost:8080/api/DemandeAchat/getDemandeById/${idDemandeAchat.idDemandeAchat}`)
            const l =  r.data
            setDemandeAchat(l)
            console.log(l)
            setFiles(l.files)
            console.log(files) 
            let files1 =[]
            /* *****cpt et aed ****** */
            /*
            for(let i=0;i<files.length;i++)
            {
                if(files[i].titre.length>3)
                {
                    
                    let cpt=<>
                       <div className="row">
                       <div class="alert alert-light col-11" role="alert">
                       {files[i].filename}
                           </div>
                           <div className="col-1"> <Fab size="small" onClick={()=>
                            {   
                                setCptExist(false)}}  sx={{ m:1  }} className="label theme-bg2 text-white f-12" aria-label="edit">
                      <DeleteIcon />
                     </Fab></div>
                     </div>
                    </>
                  // let r=files[i].fileId
                   //setOldCptId(r)
                    setOldCpt(cpt)
                    setCptExist(true)
                } else
                if(files[i].titre==="AED")
                {
                   
                    let aed=<>
                    <div className="row">
                    <div class="alert alert-light col-11" role="alert">
                    {files[i].filename}
                        </div>
                        <div className="col-1"> <Fab size="small" onClick={()=>{
                            setAedExist(false)}}  sx={{ m:1  }} className="label theme-bg2 text-white f-12" aria-label="edit">
                   <DeleteIcon />
                  </Fab></div>
                     </div>
                     </>
                     // let r=files[i].fileId
                     // setOldAedId(r)
                    setOldAed(aed)
                    setAedExist(true)
                   
                   
            
                }
                else
                {
                    files1.push(files[i])
                    setFilesF([... files1])
                    //apres  => a modifier map of files par filesF 
                }
            }*/
            
            
        }
        fetchData();
  
    } ,[setDemandeAchat,setFiles,setCptExist,setAedExist,setOldAedId,setOldCptId]);
    
    
    const handleChange =(e) =>
    {
       const value = e.target.value;
        console.log(e);
        console.log(value)
        setDemandeAchat(
            {...demandeAchat, [e.target.name]: value}
        )
       
    }
    

    

     
      const FichierEnregistrer = (props) =>
      { 
        const [hideElementFct, setHide]=useState(false)
     
          return (<>{!hideElementFct && <div className="row">
          <div class="alert alert-light col-11" role="alert">
         {props.file.filename}
        </div>
        <div className="col-1"> <Fab size="small" onClick={() =>{
           /* if(props.file.titre.length>3)
            {
                set
            }*/
            let listaux = props.listFileSupp
            console.log(listaux)
            listaux.push(props.file.fileId) //fileId
            props.setlistFileSupp(listaux)
            setHide(!hideElementFct)}
            }    sx={{ m:1  }} className="label theme-bg2 text-white f-12" aria-label="edit">
        <DeleteIcon />
      </Fab></div>
      </div>}</>)

      }

      const post=async(e) =>
      { e.preventDefault()
        
        let t =demandeAchat
        let  r=listfichierInfo
        t.estimation=parseInt(t.estimation)
        for(let i=0;i<files.length;i++)
        {
            if(!listFileSupp.includes(files[i].fileId))
            {
                r.push(files[i])

            }
        }
        t.files=r
        console.log(r)
        const res = await  axios.put("http://localhost:8080/api/DemandeAchat/modifierDemandeEnvoye",t);
        
              
       console.log(res.data)


      }
      const post2=async(e) =>
      {
        e.preventDefault()
        
        let t =demandeAchat
        let  r=listfichierInfo
        t.estimation=parseInt(t.estimation)
        for(let i=0;i<files.length;i++)
        {
            if(!listFileSupp.includes(files[i].fileId))
            {
                r.push(files[i])

            }
        }
        t.files=r
        console.log(r)
        const res = await  axios.put("http://localhost:8080/api/DemandeAchat/modifierDemandeEnvoye2",t);
        
        const res2 = await  axios.delete(`http://localhost:8080/api/DemandeAchat/envoyer/${idDemandeAchat.idDemandeAchat}`);
              
       console.log(res.data)

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
                                        <h5>Modifier la demande d'achat </h5>
                                       
                                       
                                    </div>
                                    <div className="card-body">
                                       
                                        <div className="row ">
                                            <div className="col-md-8">
                                                <form>
                                                    <div className="form-group">
                                                        <label for="exampleInputEmail1">Projet d'achat</label>
                                                        <input  name="projet" value={demandeAchat.projet}   required
                                                        type="text" 
                                                        onChange={(e) =>{handleChange(e)}}
                                                        className="form-control"  placeholder="Projet d'achat" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label for="exampleInputEmail1">Estimation du budget</label>
                                                        <input  name="estimation" value={demandeAchat.estimation} required
                                                        type="number" min="0"
                                                        onChange={(e) =>{handleChange(e)}}
                                                        className="form-control"  placeholder="Estimation du budget" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label for="exampleInputEmail1">Délais de réalisation finale</label>
                                                        <input  name="delais" value={demandeAchat.delais} required
                                                        type="date" 
                                                        onChange={(e) =>{handleChange(e)}}
                                                        className="form-control"  placeholder="Délais de réalisation finale" />
                                                    </div>

                                                    {CptExist &&  oldCpt}
                                                    {AedExist && oldAed}
                                                   
                                                    {files.map(file=>{
                                                     
                                                        return (<FichierEnregistrer file={file}  listFileSupp={listFileSupp} 
                                                            setlistFileSupp={setlistFileSupp}  />)
                                                    })}
                                                {!CptExist && <>
                                                    {cpt_envoye &&    <button onClick={() =>{setVcpt(!vcpt)}} type="button" class="btn btn-light btn-lg btn-block">Ajouter Cahier des prescriptions techniques CPT</button>}
                                                     {!cpt_envoye && 
                                                     <div class="alert alert-success" role="alert">
                                                     Cahier des prescriptions techniques CPT ajouté avec succes
                                                   </div>
                                                     }
                                                    {cpt_envoye && vcpt && <AjouterFichier listfichierInfo={listfichierInfo} setListfichierInfo={setListfichierInfo}  id={nbrfichier} cpt_envoye={cpt_envoye} setCpt_envoye={setCpt_envoye} />}
                                                    
                                                </>}
                                                   {/* AED *********** */}
                                                 {!AedExist && <> {aed_envoye && <button onClick={() =>{setVaed(!vaed)}} type="button" class="btn btn-light btn-lg btn-block">Ajouter Autorisation d'engagement de dépenses AED</button>}  
                                                  {!aed_envoye && 
                                                   <div class="alert alert-success" role="alert">
                                                   Autorisation d'engagement de dépenses AED ajouté avec succes
                                                 </div>
                                                  }
                                                    {aed_envoye && vaed && <AjouterAED listfichierInfo={listfichierInfo} setListfichierInfo={setListfichierInfo}  id={nbrfichier}  aed_envoye={aed_envoye} setAed_envoye={setAed_envoye} />}
                                                </>}
         
                                                    <button type="button" onClick={(e)=> newfichierComponent(e)}  class="btn btn-light btn-lg btn-block">Ajouter autres fichiers</button>
                                                    {listfichier}

                                                    

 <br/>
                                                    <br/>
                                                    <button type="submit"
                                                     onClick={post}
                                                      className="btn  theme-bg text-white f-12">Envoyer la demande</button>
                                                    <button type="button"
                                                     onClick={post2}
                                                      className="btn  theme-bg2 text-white f-12">Enregistrer les modifications</button>
                                                    
                                                   

                                             
                                                   
                                         
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

export default ModifierDemande