package com.example.processus_backend.security.config.AppRole;

import com.example.processus_backend.security.config.AppPermission.AppPermission;
import lombok.*;


import javax.persistence.*;
import java.util.List;
import java.util.Set;

import static com.google.common.collect.Sets.newHashSet;
@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AppRole {

    @Id
    @SequenceGenerator(
            name="app_permission_sequence",
            sequenceName ="app_permission_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "app_permission_sequences"
    )
    private  Long appRoleId;
    private String name;
    @ManyToMany(
            fetch = FetchType.EAGER    )
    @JoinTable(
            name="app_role_app_permission_map",
            joinColumns = @JoinColumn(
                    name = "appRoleId",
                    referencedColumnName = "appRoleId"
            ),
            inverseJoinColumns = @JoinColumn(
                    name = "appPermissionId",
                    referencedColumnName = "appPermissionId"
            )
    )
    private  List<AppPermission> permissions;

    public List<AppPermission> getPermissions()
    {
        return permissions;
    }
}
