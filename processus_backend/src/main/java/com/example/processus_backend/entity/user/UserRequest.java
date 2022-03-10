package com.example.processus_backend.entity.user;

import com.example.processus_backend.security.config.AppRole;
import lombok.*;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
@Builder
public class UserRequest {
    private String emailId;
    private String firstName;
    private String lastName;
    private String post;
    private String cin;
    private String password;
    private AppRole appRole;
}
