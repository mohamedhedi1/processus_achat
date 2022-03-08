package com.example.processus_backend.entity.user;

import com.example.processus_backend.security.config.AppRole;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;
import java.util.Collections;

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
    private String emailId;
    private String firstName;
    private String lastName;
    private String post;
    private String cin;
    private String password;
    @Enumerated(EnumType.STRING)
    private AppRole appRole;
    private Boolean locked = false;
    private Boolean enabled = false;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority authority =
                new SimpleGrantedAuthority(appRole.name());
        return Collections.singletonList(authority);
    }

    @Override
    public String getUsername() {
        return emailId;
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
