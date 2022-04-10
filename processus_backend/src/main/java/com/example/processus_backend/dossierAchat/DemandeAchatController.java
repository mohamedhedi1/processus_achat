package com.example.processus_backend.dossierAchat;


import com.example.processus_backend.dossierAchat.approuvation.dossier.ApprouvationDossierService;
import com.example.processus_backend.dossierAchat.approuvation.dossier.Approuvation_dossier_Request;
import com.example.processus_backend.dossierAchat.etape.Etape;
import com.example.processus_backend.dossierAchat.etape.EtapeRepository;
import com.example.processus_backend.dossierAchat.file.File;
import com.example.processus_backend.dossierAchat.file.FileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;


@CrossOrigin(origins= "http://localhost:3000")
@RestController
@RequestMapping(path = "api/DemandeAchat")
public class DemandeAchatController {

    @Autowired
    private final ApprouvationDossierService approuvationDossierService;
    private  final EtapeRepository etapeRepository;
    private  final  DemandeAchatRepository demandeAchatRepository;
    private final DemandeAchatService demandeAchatService;
    private final FileRepository fileRepository;

    public DemandeAchatController(ApprouvationDossierService approuvationDossierService, EtapeRepository etapeRepository, DemandeAchatRepository demandeAchatRepository, DemandeAchatService demandeAchatService, FileRepository fileRepository) {
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

     approuvationDossierService.add(approuvation_dossier_request);
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
@GetMapping
public List<DemandeAchat> getAllDemande()
{
     List<DemandeAchat> demandeAchats = demandeAchatService.getAlldDemandes();
    return demandeAchats;
}


}
