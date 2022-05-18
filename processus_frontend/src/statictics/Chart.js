import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import { useState } from "react";
import Card from '@mui/material/Card';
import { Box } from "@mui/system";
import { useEffect } from "react";
import axios from "axios";
function RedBar() {
    return (
      <Box
        sx={{
          height: 0,
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? 'rgba(0, 0, 0, 0)'
              : 'rgb(255 132 132 / 25%)',
        }}
      />
    );
  }
const ChartTest =()=> {
  const    [series,setSeries] =useState([{
    name: 'Demande Achat rejeté',
    data: [4, 5, 5, 6, 1, 8, 3,0 ]
  }, {
    name: 'Demande Achat Approuvé',
    data: [6, 8, 1, 9, 7, 0, 1, 1]
  }])
      
const    [options,setOption]=useState( {
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: ['Traitemenet de demande Achat', 'Approuvation de CPT','Prépartion de Projet de CCAP', 'Finalisaiton de CC',  'Approuvationde CC', "Affecatation de Dossier d'achat", "Plantifiacation les dates de lancement de l'AO","Désignation des membres de la commission d'evaluation"],
        },
        yaxis: {
          title: {
            text: 'nombre de Demande achat'
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return  val 
            }
          }
        }
      })
    
    
 



      const    [optionsPie,setOptionPie]=useState( {
       
        chart: {
            width: 380,
            type: 'pie',
          
          },
       labels: ["Structure d'achat ", 'Structure de plantification', 'Structure Informatique'],
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }   
                
              }]})
            
            
         
    
        
              const    [seriesPie,setSeriesPie] =useState([44, 55, 13])
              const [fin,setFin]=useState(10)
              const [a,setA]=useState(3)
                  
        
                
             
        
            
        
  useEffect(  () => {
       
    async function fetchData() {
      
      
      const response=await axios.get("http://localhost:8080/stat")
      const r2=await response.data
     /* let s1 =series
      let s2 =seriesPie
      let o =optionsPie 
      s1[0].data= r2.demandeachatrejete
      s1[1].data=r2.demandeachataccepte
      o.labels=r2.pieNames */
       setSeriesPie(r2.pieSeries)
       setOptionPie({...optionsPie ,labels:r2.pieNames})
      let p = [{
        name: 'Demande Achat rejeté',
        data: r2.demandeachatrejete
      }, 
      {
        name: 'Demande Achat Approuvé',
        data:r2.demandeachataccepte
      }
    ]
      setSeries(p)
      setA(r2.fin)
      setFin(r2.entrain)
      
  
    }
   fetchData();
    
  } ,[setSeriesPie,setOptionPie,setSeries,setA,setFin]);
   

  
          
                return (
                  <div className="pcoded-main-container">
                  <div className="pcoded-wrapper">
                      <div className="pcoded-content">
                          <div className="pcoded-inner-content">
                              <div className="main-body">
                                  <div className="page-wrapper">
        
                    <Card  elevation={5}  sx={{
                        marginTop: 10 ,
                        margin:10,
                      
                        display: 'flex' }}>
                        
            <div>
        <ReactApexChart options={options} series={series} type="bar" height={350} />
        </div>
        </Card>
        <div className="row">
        <div className="col-md-6">
        <Card  elevation={5}  sx={{
                       marginLeft:10,
                         width:500,
                        display: 'flex' }}>
                        
            
         <ReactApexChart options={optionsPie} series={seriesPie} type="pie" width={380} />
         
          </Card>
          </div>
          <div className="col-md-4">
          <RedBar />
                          <div className="card yearly-sales ">
                                        <div  className="card-block">
                                            <h6  className="mb-4">Demande Achat en cours de Traitemenet</h6>
                                            <div  className="row d-flex align-items-center">
                                                <div  className="col-9">
                                                    <h3  className="f-w-300 d-flex align-items-center  m-b-0"><i className="feather icon-arrow-down text-c-red f-30 m-r-10"></i>{a}</h3>
                                                </div>
                                                
                                            </div>
                                           
                                        </div>
                                    </div>
                                    <div className="card yearly-sales ">
                                        <div  className="card-block">
                                            <h6  className="mb-4">demande d'achat finalisée</h6>
                                            <div  className="row d-flex align-items-center">
                                                <div  className="col-9">
                                                    <h3  className="f-w-300 d-flex align-items-center  m-b-0"><i className="feather icon-arrow-up text-c-green f-30 m-r-10"></i>{fin}</h3>
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
          
              );
            
          }
          
          export default ChartTest;