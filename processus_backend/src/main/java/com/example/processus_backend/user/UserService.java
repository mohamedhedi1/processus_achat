package com.example.processus_backend.user;

import com.example.processus_backend.Structure.Structure;
import com.example.processus_backend.Structure.StructureRepository;
import com.example.processus_backend.security.config.AppRole.AppRole;
import com.example.processus_backend.security.config.AppRole.AppRoleService;
import com.example.processus_backend.user.AccountActivation.ConfirmationToken;
import com.example.processus_backend.user.AccountActivation.ConfirmationTokenService;
import com.example.processus_backend.user.emailSender.EmailSenderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class UserService implements UserDetailsService {
    private  final UserRepository userRepository;
    private  final StructureRepository structureRepository;
    private final ConfirmationTokenService confirmationTokenService;
    private  final AppRoleService appRoleService;
    private final static String USER_NOT_FOUND_MSG =
            "user with email %s not found";


    @Autowired
    public UserService(UserRepository userRepository, StructureRepository structureRepository, ConfirmationTokenService confirmationTokenService, EmailSenderService emailSenderService, AppRoleService appRoleService)
    {
        this.userRepository = userRepository;
        this.structureRepository = structureRepository;
        this.confirmationTokenService = confirmationTokenService;

        this.appRoleService = appRoleService;
    }


    public User getUserById(long id){
        return userRepository.findUserByuserId(id);
    }
    public List<User> getUsers() {
        List<User> users= userRepository.findAll();
        System.out.print("exit function");
        if(users.isEmpty()){throw new IllegalStateException("Commission does not exists") ;}
        return  users ;

    }


    @Transactional
    public void updateUser(Long id, String email, String firstName, String lastName, String post, String cin) {
        User user = userRepository.findById(id)
                .orElseThrow(()-> new IllegalStateException(
                        "User with id"+ id + "does not exists"
                ));
        if(firstName!=null && firstName.length()>0 && !Objects.equals(user.getFirstName(),firstName))
        {
            user.setEmail(email);
        }
        if(lastName!=null && lastName.length()>0 && !Objects.equals(user.getLastName(),lastName))
        {
            user.setLastName(lastName);
        }
        if(post!=null && post.length()>0 && !Objects.equals(user.getPost(),post))
        {
            user.setPost(post);
        }
        if(cin!=null && cin.length()>0 && !Objects.equals(user.getCin(),cin))
        {
            user.setCin(cin);
        }

        if(email!=null && email.length()>0 && !Objects.equals(user.getEmail(),email))
        {
            Optional<User> studentOptional = userRepository
                    .findUserByEmail(email);
            if(studentOptional.isPresent())
            {
                throw new IllegalStateException("email taken");
            }
            user.setEmail(email);
        }
        userRepository.save(user);
    }

    public void addUsers(User user) {
        userRepository.save(user);

    }

    @Override
    public User loadUserByUsername(String email) throws UsernameNotFoundException {
        User u= userRepository.findUserByEmail(email).orElseThrow(() ->
                        new UsernameNotFoundException(
                                String.format(USER_NOT_FOUND_MSG, email)));
        System.out.print("test"+u.toString());
        return  u ;
    }

    public void getAllUserByCommission(String commissionName){
        List<User> userList= userRepository.getAllUserFromCommission(commissionName);
    }
    public void getAllUserByStructure(String structureName){
        List<User> userList= structureRepository.gettuser(structureName);

    }
    public List<String> getAllMails(){
       return userRepository.getALLmail() ;
    }
    public void getCommissionNameByUser(String email){
        List<String> names=userRepository.getAllCommissionNameByUser(email);
    }
    public void getAllUser(){
        List<User> userList= userRepository.findAll();
    }

    public void getUser(){
        User user= userRepository.getByEmail("jihedgaraouch@gmail.com");
    }
    public void deleteUser(Long id){
        confirmationTokenService.deleteByIdUser(id);
        userRepository.deleteById(id);
    }
    public String signUpUser(User user) {
        User userExists = userRepository
                .getByEmail(user.getEmail()) ;


        if (userExists !=null) {
            // TODO check of attributes are the same and
            // TODO if email not confirmed send confirmation email.

            throw new IllegalStateException("email already taken");
        }



       userRepository.save(user);

        String token = UUID.randomUUID().toString();

        ConfirmationToken confirmationToken = new ConfirmationToken(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(15),
                user
        );

        confirmationTokenService.saveConfirmationToken(
                confirmationToken);

        return confirmationToken.getToken() ;

//

    }
    public String confirm(String token){

        ConfirmationToken confirmationToken;
        confirmationToken = confirmationTokenService
                .getToken(token);

        if (confirmationToken == null) {
            throw new IllegalStateException("token invalid");
        }
        if (confirmationToken.getConfirmedAt() != null) {
            throw new IllegalStateException("email already confirmed");
        }

        LocalDateTime expiredAt = confirmationToken.getExpiresAt();

        if (expiredAt.isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("token expired");
        }

        confirmationTokenService.setConfirmedAt(token);
        User user = confirmationToken.getUser();
        user.setEnabled(true);
        userRepository.save(user);
        return "confirmed";
    }

    public Long getAppRoleIDByEmail(String email) {

       Long id= userRepository.getByEmail(email).getAppRole().getAppRoleId();
       return id;
    }


    public void getUsersRows() {
        List<Structure> structures = structureRepository.findAll();
    }
    public Boolean setLockedUser(Long id, Boolean state){
        User user = userRepository.findUserByuserId(id);
        user.setLocked(state);
        return user.getLocked();
    }

    public boolean update(UserTableRow userTableRow) {

        User user = userRepository.findById(userTableRow.getId()).orElseThrow(()-> new IllegalStateException(
                "User does not exists"
        ));
        user.setEmail(userTableRow.getEmail());
        user.setCin(userTableRow.getCin());
        user.setPost(userTableRow.getPost());
        user.setFirstName(userTableRow.getFirstName());
        user.setLastName(userTableRow.getLastName());
        AppRole appRole=appRoleService.getByName(userTableRow.getAppRoleName());
        Structure s =structureRepository.findByname(userTableRow.getStructureName());
        user.setStructure(s);
        user.setAppRole(appRole);
        userRepository.save(user);
        return true;
    }
}
