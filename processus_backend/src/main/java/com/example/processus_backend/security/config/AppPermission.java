package com.example.processus_backend.security.config;

public enum AppPermission {
    USER_READ("user:read"),
    USER_WRITE("user:write");

    private final String permission;
    AppPermission(String permission)
    {
        this.permission=permission;
    }
    public String getPermission()
    {
        return permission;
    }
}
