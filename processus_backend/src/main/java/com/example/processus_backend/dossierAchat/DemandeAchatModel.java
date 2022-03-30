package com.example.processus_backend.dossierAchat;

import lombok.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DemandeAchatModel {
    private Long id;
    private String projet;
    private int estimation;
    private int delais;
    private boolean envoye;
    private LocalDate datenvoi;
    private List<String>  pathfichiers;
    public void addPathfichiers(String pathfichier){pathfichiers.add(pathfichier);}
}
