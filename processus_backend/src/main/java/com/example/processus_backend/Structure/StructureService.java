package com.example.processus_backend.Structure;


import com.example.processus_backend.security.config.AppPermission.AppPermissionService;
import com.example.processus_backend.user.User;
import com.example.processus_backend.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
@Service
public class StructureService {
    @Autowired
    private  final StructureRepository structureRepository ;
    @Autowired
    private  final UserRepository userRepository;
    private  final AppPermissionService appPermissionService;

    public StructureService(StructureRepository structureRepository, UserRepository userRepository,AppPermissionService appPermissionService) {
        this.structureRepository = structureRepository;
        this.userRepository = userRepository;
        this.appPermissionService = appPermissionService;

    }

    public  void addStructure(Structure structure,List<String> emails){
        if(!emails.isEmpty()){
        Set<User> users =  emails.stream().map(email ->{
            boolean user_exists = userRepository.existsByEmail(email);
            if(!user_exists) {throw new IllegalStateException("user does not exists") ;}
            User user = userRepository.getByEmail(email);
            return user ;
        }).collect(Collectors.toSet()) ;
        structure.setUserList(users);
        }
        structureRepository.save(structure);
    }

    public  void addUsersToStructure(List<String> emails ,String structurName) {
        List<User> users =  emails.stream().map(email ->{
            boolean user_exists = userRepository.existsByEmail(email);
            if(!user_exists) {throw new IllegalStateException("user does not exists") ;}
            User user = userRepository.getByEmail(email);
            return user ;
        }).collect(Collectors.toList()) ;
        Structure structure=structureRepository.findByname(structurName);
        structure.addUsersToStructure(users);
        structureRepository.save(structure);

    }
    public  void addUserToStructure(String email){
        boolean user_exists = userRepository.existsByEmail(email);
        if(!user_exists) {throw new IllegalStateException("user does not exists") ;}
        User user = userRepository.getByEmail(email);
        Structure structure=structureRepository.findByname("structure commerce");
        structure.addUserToStructure(user);
        structureRepository.save(structure);

    }

    public  void getUserFromStructure(){
        List<User> users=structureRepository.gettuser("structure commerce");

    }
    public List<Structure> getAllStructures(){
        return structureRepository.findAll();
    }
    public  void updateStructure(StructureTableRow s){
        Structure structure=structureRepository.findBySturctureId(s.getId());
        List<String> emails=s.getEmails();
        if(!emails.isEmpty()){
            Set<User> users =  emails.stream().map(email ->{
                boolean user_exists = userRepository.existsByEmail(email);
                if(!user_exists) {throw new IllegalStateException("user does not exists") ;}
                User user = userRepository.getByEmail(email);
                return user ;
            }).collect(Collectors.toSet()) ;
            structure.setUserList(users);}

        structure.setStructureId(s.getId());
        structure.setName(s.getName());
        structure.setAbrivation(s.getAbrivation());
    structureRepository.save(structure);
    }
    public  void deleteUsersFromStructure(String name,List<String> emails){
        Structure structure=structureRepository.findByname(name);
        if(!emails.isEmpty()){
            List<User> users =  emails.stream().map(email ->{
                boolean user_exists = userRepository.existsByEmail(email);
                if(!user_exists) {throw new IllegalStateException("user does not exists") ;}
                User user = userRepository.getByEmail(email);
                return user ;
            }).collect(Collectors.toList()) ;
            structure.deleteUsers(users);}
        structureRepository.save(structure);
    }
    public void deleteStructure(Long id){
        boolean exists=structureRepository.existsById(id);
        if(!exists){};
        Structure s =structureRepository.findBySturctureId(id);
        s.setUserList(null);
        structureRepository.save(s);
        structureRepository.deleteById(id);


    }

    public List<StructureNameAndID> getStructureNameAndId(){
        return  structureRepository.getStructureNameAndID();
    }



}
