package com.example.processus_backend.Structure;

import com.example.processus_backend.user.User;
import com.example.processus_backend.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
@Service
public class StructureService {
    @Autowired
    StructureRepository structureRepository ;
    @Autowired
    UserRepository userRepository;

    public  void addStructure(Structure structure,List<String> emails){
        if(!emails.isEmpty()){
        List<User> users =  emails.stream().map(email ->{
            boolean user_exists = userRepository.existsByEmail(email);
            if(!user_exists) {throw new IllegalStateException("user does not exists") ;}
            User user = userRepository.getByEmail(email);
            return user ;
        }).collect(Collectors.toList()) ;
        structure.setUserList(users);}
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
    public  void updateStructure(StructureRequest structureRequest,Long id){
        Structure structure=structureRepository.findBySturctureId(id);
        List<String> emails=structureRequest.getEmails();
        if(!emails.isEmpty()){
            List<User> users =  emails.stream().map(email ->{
                boolean user_exists = userRepository.existsByEmail(email);
                if(!user_exists) {throw new IllegalStateException("user does not exists") ;}
                User user = userRepository.getByEmail(email);
                return user ;
            }).collect(Collectors.toList()) ;
            structure.setUserList(users);}
        structure.setStructureId(id);
        structure.setName(structureRequest.getName());
        structure.setRole(structureRequest.getRole());
        structure.setAbrivation(structureRequest.getAbrivation());
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
        structureRepository.deleteById(id);


    }

    public List<StructureNameAndID> getStructureNameAndId(){
        return  structureRepository.getStructureNameAndID();
    }



}
