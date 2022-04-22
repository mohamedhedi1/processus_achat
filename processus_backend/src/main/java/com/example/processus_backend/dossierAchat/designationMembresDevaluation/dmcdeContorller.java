package com.example.processus_backend.dossierAchat.designationMembresDevaluation;

import com.example.processus_backend.Structure.Structure;
import com.example.processus_backend.Structure.StructureRepository;
import com.example.processus_backend.user.User;
import com.example.processus_backend.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;
@CrossOrigin(origins= "http://localhost:3000")
@RestController
@RequestMapping(path = "api/dmcde")
public class dmcdeContorller {
    private final dmcdeRepository dmcdeRepository;
    private final UserRepository userRepository;
    private final StructureRepository structureRepository;
    @Autowired
    public dmcdeContorller(com.example.processus_backend.dossierAchat.designationMembresDevaluation.dmcdeRepository dmcdeRepository, UserRepository userRepository, StructureRepository structureRepository) {
        this.dmcdeRepository = dmcdeRepository;
        this.userRepository = userRepository;
        this.structureRepository = structureRepository;
    }
    @GetMapping(path = "etape6/{id}/{sid}")
    public void etape6(@PathVariable Long id , @PathVariable Long sid  ){

        dMCDe d =dMCDe.builder()
                .idDossierAchat(id)
                .StructureDachata(sid)
                .build();
        dmcdeRepository.save(d);


    }
    @PostMapping(path = "/etape7/{id}")
    public void etape7(@PathVariable("id") Long id , @RequestBody Dates dates){
        dMCDe d =dmcdeRepository.getByIDdoosierachat(id);
        d.setDateDeLancementDeAO(dates.getDate());
        d.setDateDeLancementdesPills(dates.getDate1());
        dmcdeRepository.save(d);

    }
    @PostMapping(path = "/etape8/{id}")
    public void etape8(@PathVariable("id") Long id , @RequestBody EmailListObjects em){
        List<String> emails=em.getEmails();
        List<User> users =emails.stream().map(e ->{
            return  userRepository.getByEmail(e);
        }).collect(Collectors.toList());
        dMCDe d =dmcdeRepository.getByIDdoosierachat(id);
        d.setUsersEvaluation(users);
        dmcdeRepository.save(d);

    }
    @GetMapping(path="stuctureachat")
    public List<SturctureRegionName> getStructureAchat(){
        List<Structure> all = structureRepository.findStuructureachat("Structure d'achat");
       List<SturctureRegionName> s=all.stream().map(e->{
           SturctureRegionName  str=SturctureRegionName.builder()
                   .name(e.getName())
                   .region(e.getRegion())
                   .id(e.getStructureId())
                   .build();
           return str;
       }).collect(Collectors.toList());
       return s ;


    }
}
