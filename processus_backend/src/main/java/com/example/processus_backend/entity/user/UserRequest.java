package com.example.processus_backend.entity.user;

import com.example.processus_backend.security.config.AppRole;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class UserRequest {
    private String emailId;
    private String firstName;
    private String lastName;
    private String post;
    private String cin;
    private String password;
    private AppRole appRole;
}
