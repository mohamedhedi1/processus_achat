package com.example.processus_backend.designationMembresDevaluation;

import com.example.processus_backend.user.User;
import com.example.processus_backend.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;
@RestController
@CrossOrigin("*")
public class dmcdeContorller {
    private final dmcdeRepository dmcdeRepository;
    private final UserRepository userRepository;
    @Autowired
    public dmcdeContorller(com.example.processus_backend.designationMembresDevaluation.dmcdeRepository dmcdeRepository, UserRepository userRepository) {
        this.dmcdeRepository = dmcdeRepository;
        this.userRepository = userRepository;
    }
    @PostMapping(path = "/etape6/{id}")
    public void etape6(@PathVariable("id") Long id , @RequestBody ListObject em){
        List<User> users =em.getEmails().stream().map(e ->{
            return  userRepository.getByEmail(e);
        }).collect(Collectors.toList());
        dMCDe d =dMCDe.builder()
                .idDossierAchat(id)
                .usersStructureDachata(users)
                .build();
        dmcdeRepository.save(d);


    }
    @PostMapping(path = "/etape7/{id}")
    public void etape7(@PathVariable("id") Long id , @RequestBody Dates dates){
        dMCDe d =dmcdeRepository.getByIDdoosierachat(id);
        d.setDateDeLancementDeAO(dates.getDateDeLancementDeAo());
        d.setDateDeLancementdesPills(dates.getDateDeLancementDeSeance());
        dmcdeRepository.save(d);

    }
    @PostMapping(path = "/etape8/{id}")
    public void etape8(@PathVariable("id") Long id , @RequestBody List<String> emails){
        List<User> users =emails.stream().map(e ->{
            return  userRepository.getByEmail(e);
        }).collect(Collectors.toList());
        dMCDe d =dmcdeRepository.getByIDdoosierachat(id);
        d.setUsersEvaluation(users);
        dmcdeRepository.save(d);

    }
}
