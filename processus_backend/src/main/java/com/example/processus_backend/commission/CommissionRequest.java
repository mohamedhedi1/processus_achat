package com.example.processus_backend.commission;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDate;
import java.util.List;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class CommissionRequest {
    private String name  ;
    private String role ;
    private LocalDate dateOfCreation;
    private  String abrivation ;
    private String type;
    private List<String> emails;
}
