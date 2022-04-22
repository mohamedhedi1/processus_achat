package com.example.processus_backend.notification;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationRepository extends JpaRepository<Notificaiton,Long> {
  @Query("select t from Notificaiton t where t.userEmail=?1")
    Notificaiton findByuser(String email);
}
