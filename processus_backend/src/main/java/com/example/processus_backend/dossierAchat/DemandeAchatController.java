package com.example.processus_backend.dossierAchat;


import com.example.processus_backend.dossierAchat.approuvation.dossier.ApprouvationDoosierRepository;
import com.example.processus_backend.dossierAchat.approuvation.dossier.ApprouvationDossierService;
import com.example.processus_backend.dossierAchat.approuvation.dossier.Approuvation_dossier;
import com.example.processus_backend.dossierAchat.approuvation.dossier.Approuvation_dossier_Request;
import com.example.processus_backend.dossierAchat.etape.Etape;
import com.example.processus_backend.dossierAchat.etape.EtapeRepository;
import com.example.processus_backend.dossierAchat.file.File;
import com.example.processus_backend.dossierAchat.file.FileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


@CrossOrigin(origins= "http://localhost:3000")
@RestController
@RequestMapping(path = "api/DemandeAchat")
public class DemandeAchatController {

    @Autowired
    private  final ApprouvationDoosierRepository approuvationDoosierRepository;
    private final ApprouvationDossierService approuvationDossierService;
    private  final EtapeRepository etapeRepository;
    private  final  DemandeAchatRepository demandeAchatRepository;
    private final DemandeAchatService demandeAchatService;
    private final FileRepository fileRepository;

    public DemandeAchatController(ApprouvationDoosierRepository approuvationDoosierRepository, ApprouvationDossierService approuvationDossierService, EtapeRepository etapeRepository, DemandeAchatRepository demandeAchatRepository, DemandeAchatService demandeAchatService, FileRepository fileRepository) {
        this.approuvationDoosierRepository = approuvationDoosierRepository;
        this.approuvationDossierService = approuvationDossierService;
        this.etapeRepository = etapeRepository;
        this.demandeAchatRepository = demandeAchatRepository;
        this.demandeAchatService = demandeAchatService;
        this.fileRepository = fileRepository;
    }

    @PostMapping(path ="nonenvoye")
    public void DemandeAchatnoenvoye(@RequestBody DemandeAchatRequest demandeAchatRequest){

       DemandeAchat demandeAchat = DemandeAchat.builder()
            .projet(demandeAchatRequest.getProjet())
            .estimation(demandeAchatRequest.getEstimation())
            .delais(demandeAchatRequest.getDelais())
            .envoye(false)
            .datenvoi(LocalDate.now())
            .files(demandeAchatRequest.getFiles())
            .useremail(demandeAchatRequest.getUseremail())
            .build();
    demandeAchatService.addDemandeAchat(demandeAchat);

    }

    @PostMapping(path ="envoyer/{demandeAchatId}")
    public void EnvoyerDemande(@PathVariable Long demandeAchatId)
    {
        DemandeAchat demandeAchat = demandeAchatRepository.getById(demandeAchatId);
        demandeAchat.setEnvoye(true);
        demandeAchat.setDatenvoi(LocalDate.now());
        demandeAchatRepository.save(demandeAchat);




        Etape etape=  etapeRepository.findById(Integer.toUnsignedLong(1)).orElse(null);
        Approuvation_dossier_Request approuvation_dossier_request= Approuvation_dossier_Request.builder()
                .demandeAchat(demandeAchatId)
                .remarque("")
                .approuvation("notraite")
                .etape(Integer.toUnsignedLong(1))
                .build();
        DemandeAchat demandeAchat1=demandeAchatRepository.findById(approuvation_dossier_request.getDemandeAchat()).orElse(null);

        Approuvation_dossier approuvation_dossier= Approuvation_dossier.builder()
                .approuvation(approuvation_dossier_request.getApprouvation())
                .demandeAchat(demandeAchat1)
                .remarque(approuvation_dossier_request.getRemarque())
                .etape(etape)
                .date(LocalDate.now())
                .build();
        approuvationDoosierRepository.save(approuvation_dossier);



    }
    @PutMapping(path="deletefichier/{idDemande}/{idfichier}")
    public void deleteFileFromDemande(@PathVariable Long idDemande,@PathVariable Long idfichier)
    {

        DemandeAchat d=demandeAchatRepository.findById(idDemande).orElse(null);

        /*List<DemandeAchat> demandeAchats = demandeAchatService.getAlldDemandes();
        for(DemandeAchat demande : demandeAchats )
        {
            if(demande.getDemandeAchatId()==idDemande )
            {
                demandeAchat.setDemandeAchatId(demande.getDemandeAchatId());
                demandeAchat.setProjet(demande.getProjet());
                demandeAchat.setEstimation(demande.getEstimation());
                demandeAchat.setDelais(demande.getDelais());
                demandeAchat.setEnvoye(demande.isEnvoye());
                demandeAchat.setDatenvoi(demande.getDatenvoi());
                demandeAchat.setUseremail(demande.getUseremail());
                List<File> files = demande.getFiles();

                if (files.isEmpty() ){
                    files=new ArrayList<File>();
                }
                if(!files.isEmpty() && (files!=null))
                { for(File file : files)
                {
                    if(file.getFileId() != idfichier)
                    {
                        demandeAchat.addFile(file);
                    }
                }}

                break;
            }

        }*/
        List<File> files = d.getFiles();

        if (files.isEmpty() ){
            files=new ArrayList<File>();
        }
        d.setFiles(new ArrayList<File>());
        if(!files.isEmpty() && (files!=null))
        { for(File file : files)
        {     Long id=file.getFileId();
            int result = Long.compare(id, idfichier);

            if(result!=0)
            {
                System.out.print(id);
                System.out.print(idfichier);
                System.out.println("deltteli");
                d.addFile(file);
            }
        }}

        demandeAchatRepository.save(d);



    }

    @DeleteMapping(path ="envoyer/{demandeAchatId}")
    public void SupprimerDemande(@PathVariable Long demandeAchatId)
    {
        demandeAchatRepository.deleteById(demandeAchatId);


    }

    @GetMapping("getDemandeById/{demandeAchatId}")
    public DemandeAchat getDemandeById(@PathVariable Long demandeAchatId )
    {
        List<DemandeAchat> demandeAchats = demandeAchatService.getAlldDemandes();
        for(DemandeAchat demande : demandeAchats )
        {
            if(demande.getDemandeAchatId()==demandeAchatId )
                return demande;

        }
        return null;
    }



    @PostMapping(path="addfile/{demandeAchatId}")
    public void addfiletodemande(@PathVariable Long demandeAchatId)
    {
       DemandeAchat demandeAchat= demandeAchatRepository.getById(demandeAchatId);
       List<File> files=fileRepository.findAll();
       int size=files.size()-1;
       File file =files.get(size);
       demandeAchat.addFile(file);

        demandeAchatRepository.save(demandeAchat);


    }


    @PostMapping()
    public void DemandeAchat(@RequestBody DemandeAchatRequest demandeAchatRequest){
    DemandeAchat demandeAchat = DemandeAchat.builder()
            .projet(demandeAchatRequest.getProjet())
            .estimation(demandeAchatRequest.getEstimation())
            .delais(demandeAchatRequest.getDelais())
            .envoye(true)
            .datenvoi(LocalDate.now())
            .files(demandeAchatRequest.getFiles())
            .useremail(demandeAchatRequest.getUseremail())
            .build();
    demandeAchatService.addDemandeAchat(demandeAchat);
    Long id=demandeAchatRepository.getIdbyProjetName(demandeAchatRequest.getProjet());


    Etape etape=  etapeRepository.findById(Integer.toUnsignedLong(1)).orElse(null);
    Approuvation_dossier_Request approuvation_dossier_request= Approuvation_dossier_Request.builder()
                .demandeAchat(id)
                .remarque("")
                .approuvation("notraite")
                .etape(Integer.toUnsignedLong(1))
                .build();
        DemandeAchat demandeAchat1=demandeAchatRepository.findById(approuvation_dossier_request.getDemandeAchat()).orElse(null);

       Approuvation_dossier approuvation_dossier= Approuvation_dossier.builder()
                .approuvation(approuvation_dossier_request.getApprouvation())
                .demandeAchat(demandeAchat1)
                .remarque(approuvation_dossier_request.getRemarque())
                .etape(etape)
                .date(LocalDate.now())
                .build();
      approuvationDoosierRepository.save(approuvation_dossier);
    }
/*
    @GetMapping
    public List<DemandeAchatModel> getAllDemande()
    {
        List<DemandeAchat> demandesAchats = demandeAchatService.getAlldDemandes();
        List<DemandeAchatModel> demandeAchatModels = demandesAchats.stream().map(demande ->
        {
            List<String> pathfichier = demande.getFiles().stream().map(file ->
            {
                return file.getFileDownloadUri();
            }).toList();
            return DemandeAchatModel.builder()
                    .id(demande.getDemandeAchatId())
                    .projet(demande.getProjet())
                    .estimation(demande.getEstimation())
                    .delais(demande.getDelais())
                    .envoye(demande.isEnvoye())
                    .datenvoi(demande.getDatenvoi())
                    .pathfichiers(pathfichier)
                    .build();


        }).toList();
        return demandeAchatModels;
    }
*/
@GetMapping(path = "{email}")
public List<DemandeAchat> getAllDemande(@PathVariable("email")String email)
{
     List<DemandeAchat> demandeAchats = demandeAchatService.getAlldDemandes();
     int size=demandeAchats.size();
    List<DemandeAchat> ds=new ArrayList<DemandeAchat>();
    for(int i =0 ;i<size;i++){
        String user = demandeAchats.get(i).getUseremail();
        if(user==email){
            ds.add(demandeAchats.get(i));
        }

     }
    return ds;
}
    @GetMapping()
    public List<DemandeAchat> getAllDemande()
    {
        List<DemandeAchat> demandeAchats = demandeAchatService.getAlldDemandes();

        return demandeAchats;
    }
 /* ****** partie modification */


    @PutMapping(path="modifierDemandeEnvoye")
    public void DemandeAchatModifier(@RequestBody DemandeAchat demandeAchat){
        boolean Vcpt =false;
        boolean Vaed = false;
        List<File> files = demandeAchat.getFiles();
        List<File> filesFinale= new ArrayList<File>();
        for(int i=0;i<files.size();i++)
        {
            if(Vcpt == false && files.get(i).getTitre().length()>3 && files.get(i).getObjet()!="")
            {
                Vcpt=true;
                filesFinale.add(files.get(i));
            }else if(Vaed == false && files.get(i).getTitre()=="AED") {
                Vaed=true;
                filesFinale.add(files.get(i));
            }else if(files.get(i).getTitre()=="")
            {
                filesFinale.add(files.get(i));

            }

        }
        DemandeAchat demandeAchatF = DemandeAchat.builder()
                .projet(demandeAchat.getProjet())
                .estimation(demandeAchat.getEstimation())
                .delais(demandeAchat.getDelais())
                .envoye(true)
                .datenvoi(LocalDate.now())
                .files(filesFinale)
                .useremail(demandeAchat.getUseremail())
                .build();

        demandeAchatRepository.save(demandeAchatF);
        Long id=demandeAchatRepository.getIdbyProjetName(demandeAchat.getProjet());


        Etape etape=  etapeRepository.findById(Integer.toUnsignedLong(1)).orElse(null);
        Approuvation_dossier_Request approuvation_dossier_request= Approuvation_dossier_Request.builder()
                .demandeAchat(id)
                .remarque("")
                .approuvation("notraite")
                .etape(Integer.toUnsignedLong(1))
                .build();
        DemandeAchat demandeAchat1=demandeAchatRepository.findById(approuvation_dossier_request.getDemandeAchat()).orElse(null);

        Approuvation_dossier approuvation_dossier= Approuvation_dossier.builder()
                .approuvation(approuvation_dossier_request.getApprouvation())
                .demandeAchat(demandeAchat1)
                .remarque(approuvation_dossier_request.getRemarque())
                .etape(etape)
                .date(LocalDate.now())
                .build();
        approuvationDoosierRepository.save(approuvation_dossier);
    }

    @PutMapping(path="modifierDemandeEnvoye2")
    public void DemandeAchatModifier2(@RequestBody DemandeAchat demandeAchat){
        boolean Vcpt =false;
        boolean Vaed = false;
        List<File> files = demandeAchat.getFiles();
        List<File> filesFinale= new ArrayList<File>();
        for(int i=0;i<files.size();i++)
        {
            if(Vcpt == false && files.get(i).getTitre().length()>3 && files.get(i).getObjet()!="")
            {
                Vcpt=true;
                filesFinale.add(files.get(i));
            }else if(Vaed == false && files.get(i).getTitre()=="AED") {
                Vaed=true;
                filesFinale.add(files.get(i));
            }else if(files.get(i).getTitre()=="")
            {
                filesFinale.add(files.get(i));

            }

        }
        DemandeAchat demandeAchatF = DemandeAchat.builder()
                .projet(demandeAchat.getProjet())
                .estimation(demandeAchat.getEstimation())
                .delais(demandeAchat.getDelais())
                .envoye(false)
                .datenvoi(LocalDate.now())
                .files(filesFinale)
                .useremail(demandeAchat.getUseremail())
                .build();

        demandeAchatRepository.save(demandeAchatF);
        Long id=demandeAchatRepository.getIdbyProjetName(demandeAchat.getProjet());


        Etape etape=  etapeRepository.findById(Integer.toUnsignedLong(1)).orElse(null);
        Approuvation_dossier_Request approuvation_dossier_request= Approuvation_dossier_Request.builder()
                .demandeAchat(id)
                .remarque("")
                .approuvation("notraite")
                .etape(Integer.toUnsignedLong(1))
                .build();
        DemandeAchat demandeAchat1=demandeAchatRepository.findById(approuvation_dossier_request.getDemandeAchat()).orElse(null);

        Approuvation_dossier approuvation_dossier= Approuvation_dossier.builder()
                .approuvation(approuvation_dossier_request.getApprouvation())
                .demandeAchat(demandeAchat1)
                .remarque(approuvation_dossier_request.getRemarque())
                .etape(etape)
                .date(LocalDate.now())
                .build();
        approuvationDoosierRepository.save(approuvation_dossier);
    }

}

