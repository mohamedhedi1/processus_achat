package com.example.processus_backend.dossierAchat.approuvation.dossier;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ApprouvationDoosierRepository extends JpaRepository<Approuvation_dossier,Long> {
  @Query(value = "select  * from approuvation_dossier where etape_etape_id =?1  "
  ,nativeQuery = true
  )
  List<Approuvation_dossier> getApprouvationDossierbyETAPE(Long idETAPE);
  @Query(value = "select  * from approuvation_dossier where demande_achat_demande_achat_id =?1  AND etape_etape_id =?2 "
          ,nativeQuery = true
  )
  List<Approuvation_dossier> getApprouvationDossierbyIdDossier(Long idDossier,Long idEtape);
  @Query(value = "select  * from approuvation_dossier where demande_achat_demande_achat_id =?1   "
          ,nativeQuery = true
  )
  List<Approuvation_dossier> getApprouvationDossierbyIdDossier(Long idDossier);

}
