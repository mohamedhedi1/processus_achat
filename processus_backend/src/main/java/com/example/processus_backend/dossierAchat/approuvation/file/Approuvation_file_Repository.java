package com.example.processus_backend.dossierAchat.approuvation.file;

import com.example.processus_backend.dossierAchat.approuvation.dossier.ApprouvationDoosierRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Approuvation_file_Repository extends JpaRepository<Approuvation_file,Long> {
 @Query(value="select * from file  where demande_achat_id = ?1",nativeQuery = true)
 List<Long> getFileIdByDemandeAchat(long id );
 @Query(value = " select * from approuvation_file where file_file_id IN ?1 AND etape_etape_id=?2",nativeQuery = true)
 List<Approuvation_file> getApprouvationFileby( List<Long> FileIds , Long ETAPEiD);


}
