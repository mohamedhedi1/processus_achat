package com.example.processus_backend.dossierAchat;

import com.example.processus_backend.dossierAchat.file.File;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;


@Entity
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DemandeAchat {
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
    private Long demandeAchatId;
    private String projet;
    private int estimation;
    private LocalDate delais;
    private boolean envoye;
    private LocalDate datenvoi;

    @OneToMany(
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER
    )
    @JoinColumn(
            name="demandeAchatId",
            referencedColumnName = "demandeAchatId"
    )
    private List<File> files;
    private String useremail;

    public void addFile(File file)
    {
        files.add(file);

    }
}
