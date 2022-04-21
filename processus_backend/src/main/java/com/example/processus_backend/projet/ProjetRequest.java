package com.example.processus_backend.projet;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
@Entity
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjetRequest {
       private String name;
      private   String nomStructure;
      private    String Type ;
      private   String delai_de_realisation ;

}
