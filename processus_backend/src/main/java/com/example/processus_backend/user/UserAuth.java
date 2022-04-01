package com.example.processus_backend.user;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserAuth {
    private String email;
    private List<String> privelages ;
}
