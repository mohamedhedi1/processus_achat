package com.example.processus_backend.dossierAchat;

import com.example.processus_backend.Structure.Structure;
import com.example.processus_backend.Structure.StructureRequest;
import com.example.processus_backend.security.config.AppRole.AppRole;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@CrossOrigin(origins= "http://localhost:3000")
@RestController
@RequestMapping(path = "api/DemandeAchat")
public class DemandeAchatController {
    @PostMapping
    public void DemandeAchat(@RequestBody StructureRequest structureRequest){


    }
}
