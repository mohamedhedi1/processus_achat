package com.example.processus_backend.dossierAchat;

import com.example.processus_backend.dossierAchat.file.File;
import com.example.processus_backend.dossierAchat.file.FileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class DemandeAchatService {
    @Autowired
    private final DemandeAchatRepository demandeAchatRepository;
    @Autowired
    private final FileRepository fileRepository;
    public DemandeAchatService(DemandeAchatRepository demandeAchatRepository, FileRepository fileRepository) {
        this.demandeAchatRepository = demandeAchatRepository;
        this.fileRepository = fileRepository;
    }

    public void addDemandeAchat(DemandeAchat demandeAchat) {
   /* if(!pathfichiers.isEmpty())
    {
        List<File> files = pathfichiers.stream().map(pathfichier ->{
            File file = fileRepository.getFileByPath(pathfichier);
            return file;
        }).collect(Collectors.toList());
        demandeAchat.setFiles(files);
    }
  //  demandeAchat.setDemandeAchatId(Integer.toUnsignedLong(11));*/
    System.out.println(demandeAchat);
    demandeAchatRepository.save(demandeAchat);
    }

    public List<DemandeAchat> getAlldDemandes() {
        return demandeAchatRepository.findAll();
    }
}
