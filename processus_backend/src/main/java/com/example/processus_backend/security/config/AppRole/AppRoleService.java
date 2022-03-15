package com.example.processus_backend.security.config.AppRole;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppRoleService {
    @Autowired
    private final AppRoleRepository appRoleRepository;
   public  AppRoleService(AppRoleRepository appRoleRepository){
       this.appRoleRepository = appRoleRepository;
   }
   public List<AppRoleNameAndId> getAppRoleNameAndId(){
       return  appRoleRepository.getAppRoleNameAndId();


   }
   public  AppRole getByName(String name){
       return appRoleRepository.getByName(name);
   }

    public List<AppRole> getAll() {
       return  appRoleRepository.findAll();
    }
}
