package com.example.processus_backend.entity.user;

import com.example.processus_backend.security.PasswordEncoder;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import com.example.processus_backend.security.config.AppRole;

import java.util.List;
import java.util.stream.Collectors;

@SpringBootTest
class UserRepositoryTest {
    UserService userService ;
    private  final  PasswordEncoder passwordEncoder;
    @Autowired

    public UserRepositoryTest(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }
    @Test
    public void insertAdmin(){
        User user= User.builder()
                .cin("012453")
                .emailId("admin@admin.com")
                .post("admin")
                .appRole(AppRole.ADMIN)
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

              return  user.getEmailId();
          })).collect(Collectors.toList());
        System.out.print(p);
    }
}