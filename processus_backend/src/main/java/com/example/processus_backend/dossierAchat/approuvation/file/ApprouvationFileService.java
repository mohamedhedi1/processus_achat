package com.example.processus_backend.dossierAchat.approuvation.file;

import com.example.processus_backend.dossierAchat.etape.Etape;
import com.example.processus_backend.dossierAchat.etape.EtapeRepository;
import com.example.processus_backend.dossierAchat.file.File;
import com.example.processus_backend.dossierAchat.file.FileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ApprouvationFileService {
    private  final FileRepository fileRepository;
    private final EtapeRepository etapeRepository;
    private final Approuvation_file_Repository approuvationFileRepository;
    @Autowired
    public ApprouvationFileService(FileRepository fileRepository, EtapeRepository etapeRepository, Approuvation_file_Repository approuvationDoosierRepository) {
        this.fileRepository = fileRepository;
        this.etapeRepository = etapeRepository;
        this.approuvationFileRepository = approuvationDoosierRepository;
    }
    public void add(Approuvation_file_Request approuvation_file_request){
        File file =fileRepository.getById(approuvation_file_request.getFile());
        Etape etape=etapeRepository.getById(approuvation_file_request.getEtape());
        Approuvation_file approuvation_file = Approuvation_file.builder()
                .approuvation(approuvation_file_request.getApprouvation())
                .file(file)
                .remarque(approuvation_file_request.getRemarque())
                .etape(etape)
                .build();
        approuvationFileRepository.save(approuvation_file);
    }


}

