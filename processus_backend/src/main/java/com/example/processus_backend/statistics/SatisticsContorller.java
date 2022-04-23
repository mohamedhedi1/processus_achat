package com.example.processus_backend.statistics;

import com.example.processus_backend.dossierAchat.DemandeAchatRepository;
import com.example.processus_backend.dossierAchat.approuvation.dossier.ApprouvationDoosierRepository;
import com.example.processus_backend.dossierAchat.approuvation.dossier.Approuvation_dossier;
import com.example.processus_backend.user.User;
import com.example.processus_backend.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins= "http://localhost:3000")
@RestController
@RequestMapping(path="/stat")
public class SatisticsContorller {
    @Autowired

    private ApprouvationDoosierRepository app;
    private  UserRepository userRepository;
    private  DemandeAchatRepository demandeAchatRepository ;


    public SatisticsContorller(ApprouvationDoosierRepository approuvationDossierRepository, UserRepository userRepository, DemandeAchatRepository demandeAchatRepository) {

        this.app = approuvationDossierRepository;
        this.userRepository = userRepository;
        this.demandeAchatRepository = demandeAchatRepository;
    }
    @GetMapping()
    public  Satistics getAlll(){

        List<Approuvation_dossier> ap=app.findAll();
        int fin= 0;
        List<Integer> sereis_rejeter = new ArrayList<Integer>(List.of(0,0,0,0,0,0,0,0));
        List<Integer> series_accepte=new ArrayList<Integer>(List.of(0,0,0,0,0,0,0,0));
        List<String> sereisStructure=new ArrayList<String>();
        List<Integer> sereisStructureNumbes=new ArrayList<Integer>();
        for(int j =0 ;j< ap.size();j++){
            Approuvation_dossier p =ap.get(j);
            int  i =p.getEtape().getEtapeId().intValue();
            if ((i ==9)){
                fin++ ;
            }
            if (!(i ==9)){
                String approuvation = p.getApprouvation();
                if(approuvation.equals("r")){
                    sereis_rejeter.set(i - 1, sereis_rejeter.get(i - 1) + 1);
                }
                if(approuvation.equals("a")){
                    series_accepte.set(i - 1, series_accepte.get(i - 1) + 1);

                }
            }
            if(i==1){
                String name=p.getDemandeAchat().getUseremail();
                boolean b = !(name.equals(""));
                if  (b){
                    User u = userRepository.findUserByEmail(name).orElse(null);
                    String structureName = u.getStructure().getName();
                    Integer index =sereisStructure.indexOf(structureName);

                    if(index==-1 ){
                        sereisStructure.add(structureName);
                        sereisStructureNumbes.add(1);

                    }
                    else{
                        sereisStructureNumbes.set(index,sereisStructureNumbes.get(index)+1) ;
                    }
                }

            }
        }
        int  demandeAchats =demandeAchatRepository.findAll().size() ;
        Satistics satistics =Satistics.builder()
                .demandeachataccepte(series_accepte)
                .demandeachatrejete(sereis_rejeter)
                .pieNames(sereisStructure)
                .fin(fin)
                .entrain(demandeAchats)
                .pieSeries(sereisStructureNumbes)
                .build();
        return satistics;
    }
}
