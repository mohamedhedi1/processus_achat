package com.example.processus_backend.user;

import com.example.processus_backend.security.PasswordEncoder;
import com.example.processus_backend.security.config.AppRole.AppRoleRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import com.example.processus_backend.security.config.AppRole.AppRole;

import java.util.List;
import java.util.stream.Collectors;

@SpringBootTest
class UserRepositoryTest {
    UserService userService ;
    private final  AppRoleRepository appRoleRepository;
    private  final  PasswordEncoder passwordEncoder;
    @Autowired

    public UserRepositoryTest(UserService userService, AppRoleRepository appRoleRepository, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.appRoleRepository = appRoleRepository;
        this.passwordEncoder = passwordEncoder;
    }
    @Test
    public void insertAdmin(){
        AppRole admin = AppRole.builder().name("ADMIN").build();
        appRoleRepository.save(admin);

        User user= User.builder()
                .cin("012453")
                .email("admin@admin.com")
                .post("admin")
                .appRole(admin)
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