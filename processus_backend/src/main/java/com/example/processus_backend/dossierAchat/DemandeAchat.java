package com.example.processus_backend.dossierAchat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.File;
@Entity
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DemandeAchat {

    @Id
    private Long id;
    private String projet;
    private File file;
}
