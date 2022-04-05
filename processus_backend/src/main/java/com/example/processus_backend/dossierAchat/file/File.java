package com.example.processus_backend.dossierAchat.file;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class File {
    @Id
    @SequenceGenerator(
            name = "File_sequence",
            sequenceName = "File_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "File_sequence"
    )
    private Long fileId;
    private String filename;
    private String fileDownloadUri;
    private String fileType;
    private long size;
    private String titre;
    private String objet;
}
