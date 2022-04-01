package com.example.processus_backend.user;

import com.example.processus_backend.Structure.Structure;

import com.example.processus_backend.security.config.AppPermission.AppPermission;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.sql.Struct;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name="users")
public class User implements UserDetails{
    @Id
    @SequenceGenerator(
            name="users_sequence",
            sequenceName ="users_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "students_sequences"
    )
    private Long userId;
    private String email;
    private String firstName;
    private String lastName;
    private String post;
    private String cin;
    private String password;
    // @Enumerated(EnumType.STRING)
    @ManyToMany(
            fetch = FetchType.EAGER
    )
    @JoinTable(
            name="app_permission_user_map",
            joinColumns = @JoinColumn(
                    name = "userId",
                    referencedColumnName = "userId"
            ),
            inverseJoinColumns = @JoinColumn(
                    name = "appPermissionId",
                    referencedColumnName = "appPermissionId"
            )

    )
    private List<AppPermission> appPermission;
    private Boolean locked = false;
    private Boolean enabled = false;
    @ManyToOne(

            fetch = FetchType.EAGER
    )
    @JoinColumn(
            name="structureId",
            referencedColumnName = "structureId"
    )
    private Structure structure;
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<SimpleGrantedAuthority> authority = appPermission.stream().map( p->{
           return      new SimpleGrantedAuthority(p.getPermission());
        }).collect(Collectors.toList());

        return authority;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !locked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

}
