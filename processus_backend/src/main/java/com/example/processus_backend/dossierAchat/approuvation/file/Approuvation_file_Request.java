package com.example.processus_backend.dossierAchat.approuvation.file;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Approuvation_file_Request {
    private Long approuvationId;
    private Boolean approuvation;
    private  String remarque ;
    private Long etape ;
    private Long file;
}
