package com.example.processus_backend.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class UTR {


    Long id;
    String email ;
    String firstName;
    String lastName;
    String cin ;
    String appRoleName;
    boolean locked ;
    String post;
    List<String> structureName;
}
