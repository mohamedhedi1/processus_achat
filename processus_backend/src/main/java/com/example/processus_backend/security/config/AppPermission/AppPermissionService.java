package com.example.processus_backend.security.config.AppPermission;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppPermissionService {
    private final  AppPermissionRepository appPermissionRepository;
    @Autowired
    public AppPermissionService(AppPermissionRepository appPermissionRepository) {
        this.appPermissionRepository = appPermissionRepository;
    }
    public List<AppPermission> getAllById(Iterable<Long> longs){
        return appPermissionRepository.findAllById(longs);
    }
    public List<AppPermission> getAll(){
        return  appPermissionRepository.findAll();
    }

}
