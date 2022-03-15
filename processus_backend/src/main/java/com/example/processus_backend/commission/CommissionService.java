package com.example.processus_backend.commission;

import com.example.processus_backend.user.User;
import com.example.processus_backend.user.UserRepository ;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
@Service
public class CommissionService {
    @Autowired
    private  final  CommissionRepository commissionRepository;
    @Autowired
    private  final UserRepository userRepository ;

    public CommissionService(CommissionRepository commissionRepository, UserRepository userRepository) {
        this.commissionRepository = commissionRepository;
        this.userRepository = userRepository;
    }

    public void addCommission( Commission commission ,List<String> emails){
        List<User> users =  emails.stream().map(email ->{
            boolean user_exists = userRepository.existsByEmail(email);
            if(!user_exists) {throw new IllegalStateException("user does not exists") ;}
            User user = userRepository.getByEmail(email);
            return user ;
        }).collect(Collectors.toList());
        if(users.isEmpty()){};
        boolean commission_exists= commissionRepository.existsByName(commission.getName());
        if(commission_exists) {throw new IllegalStateException("Commission does  exists") ;}
        commission.addUsers(users);
        commissionRepository.save(commission);
    }
    public void addUserToCommission(String commissionName,String email){
        boolean user_exists = userRepository.existsByEmail(email);
        if(!user_exists) {throw new IllegalStateException("user does not exists") ;}
        boolean commission_exists= commissionRepository.existsByName(commissionName);
        if(!commission_exists) {throw new IllegalStateException("Commission does not exists") ;}
        Commission commission=commissionRepository.findByName(commissionName);
        User user = userRepository.getByEmail(email);
        commission.addUser(user);
        commissionRepository.save(commission);

    }
    public  void addUsersToCommission(String commissionName,List<String>emails){
        List<User> users =  emails.stream().map(email ->{
            boolean user_exists = userRepository.existsByEmail(email);
            if(!user_exists) {throw new IllegalStateException("user does not exists") ;}
            User user = userRepository.getByEmail(email);
            return user ;
        }).collect(Collectors.toList());
        if(users.isEmpty()){};
        boolean commission_exists= commissionRepository.existsByName(commissionName);
        if(!commission_exists) {throw new IllegalStateException("Commission does  not exists") ;}
        Commission commission=commissionRepository.findByName(commissionName);
        commission.addUsers(users);
        commissionRepository.save(commission);
    }
    public void DeleteUserFromCommission(String email,String commissionName){
        boolean user_exists = userRepository.existsByEmail(email);
        if(!user_exists) {throw new IllegalStateException("user does not exists") ;}
        boolean commission_exists= commissionRepository.existsByName(commissionName);
        if(!commission_exists) {throw new IllegalStateException("Commission does not exists") ;}
        User user = userRepository.getByEmail(email);
        Commission commission=commissionRepository.findByName(commissionName);
        commission.deleteUser(user);

        commissionRepository.save(commission);

    }
    public void DeleteUsersFromCommission(List<String> emails,String commissionName){
        boolean commission_exists= commissionRepository.existsByName(commissionName);
        if(!commission_exists) {throw new IllegalStateException("Commission does not exists") ;}
        List<User> users =  emails.stream().map(email ->{
            boolean user_exists = userRepository.existsByEmail(email);
            if(!user_exists) {throw new IllegalStateException("user does not exists") ;}
            User user = userRepository.getByEmail(email);
            return user ;
        }).collect(Collectors.toList()) ;
        Commission commission=commissionRepository.findByName(commissionName);
        commission.deleteUsers(users);
        commissionRepository.save(commission);
    }
    public void updateCommission(Commission commission, List<String> emails, Long id){
        boolean commission_exists= commissionRepository.existsById(id);
        if(!commission_exists) {throw new IllegalStateException("Commission does  exists") ;}
        if (!emails.isEmpty()){
        List<User> users =  emails.stream().map(email ->{
            boolean user_exists = userRepository.existsByEmail(email);
            if(!user_exists) {throw new IllegalStateException("user does not exists") ;}
            User user = userRepository.getByEmail(email);
            return user ;
        }).collect(Collectors.toList()) ;
        commission.addUsers(users);
        }
        commission.setCommissionId(id);
        commissionRepository.save(commission);
    }
    public void deleteCommission(Commission commission){
        boolean commission_exists= commissionRepository.existsByName(commission.getName());
        if(!commission_exists) {throw new IllegalStateException("Commission does not exists") ;}
        commissionRepository.delete(commission);
    }

    public List<Commission> getAllCommission() {
        return commissionRepository.findAll() ;
    }

    public Commission getCommission(String name) {
        boolean commission_exists= commissionRepository.existsByName(name);
        if(!commission_exists) {throw new IllegalStateException("Commission does not exists") ;}
        return  commissionRepository.findByName(name);
    }

}
