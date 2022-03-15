package com.example.processus_backend.user;

import com.example.processus_backend.security.config.AppRole.AppRole;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class UserRequest {
    private String email;
    private String firstName;
    private String lastName;
    private String post;
    private String cin;
    private Long approle;
    private Long structureID;

}
