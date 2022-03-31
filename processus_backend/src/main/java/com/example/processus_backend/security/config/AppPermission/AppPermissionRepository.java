package com.example.processus_backend.security.config.AppPermission;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AppPermissionRepository extends JpaRepository<AppPermission,Long> {
    @Override
    List<AppPermission> findAllById(Iterable<Long> longs);
    @Query(value = "select app_permission_id from  app_permission_structure_map where\n" +
            "    structure_id = ?1",
            nativeQuery = true )
    public List<Long> findIdPermissionBYIdStructure(Long id);
    @Query(value = "select app_permission_id from  app_permission_commission_map where" +
            "    commission_id = ?1",
            nativeQuery = true )
    public List<Long> findIdPermissionBYIdcomission(Long id);
    @Query(value = "select app_permission_id from  app_permission_user_map where" +
            "    user_id = ?1",
            nativeQuery = true )
    public List<Long> findIdPermissionBYIdUser(Long id);
}
