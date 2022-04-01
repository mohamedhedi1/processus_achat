package com.example.processus_backend.user;


import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

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
    private List<Long> privelages;
    private Long structureID;

}
