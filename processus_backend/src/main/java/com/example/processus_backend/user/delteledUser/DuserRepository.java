package com.example.processus_backend.user.delteledUser;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DuserRepository extends JpaRepository<Duser,Long> {
}
