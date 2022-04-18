package com.example.processus_backend.user.delteledUser;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Duser {
    @Id
    @SequenceGenerator(
            name="u_sequence",
            sequenceName ="u_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "s_sequences"
    )
    private Long id;
    private String email;
}
