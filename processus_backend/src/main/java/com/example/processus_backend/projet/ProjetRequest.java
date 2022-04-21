package com.example.processus_backend.projet;

import lombok.*;

import javax.persistence.*;
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjetRequest {
       private String name;
      private   String nomStructure;
      private    String Type ;
      private   String delai_de_realisation ;

}
