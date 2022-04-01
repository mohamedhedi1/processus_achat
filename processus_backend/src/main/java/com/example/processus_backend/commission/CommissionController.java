package com.example.processus_backend.commission;

import com.example.processus_backend.security.config.AppPermission.AppPermission;
import com.example.processus_backend.security.config.AppPermission.AppPermissionService;

import com.example.processus_backend.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins= "http://localhost:3000")
@RestController
@RequestMapping(path="api/v1/commission")
public class CommissionController {
    private final CommissionService commissionService;
    private  final AppPermissionService appPermissionService;
    private final UserService userService;
    @Autowired
    public CommissionController(CommissionService commissionService, AppPermissionService appPermissionService, UserService userService) {
        this.commissionService = commissionService;
        this.appPermissionService = appPermissionService;

        this.userService = userService;
    }
    @GetMapping
    public List<CommissionTableRow> getAllCommissions(){
        List<Commission> allCommission = commissionService.getAllCommission();
        List<CommissionTableRow> commissionTableRowList=allCommission.stream().map(commission ->
                {    List<String> e=commission.getUserList().stream().map(user -> {
                    return  user.getEmail();
                }
                ).toList();
                    CommissionTableRow commissionTableRowBuilder = CommissionTableRow.builder()
                            .abrivation(commission.getAbrivation())
                            .name(commission.getName())
                            .type(commission.getType())
                            .id(commission.getCommissionId())
                            .emails(e)
                            .build();
                    return commissionTableRowBuilder;
                }
        ).toList();
                return commissionTableRowList;
    }
    @GetMapping(path ="{name}")
    public Commission getCommission(@PathVariable("name")String name){
      return commissionService.getCommission(name);
    }
    @PostMapping(path = "addCommission")
    public void addCommission(@RequestBody CommissionRequest commissionRequest){
         List<AppPermission> appPermissions =appPermissionService.getAllById(commissionRequest.getPrivelages());

        Commission commission= Commission.builder()
                .name(commissionRequest.getName())
                .dateOfCreation(commissionRequest.getDateOfCreation())
                .abrivation(commissionRequest.getAbrivation())
                .type(commissionRequest.getType())
                .appPermission(appPermissions)
                .build();
        commissionService.addCommission(commission,commissionRequest.getEmails());

    }
    @PutMapping(path = "updateCommission")
    public void updateCommission(@RequestBody CommissionTableRow commissionRequest){


        Commission commission= Commission.builder()
                .commissionId(commissionRequest.getId())
                .name(commissionRequest.getName())
                .abrivation(commissionRequest.getAbrivation())
                .build();
        commissionService.updateCommission(commission,commissionRequest.getEmails());
    }
    //exemple:http://localhost:12345?values=firstValue&values=secondValue&values=thirdValue
    @DeleteMapping(path = "deleteUser/")
    public void deleteUsersFromCommission(@RequestParam List<String> emails,@RequestParam("name") String name){
        commissionService.DeleteUsersFromCommission(emails,name);
    }
    @DeleteMapping(path = "{id}")
    public void deleteUsersFromCommission(@PathVariable Long id){
        commissionService.deleteCommission(id);
    }
    @PutMapping(path = "addUsersToCommission")
    public void addUsersToCommission(@RequestParam List<String> emails,@RequestParam("name")String name){
        commissionService.addUsersToCommission(name,emails);
    }
}
