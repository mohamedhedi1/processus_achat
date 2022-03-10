package com.example.processus_backend.entity.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {
    private  final UserRepository userRepository;
    private final static String USER_NOT_FOUND_MSG =
            "user with email %s not found";


    @Autowired
    public UserService(UserRepository userRepository)
    {
        this.userRepository = userRepository;
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

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Transactional
    public void updateUser(Long id, String emailId, String firstName, String lastName, String post, String cin) {
        User user = userRepository.findById(id)
                .orElseThrow(()-> new IllegalStateException(
                        "User with id"+ id + "does not exists"
                ));
        if(firstName!=null && firstName.length()>0 && !Objects.equals(user.getFirstName(),firstName))
        {
            user.setEmailId(emailId);
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

        if(emailId!=null && emailId.length()>0 && !Objects.equals(user.getEmailId(),emailId))
        {
            Optional<User> studentOptional = userRepository
                    .findUserByEmail(emailId);
            if(studentOptional.isPresent())
            {
                throw new IllegalStateException("email taken");
            }
            user.setEmailId(emailId);
        }
        userRepository.save(user);
    }

    public void addUsers(User user) {
        userRepository.save(user);
    }

    @Override
    public User loadUserByUsername(String emailId) throws UsernameNotFoundException {
        User u= userRepository.findUserByEmail(emailId).orElseThrow(() ->
                        new UsernameNotFoundException(
                                String.format(USER_NOT_FOUND_MSG, emailId)));
        System.out.print("test"+u.toString());
        return  u ;
    }


    /* void addUser0() {
        User u0= new User("hedi.....");
        userRepository.save()
    }*/
}
