package com.example.processus_backend.user;

import com.example.processus_backend.Structure.Structure;
import com.example.processus_backend.Structure.StructureRepository;
import com.example.processus_backend.commission.CommissionService;
import com.example.processus_backend.security.PasswordEncoder;

import com.example.processus_backend.security.config.AppPermission.AppPermission;
import com.example.processus_backend.security.config.AppPermission.AppPermissionRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


import javax.persistence.criteria.CriteriaBuilder;
import java.util.List;
import java.util.stream.Collectors;

@SpringBootTest
class UserRepositoryTest {
    UserService userService ;

    private  final  PasswordEncoder passwordEncoder;
    private final CommissionService commissionService;
    private final StructureRepository structureRepository;
    private  final UserRepository userRepository;
    private  final AppPermissionRepository appPermissionRepository;
    @Autowired

    public UserRepositoryTest(UserService userService, PasswordEncoder passwordEncoder, CommissionService commissionService, StructureRepository structureRepository, UserRepository userRepository, AppPermissionRepository appPermissionRepository) {
        this.userService = userService;

        this.passwordEncoder = passwordEncoder;
        this.commissionService = commissionService;
        this.structureRepository = structureRepository;
        this.userRepository = userRepository;
        this.appPermissionRepository = appPermissionRepository;
    }

    @Test
    public  void DataBase_Privelage(){
        List<String> Labels=List.of("traitement la demane d'achat","Approuvation de CPT","Préparation de projet de CCAP","Finalisation le CC et Preparation la methodologie de depouillement"
                ,"Approuvation le CC","Affectaion de dossier d'achat a une structure d 'achat","Plantification les date de lancement de l'AO et de La séance d'ouvertur de plis","designation les membres de ma commission d'evaluation","demandeur","administrateur");
        for(int i=1; i<Labels.size()+1;i++){
            AppPermission appPermission= AppPermission.builder()
                    .appPermissionId(Integer.toUnsignedLong(i))
                    .permission(Labels.get(i-1))
                    .build();
            appPermissionRepository.save(appPermission);

        }
    }
    @Test
    public void DatabASE_structure(){
        List<String> structure=List.of("Structure de plantification et de coordination","Structure d'approbation des CPT","Structure de préparation des CC",
        "Structure de modélisation et d'approbation des CC" ,"Structure d'achat");
        List<String> structure_abrivation=List.of("SPC","SACPT","SPCC","SMACC","SA");

        for(int i=0; i<structure.size();i++){
            AppPermission appPermission=appPermissionRepository.getById(Integer.toUnsignedLong(i+1));
            Structure structure1= Structure.builder()
                    .abrivation(structure_abrivation.get(i))
                    .name(structure.get(i))
                    .structureId(Integer.toUnsignedLong(i))
                    .appPermission(List.of(appPermission))
                    .build();
            structureRepository.save(structure1);

        }

    }
    @Test
    public void DatabASE_user(){
        List<String> structure=List.of("Structure de plantification et de coordination","Structure d'approbation des CPT","Structure de préparation des CC",
                "Structure de modélisation et d'approbation des CC" ,"Structure d'achat");

        List<Structure> structures=structureRepository.findAll();
        for(int i=0; i<structures.size();i++){
            AppPermission appPermission=appPermissionRepository.getById(Integer.toUnsignedLong(i+1));
            Structure structure1=structures.get(i);
            User user= User.builder()
                    .structure(structure1)
                    .cin("012345")
                    .email("user_"+structure1.getAbrivation()+"@gmail.com")
                    .lastName("nom d'utlisateur")
                    .firstName("prenom d'utlisateur")
                    .password(passwordEncoder.bCryptPasswordEncoder().encode("user"))
                    .enabled(true)
                    .locked(false)
                    .appPermission(List.of(appPermission))
                    .build();
            userRepository.save(user);


        }

    }
    @Test
    public void DatabASE_structure_achat(){
        for(int i=0; i<5;i++){
            AppPermission appPermission=appPermissionRepository.getById(2L);
            Structure structure1=structureRepository.findByname("Structure d'achat");
            User user= User.builder()
                    .structure(structure1)
                    .cin("012345")
                    .email("user_"+i+structure1.getAbrivation()+"@gmail.com")
                    .lastName("nom d'utlisateur"+i)
                    .firstName("prenom d'utlisateur"+i)
                    .password(passwordEncoder.bCryptPasswordEncoder().encode("user"))
                    .enabled(true)
                    .locked(false)
                    .appPermission(List.of(appPermission))
                    .build();
            userRepository.save(user);


        }


    }
    @Test
    public void DatabASE_Commission(){
        List<String> structure=List.of("Structure d'approbation des CPT","Structure de préparation des CC",
                "Structure de modélisation et d'approbation des CC" ,"Structure d'achat");

        List<Structure> structures=structureRepository.findAll();
        for(int i=0; i<structures.size();i++){
            AppPermission appPermission=appPermissionRepository.getById(Integer.toUnsignedLong(i+1));
            Structure structure1=structures.get(i);
            User user= User.builder()
                    .structure(structure1)
                    .cin("012345")
                    .email("user_"+structure1.getAbrivation()+"@gmail.com")
                    .lastName("nom d'utlisateur")
                    .firstName("prenom d'utlisateur")
                    .password(passwordEncoder.bCryptPasswordEncoder().encode("user"))
                    .enabled(true)
                    .locked(false)
                    .appPermission(List.of(appPermission))
                    .build();
            userRepository.save(user);


        }

    }

    @Test
    public void insertAdmin(){
        List<Structure> strucutres= structureRepository.findAll();
        List<AppPermission> appPermission=appPermissionRepository.findAll();
        User user= User.builder()

                .appPermission( appPermission)
                .cin("012453")
                .structure(strucutres.get(0))
                .email("admin@admin.com")
                .firstName("admin")
                .lastName("admin")
                .password(passwordEncoder.bCryptPasswordEncoder().encode("admin"))
                .enabled(true)
                .locked(false)
                .build();
        userService.addUsers(user);
    }
    @Test
    public  void print(){
        List<User> u= userService.getUsers();
          List<String> p = u.stream().map((user -> {

              return  user.getEmail();
          })).collect(Collectors.toList());
        System.out.print(p);
    }
}