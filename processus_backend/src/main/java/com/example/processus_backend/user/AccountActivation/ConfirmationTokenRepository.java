package com.example.processus_backend.user.AccountActivation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Repository
public interface ConfirmationTokenRepository
        extends JpaRepository<ConfirmationToken, Long> {
    ConfirmationToken findByToken(String token);
    @Transactional
    @Modifying
    @Query(value = "Delete from confirmation_token where app_user_id=?1",nativeQuery = true)
    void deletebyuserid(Long id);

    @Transactional
    @Modifying
    @Query("UPDATE ConfirmationToken c " +
            "SET c.confirmedAt = ?2 " +
            "WHERE c.token = ?1")
    int updateConfirmedAt(String token,
                          LocalDateTime confirmedAt);
}
