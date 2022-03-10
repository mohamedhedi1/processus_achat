package com.example.processus_backend.entity.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    @Query("SELECT s FROM User s WHERE s.emailId= ?1")
    Optional<User> findUserByEmail(String email);
    User findUserByuserId(long id);


}
