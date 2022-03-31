package com.example.processus_backend.dossierAchat;

import com.example.processus_backend.Structure.StructureRequest;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.Date;
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
                .build();
        demandeAchatService.addDemandeAchat(demandeAchat,demandeAchatRequest.getPathfichiers());

    }
    @PostMapping()
    public void DemandeAchat(@RequestBody DemandeAchatRequest demandeAchatRequest){
    DemandeAchat demandeAchat = DemandeAchat.builder()
            .projet(demandeAchatRequest.getProjet())
            .estimation(demandeAchatRequest.getEstimation())
            .delais(demandeAchatRequest.getDelais())
            .envoye(true)
            .datenvoi(LocalDate.now())
            .build();
    demandeAchatService.addDemandeAchat(demandeAchat,demandeAchatRequest.getPathfichiers());


    }

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



}
