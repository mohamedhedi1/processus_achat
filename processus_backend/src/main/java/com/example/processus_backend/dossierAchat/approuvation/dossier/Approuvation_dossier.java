package com.example.processus_backend.dossierAchat.approuvation.dossier;

import com.example.processus_backend.dossierAchat.DemandeAchat;
import com.example.processus_backend.dossierAchat.etape.Etape;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Approuvation_dossier {

        @Id
        @SequenceGenerator(
                name = "approuvation_dossier_sequence",
                sequenceName = "approuvation_dossier_sequence",
                allocationSize = 1
        )
        @GeneratedValue(
                strategy = GenerationType.SEQUENCE,
                generator = "approuvation_dossier_sequence"
        )
        private Long approuvationId;
        private String approuvation;// approuvee nonapprouve nontraite
        private  String remarque ;
        private LocalDate date;
        @OneToOne(
                cascade = CascadeType.ALL,
                fetch = FetchType.EAGER
        )
        private Etape etape ;
         @OneToOne(
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER
           )
        private DemandeAchat demandeAchat;





    }


