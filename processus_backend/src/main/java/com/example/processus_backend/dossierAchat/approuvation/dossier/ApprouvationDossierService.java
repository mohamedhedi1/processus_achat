package com.example.processus_backend.dossierAchat.approuvation.dossier;

import com.example.processus_backend.dossierAchat.DemandeAchat;
import com.example.processus_backend.dossierAchat.DemandeAchatRepository;
import com.example.processus_backend.dossierAchat.approuvation.file.Approuvation_file;
import com.example.processus_backend.dossierAchat.approuvation.file.Approuvation_file_Repository;
import com.example.processus_backend.dossierAchat.approuvation.file.Approuvation_file_Request;
import com.example.processus_backend.dossierAchat.etape.Etape;
import com.example.processus_backend.dossierAchat.etape.EtapeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ApprouvationDossierService {
    private  final DemandeAchatRepository demandeAchatRepository;
    private final EtapeRepository etapeRepository;
    private final ApprouvationDoosierRepository approuvationDoosierRepository;
    private  final Approuvation_file_Repository approuvation_file_repository;
    @Autowired
    public ApprouvationDossierService(DemandeAchatRepository demandeAchatRepository, EtapeRepository etapeRepository, ApprouvationDoosierRepository approuvationDoosierRepository, Approuvation_file_Repository approuvation_file_repository) {
        this.demandeAchatRepository = demandeAchatRepository;
        this.etapeRepository = etapeRepository;
        this.approuvationDoosierRepository = approuvationDoosierRepository;
        this.approuvation_file_repository = approuvation_file_repository;
    }
/*
    public void add(Approuvation_dossier_Request approuvation_dossier_request){
        DemandeAchat demandeAchat=demandeAchatRepository.findById(approuvation_dossier_request.getDemandeAchat()).orElse(null);
        Etape etape = etapeRepository.getById(approuvation_dossier_request.getEtape());
        Approuvation_dossier approuvation_dossier= Approuvation_dossier.builder()
                .approuvation(approuvation_dossier_request.getApprouvation())
                .demandeAchat(demandeAchat)
                .remarque(approuvation_dossier_request.getRemarque())
                .etape(etape)
                .build();
        approuvationDoosierRepository.save(approuvation_dossier);
    }

 */

    public List<DemandeAchat> get_by_etape(Long etape) {

        List<Approuvation_dossier> approuvation_dossiers =approuvationDoosierRepository.getApprouvationDossierbyETAPE(etape);
        List<DemandeAchat> demandeAchats =new ArrayList<DemandeAchat>();

        for(int i=0 ;i<approuvation_dossiers.size();i++){
             String traitement=approuvation_dossiers.get(i).getApprouvation();
             if(traitement.equals("notraite")) {
                 demandeAchats.add(approuvation_dossiers.get(i).getDemandeAchat());
             }

        }

        return  demandeAchats ;
    }
    public List<Etat> getEtat(Long Id ){
        List<Etat> etats=new ArrayList<Etat>();
        List<Approuvation_dossier> approuvation_dossiers=approuvationDoosierRepository.getApprouvationDossierbyIdDossier(Id);
        for (int i =0 ;i<approuvation_dossiers.size();i++){
            Approuvation_dossier approuvation_dossier=approuvation_dossiers.get(i);
            List<Long> allFilesIds =approuvation_dossier.getDemandeAchat().getFiles().stream().map(f ->{
                return  f.getFileId();
                    }
            ).collect(Collectors.toList());
            List<Approuvation_file> approuvation_files=approuvation_file_repository.getApprouvationFileby(allFilesIds,approuvation_dossier.getEtape().getEtapeId());
            List<Approuvation_file_Request> approuvation_file_requestList=approuvation_files.stream().map(
                    a ->{
                        Approuvation_file_Request approuvation_file_request =Approuvation_file_Request.builder()
                                .approuvationId(a.getApprouvationId())
                                .approuvation(a.getApprouvation())
                                .etape(a.getEtape().getEtapeId())
                                .file(a.getFile().getFileId())
                                .remarque(a.getRemarque())
                                .build();
                        return  approuvation_file_request;
                    }

            ).collect(Collectors.toList());

            Etat etat = Etat.builder()
                    .approuvation(approuvation_dossier.getApprouvation())
                    .remarque(approuvation_dossier.getRemarque())
                    .etape(approuvation_dossier.getEtape().getEtapeId())
                    .approuvation_file_requestList(approuvation_file_requestList)
                    .build();
            etats.add(etat);

        }
        return  etats ;
    }
    public void add(Approuvation_dossier_Request approuvation_dossier_request){
        DemandeAchat demandeAchat=demandeAchatRepository.findById(approuvation_dossier_request.getDemandeAchat()).orElse(null);
        Etape etape = etapeRepository.getById(approuvation_dossier_request.getEtape());
      /*  Approuvation_dossier approuvation_dossier= Approuvation_dossier.builder()
                .approuvation(approuvation_dossier_request.getApprouvation())
                .demandeAchat(demandeAchat)
                .remarque(approuvation_dossier_request.getRemarque())
                .etape(etape)
                .date(LocalDate.now())
                .build();*/
        List<Approuvation_dossier> approuvation_dossiers=approuvationDoosierRepository.getApprouvationDossierbyIdDossier(demandeAchat.getDemandeAchatId(),etape.getEtapeId());
        Approuvation_dossier approuvation_dossier=approuvation_dossiers.get(0);
        approuvation_dossier.setApprouvation(approuvation_dossier_request.getApprouvation());
        approuvation_dossier.setDate(LocalDate.now());
        approuvation_dossier.setEtape(etape);
        approuvation_dossier.setDemandeAchat(demandeAchat);
        approuvationDoosierRepository.save(approuvation_dossier);
        Approuvation_dossier approuvation_dossier_n= Approuvation_dossier.builder()
                .approuvation(approuvation_dossier_request.getApprouvation())
                .demandeAchat(demandeAchat)
                .remarque(approuvation_dossier_request.getRemarque())
                .etape(etape)
                .date(LocalDate.now())
                .build();
        String traitement=approuvation_dossier_n.getApprouvation();
        Etape etape1=etapeRepository.getById(1L);
        if(traitement.equals("r")) {
            approuvation_dossier_n.setEtape(etape1);
            approuvation_dossier_n.setApprouvation("notraite");
            approuvation_dossier_n.setDate(LocalDate.now());
        }
        if(traitement.equals("a")) {
            Long e_s=approuvation_dossier_request.getEtape()+1L;

            Etape etapes=etapeRepository.getById(e_s);
            approuvation_dossier_n.setEtape(etapes);
            approuvation_dossier_n.setApprouvation("notraite");
            approuvation_dossier_n.setDate(LocalDate.now());
        }
        approuvationDoosierRepository.save(approuvation_dossier_n);

    }
}
