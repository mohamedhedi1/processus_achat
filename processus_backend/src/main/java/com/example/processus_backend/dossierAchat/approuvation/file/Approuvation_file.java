package com.example.processus_backend.dossierAchat.approuvation.file;

import com.example.processus_backend.dossierAchat.DemandeAchat;
import com.example.processus_backend.dossierAchat.etape.Etape;
import com.example.processus_backend.dossierAchat.file.File;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Approuvation_file {
    @Id
    @SequenceGenerator(
            name = "approuvation_sequence",
            sequenceName = "approuvation_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "approuvation_sequence"
    )
    private Long approuvationId;
    private Boolean approuvation;
    private  String remarque ;
    @OneToOne(
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER
    )
    private Etape etape ;
    @OneToOne(
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER
    )
    private File file;




}
