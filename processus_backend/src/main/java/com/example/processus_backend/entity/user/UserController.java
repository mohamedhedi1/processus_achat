package com.example.processus_backend.entity.user;

import com.example.processus_backend.security.PasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins= "http://localhost:3000")
@RestController
@RequestMapping(path = "api/v1/user")
public class UserController {
    private final UserService userService;
    private  final PasswordEncoder passwordEncoder;
    @Autowired
    public UserController(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }
    @GetMapping
    public List<User> getUsers()
    {
        return userService.getUsers();
    }
    /*
    @PostMapping(path = "/default")
    public void addUser0()
    {
        userService.addUser0();
    }*/
    @PostMapping(path = "/addUser")
    public void addUser(@RequestBody UserRequest userRequest)
    {
        //check email
        User user= User.builder()
                .cin(userRequest.getCin())
                .emailId(userRequest.getEmailId())
                .post(userRequest.getPost())
                .appRole(userRequest.getAppRole())
                .firstName(userRequest.getFirstName())
                .lastName(userRequest.getLastName())
                .enabled(true)
                .locked(false)
                .password(passwordEncoder.bCryptPasswordEncoder().encode(userRequest.getPassword()))
                .build();
        userService.addUsers(user);
        //send mail
    }

    @DeleteMapping(path="{id}")
    public void deleteUser(@PathVariable("id") Long id)
    {
        userService.deleteUser(id);


    }

    @GetMapping(path="{id}")
    public User getUserById(@PathVariable("id") Long id )
    {
         return userService.getUserById(id);
    }
    @PutMapping(path="{id}")
    public void updateStudent(
            @PathVariable("id") Long id,
            @RequestParam(required = false) String emailId,
            @RequestParam(required = false) String firstName,
            @RequestParam(required = false) String lastName,
            @RequestParam(required = false) String post,
            @RequestParam(required = false) String cin

    )
    {
        userService.updateUser(id,emailId,firstName,lastName,post,cin);
    }


}
