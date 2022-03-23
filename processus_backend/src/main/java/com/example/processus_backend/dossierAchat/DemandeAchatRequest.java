package com.example.processus_backend.dossierAchat;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

import java.io.File;
@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class DemandeAchatRequest {
    private String projet;
    private File file;
}
