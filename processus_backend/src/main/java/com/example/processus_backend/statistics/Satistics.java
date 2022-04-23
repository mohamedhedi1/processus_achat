package com.example.processus_backend.statistics;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Satistics {
    private List<Integer> demandeachatrejete ;
    private  List<Integer> demandeachataccepte;
    private List<Integer> pieSeries ;
    private List<String> pieNames ;
    private  int fin ;
    private  int entrain ;

}
