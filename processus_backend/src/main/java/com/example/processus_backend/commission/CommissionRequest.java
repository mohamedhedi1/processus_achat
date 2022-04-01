package com.example.processus_backend.commission;

import lombok.*;

import java.time.LocalDate;
import java.util.List;
@Builder
@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class CommissionRequest {
    private String name  ;
    private String role ;
    private LocalDate dateOfCreation;
    private  String abrivation ;
    private List<Long> privelages;
    private String type;
    private List<String> emails;
}
