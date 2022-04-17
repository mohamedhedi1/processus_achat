package com.example.processus_backend.dossierAchat.designationMembresDevaluation;

import com.example.processus_backend.dossierAchat.DemandeAchat;
import com.example.processus_backend.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class dMCDe {
    @Id
    @SequenceGenerator(
            name = "dmcde_sequence",
            sequenceName = "dmcde_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "dmcde_sequence"
    )
    private Long id;

    @ManyToMany(
            fetch = FetchType.EAGER
    )
    @JoinTable(
            name="dmcde_user_structure_achat_map",
            joinColumns = @JoinColumn(
                    name = "id",
                    referencedColumnName = "id"
            ),
            inverseJoinColumns = @JoinColumn(
                    name = "userId",
                    referencedColumnName = "userId"
            )

    )
    private List<User> usersEvaluation;
    private  Long idDossierAchat ;
    private String DateDeLancementDeAO;
    private String DateDeLancementdesPills ;
    @ManyToMany(
            fetch = FetchType.EAGER
    )
    @JoinTable(
            name="dmcde_user_structure_achat_map",
            joinColumns = @JoinColumn(
                    name = "id",
                    referencedColumnName = "id"
            ),
            inverseJoinColumns = @JoinColumn(
                    name = "userId",
                    referencedColumnName = "userId"
            )

    )
    private List<User> usersStructureDachata;


}
