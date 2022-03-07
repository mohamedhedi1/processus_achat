package com.example.processus_backend.security.config;

import com.google.common.collect.Sets;


import java.util.Set;

import static com.example.processus_backend.security.config.AppPermission.USER_READ;
import static com.example.processus_backend.security.config.AppPermission.USER_WRITE;

public enum AppRole {
    ADMIN(Sets.newHashSet(
            USER_READ,
            USER_WRITE
            ));

    private final Set<AppPermission> permissions;


    AppRole(Set<AppPermission> permission)
    {
        this.permissions=permission;
    }
    public Set<AppPermission> getPermissions()
    {
        return permissions;
    }
}
