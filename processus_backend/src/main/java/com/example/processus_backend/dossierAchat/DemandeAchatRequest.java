package com.example.processus_backend.dossierAchat;

import lombok.*;

import java.io.File;
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
    private int delais;
    private boolean envoye;
    private LocalDate datenvoi;
    private List<String> pathfichiers;
}
