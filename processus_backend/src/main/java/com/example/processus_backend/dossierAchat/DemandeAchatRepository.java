package com.example.processus_backend.dossierAchat;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface DemandeAchatRepository extends JpaRepository<DemandeAchat,Long> {
    @Query("SELECT d.demandeAchatId FROM DemandeAchat d where d.projet =?1")
    Long  getIdbyProjetName(String projet );
}
