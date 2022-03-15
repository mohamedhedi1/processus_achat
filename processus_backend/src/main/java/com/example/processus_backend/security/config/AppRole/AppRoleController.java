package com.example.processus_backend.security.config.AppRole;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/AppRole")
public class AppRoleController {
    private final AppRoleService appRoleService;
    @Autowired
    public AppRoleController(AppRoleService appRoleService) {
        this.appRoleService = appRoleService;
    }
    @GetMapping(path="NameAndId")
    public List<AppRoleNameAndId> getAppRoleNameAndId(){
        return appRoleService.getAppRoleNameAndId();

    }
    @GetMapping
    public List<AppRole> getAll(){
        return  appRoleService.getAll();
    }


}
