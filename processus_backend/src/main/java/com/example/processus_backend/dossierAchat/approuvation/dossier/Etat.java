package com.example.processus_backend.dossierAchat.approuvation.dossier;

import com.example.processus_backend.dossierAchat.approuvation.file.Approuvation_file_Request;
import lombok.*;

import java.util.List;
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Setter
public class Etat {
    private Long approuvationId;
    private String approuvation;
    private  String remarque ;
    private Long etape ;
    private List<Approuvation_file_Request> approuvation_file_requestList;
}
