package com.example.processus_backend.Structure;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class StructureRequest {
    private String name;
    private String abrivation;
    private  String region;
    private List<Long> privelages;
    private List<String> emails;
}
