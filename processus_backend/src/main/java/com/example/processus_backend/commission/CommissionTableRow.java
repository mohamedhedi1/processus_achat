package com.example.processus_backend.commission;

import lombok.*;

import java.time.LocalDate;
import java.util.List;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CommissionTableRow {
    private Long id;
    private String name  ;
    private String role ;
    private LocalDate dateOfCreation;
    private String type;
    private  String abrivation ;
    private List<String> emails;
    public void addEmails(String email){
        emails.add(email);
    }
}
