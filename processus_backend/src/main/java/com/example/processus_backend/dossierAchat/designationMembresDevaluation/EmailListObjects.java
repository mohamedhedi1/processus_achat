package com.example.processus_backend.dossierAchat.designationMembresDevaluation;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmailListObjects {
    private List<String> emails;
}
