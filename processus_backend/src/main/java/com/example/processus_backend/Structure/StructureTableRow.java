package com.example.processus_backend.Structure;

import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StructureTableRow {
        private Long id;
        private String name  ;
        private String role ;
        private  String abrivation ;
        private List<String> emails;
        public void addEmails(String email){
            emails.add(email);
        }


}
