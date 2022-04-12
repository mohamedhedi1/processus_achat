package com.example.processus_backend.dossierAchat.approuvation.dossier;

import com.example.processus_backend.dossierAchat.DemandeAchat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("approuvationDossier")
@CrossOrigin("*")
public class Approuvation_DossierController {
    private final ApprouvationDossierService approuvationDossierService;

    @Autowired
    public Approuvation_DossierController( ApprouvationDossierService approuvationDossierService) {
        this.approuvationDossierService = approuvationDossierService;
    }

    @PostMapping(path = "add")
    public void add(@RequestBody  Approuvation_dossier_Request approuvation_dossier_request){
        approuvationDossierService.add(approuvation_dossier_request);
    }
    @GetMapping(path="{etape}")  // etape1 =>
    public List<DemandeAchat> get_by_etape(@PathVariable Long etape ){
        return  approuvationDossierService.get_by_etape(etape);
    }
    @GetMapping(path="etat/{id}")  // etape1 =>
    public List<Etat> getEtat(@PathVariable Long id ){
        return  approuvationDossierService.getEtat(id);
    }


}
