package com.example.processus_backend.dossierAchat.file;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface FileRepository extends JpaRepository<File,Long> {
    @Query("select s from File s where s.fileDownloadUri=?1")
     File getFileByPath(String pathfichier);



}
