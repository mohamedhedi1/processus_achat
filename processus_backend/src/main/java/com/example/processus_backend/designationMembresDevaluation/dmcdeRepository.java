package com.example.processus_backend.designationMembresDevaluation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface dmcdeRepository extends JpaRepository<dMCDe,Long> {
    @Query(value = "select s from dMCDe s where s.idDossierAchat=?1")
    dMCDe getByIDdoosierachat(Long id);
}
