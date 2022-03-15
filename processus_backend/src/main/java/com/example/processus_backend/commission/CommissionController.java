package com.example.processus_backend.commission;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="api/v1/commission")
public class CommissionController {
    private final CommissionService commissionService;
    @Autowired
    public CommissionController(CommissionService commissionService) {
        this.commissionService = commissionService;
    }
    @GetMapping
    public List<Commission> getAllCommissions(){
        return commissionService.getAllCommission() ;
    }
    @GetMapping(path ="{name}")
    public Commission getCommission(@PathVariable("name")String name){
      return commissionService.getCommission(name);
    }
    @PostMapping(path = "addCommission")
    public void addCommission(@RequestBody CommissionRequest commissionRequest){
        Commission commission= Commission.builder()
                .name(commissionRequest.getName())
                .dateOfCreation(commissionRequest.getDateOfCreation())
                .abrivation(commissionRequest.getAbrivation())
                .build();
        commissionService.addCommission(commission,commissionRequest.getEmails());

    }
    @PutMapping(path = "updateCommission/{id}")
    public void updateCommission(@PathVariable("id") Long id,@RequestBody CommissionRequest commissionRequest){
        Commission commission= Commission.builder()
                .name(commissionRequest.getName())
                .abrivation(commissionRequest.getAbrivation())
                .role(commissionRequest.getRole())
                .build();
        commissionService.updateCommission(commission,commissionRequest.getEmails(),id);
    }
    //exemple:http://localhost:12345?values=firstValue&values=secondValue&values=thirdValue
    @DeleteMapping(path = "deleteUser/")
    public void deleteUsersFromCommission(@RequestParam List<String> emails,@RequestParam("name") String name){
        commissionService.DeleteUsersFromCommission(emails,name);
    }
    @PutMapping(path = "addUsersToCommission")
    public void addUsersToCommission(@RequestParam List<String> emails,@RequestParam("name")String name){
        commissionService.addUsersToCommission(name,emails);
    }
}
