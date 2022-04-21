package com.example.processus_backend.projet;

import com.example.processus_backend.Structure.StructureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins= "http://localhost:3000")
@RestController
@RequestMapping(path = "api/projet")
public class PojetController {
    private final  ProjetRepository projetRepository;
    private  final StructureRepository structureRepository;

    @Autowired
    public PojetController(ProjetRepository projetRepository, StructureRepository structureRepository) {
        this.projetRepository = projetRepository;
        this.structureRepository = structureRepository;
    }



    @PostMapping(path = "add") //api/projet/add
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
    @GetMapping(path="structureNames") // api/projet/structureNames
    public List<String> getStructuresNames(){
       List<String> s=structureRepository.findAll().stream().map(e ->{

            return e.getName();
        }).collect(Collectors.toList());
       return s ;

    }
}
