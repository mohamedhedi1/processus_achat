package com.example.processus_backend.entity.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserService {
    private  final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }





    public List<User> getUsers() {
        return userRepository.findAll();
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
    }

    public void addUsers(User user) {
        userRepository.save(user);
    }

    public void addUser0() {
        User u0= new User("hedi.....")
        userRepository.save()
    }
}
