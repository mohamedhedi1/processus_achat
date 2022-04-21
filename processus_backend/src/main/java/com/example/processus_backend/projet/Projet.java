package com.example.processus_backend.projet;

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
public class Projet {
    @Id
    @SequenceGenerator(
            name = "projet_sequence",
            sequenceName = "projet_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "projet_sequence"
    )
    private  Long idProjet;
    private  String name;
    private  String nomStructure;
    private  String Type ;
    private  String delai_de_realisation ;

}
