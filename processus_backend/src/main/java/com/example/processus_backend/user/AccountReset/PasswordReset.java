package com.example.processus_backend.user.AccountReset;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
@AllArgsConstructor
@Builder
@Table(name="reset")
public class PasswordReset {
    @SequenceGenerator(
            name= "password_token_sequence",
            sequenceName = "password_token_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "password_token_sequence"
    )
    private Long paId;
    private String email ;
    private String Token ;
}
