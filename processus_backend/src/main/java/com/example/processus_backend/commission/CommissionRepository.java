package com.example.processus_backend.commission;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommissionRepository extends JpaRepository<Commission,Long> {
    @Query("select u from Commission u where u.name=?1")
    public Commission findByName(String name);
    public Boolean existsByName(String name);
    public Boolean existsByname(String name);
    @Query(value = "select  commission_id from commission_user_map where user_id =?1 "
    ,nativeQuery = true
    )
    public List<Long> getALLCommissionByemail(Long id);


}
