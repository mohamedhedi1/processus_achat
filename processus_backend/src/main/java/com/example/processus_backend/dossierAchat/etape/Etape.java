package com.example.processus_backend.dossierAchat.etape;

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
public class Etape {
    @Id
    @SequenceGenerator(
            name = "DemandeAchat_sequence",
            sequenceName = "DemandeAchat_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "DemandeAchat_sequence"
    )
    private Long etapeId;
    private  String etape ;

}
