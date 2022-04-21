package com.example.processus_backend.projet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins= "http://localhost:3000")
@RestController
@RequestMapping(path = "api/projet")
public class PojetController {
    private final  ProjetRepository projetRepository;

    @Autowired
    public PojetController(ProjetRepository projetRepository) {
        this.projetRepository = projetRepository;
    }



    @PostMapping(path = "add")
    public void add(@RequestBody ProjetRequest p ){
        Projet projet= Projet.builder()
                .delai_de_realisation(p.getDelai_de_realisation())
                .name(p.getName())
                .nomStructure(p.getNomStructure())
                .Type(p.getType())
                .build();
        projetRepository.save(projet);
    }
    @GetMapping(path="names")
    public List<String> get_names(){
       List<String> projets= projetRepository.findAll().stream().map(e ->{
            return  e.getName() ;
        }).collect(Collectors.toList());
       return projets;
    }
}
