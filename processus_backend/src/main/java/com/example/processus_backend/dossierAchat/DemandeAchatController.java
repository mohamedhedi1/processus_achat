package com.example.processus_backend.dossierAchat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;


@CrossOrigin(origins= "http://localhost:3000")
@RestController
@RequestMapping(path = "api/DemandeAchat")
public class DemandeAchatController {

    @Autowired
    private final DemandeAchatService demandeAchatService;

    public DemandeAchatController(DemandeAchatService demandeAchatService) {
        this.demandeAchatService = demandeAchatService;
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
