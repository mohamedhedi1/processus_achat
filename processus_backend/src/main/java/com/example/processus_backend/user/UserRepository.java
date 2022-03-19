package com.example.processus_backend.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    @Query("SELECT s.email FROM User s ")
    List<String> getALLmail();
    @Query("SELECT s FROM User s WHERE s.email= ?1")
    Optional<User> findUserByEmail(String email);
    User findUserByuserId(long id);
    public List<User> findByemail(String email);
    @Query("select s from User s where s.email=?1")
    User getByEmail(String EmailId);
    public Boolean existsByEmail(String email);
    @Query(value = "select * from users where \n" +
            "user_id in (select  user_id from commission_user_map a where \n" +
            "a.commission_id in (\n" +
            "select\n" +
            "    c.commission_id\n" +
            "from\n" +
            "    commission c where c.name=?1)) " ,
            nativeQuery = true
    )
    public List<User> getAllUserFromCommission(String name);
    @Query(value = "select name from commission where \n" +
            "commission_id in (select  commission_id from commission_user_map a where \n" +
            "a.user_id in (\n" +
            "select\n" +
            "    u.user_id\n" +
            "from\n" +
            "    \"public\".users u where u.email=?1)) ;",
            nativeQuery = true
    )
    public List<String> getAllCommissionNameByUser(String email);



}
