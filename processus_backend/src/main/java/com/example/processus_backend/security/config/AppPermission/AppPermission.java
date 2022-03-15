package com.example.processus_backend.security.config.AppPermission;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class AppPermission {
  //  USER_READ("user:read"),
    //USER_WRITE("user:write");
    @Id
    @SequenceGenerator(
            name="apppermission_sequence",
            sequenceName ="apppermission_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "apppermission_sequences"
    )
    private Long appPermissionId;
    private  String permission;

    public String getPermission()
    {
        return permission;
    }
}
