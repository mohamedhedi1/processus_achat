package com.example.processus_backend.dossierAchat;

import com.example.processus_backend.dossierAchat.file.File;
import lombok.*;


import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class DemandeAchatRequest {
    private String projet;
    private int estimation;
    private LocalDate delais;
    private boolean envoye;
    private LocalDate datenvoi;
    private List<File> files;
    private String useremail;
}
