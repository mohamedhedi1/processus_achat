package com.example.processus_backend.security.config.AppRole;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface AppRoleRepository extends JpaRepository<AppRole,Long> {
    
    AppRole findByName(String name);
    @Query("select new com.example.processus_backend.security.config.AppRole.AppRoleNameAndId(a.appRoleId,a.name ) from AppRole a ")
    List<AppRoleNameAndId> getAppRoleNameAndId();
    @Query("Select u.name from AppRole u ")
    AppRole getByName(String name);
}
