package com.example.processus_backend.dossierAchat.approuvation.dossier;

import com.example.processus_backend.dossierAchat.DemandeAchat;
import com.example.processus_backend.dossierAchat.etape.Etape;
import lombok.*;

import javax.persistence.CascadeType;
import javax.persistence.FetchType;
import javax.persistence.OneToOne;
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Approuvation_dossier_Request {

    private Long approuvationId;
    private String approuvation;
    private  String remarque ;
    private Long etape ;
    private Long demandeAchat;

}
