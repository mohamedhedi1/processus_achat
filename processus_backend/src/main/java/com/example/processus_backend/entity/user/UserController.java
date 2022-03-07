package com.example.processus_backend.entity.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/user")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }
    @GetMapping
    public List<User> getUsers()
    {
        return userService.getUsers();
    }

    @PostMapping(path = "/default")
    public void addUser0()
    {
        userService.addUser0();
    }
    @PostMapping(path = "/addUser")
    public void addUser(@RequestBody User user)
    {
        userService.addUsers(user);



    }

    @DeleteMapping(path="{id}")
    public void deleteUser(@PathVariable("id") Long id)
    {
        userService.deleteUser(id);


    }

    @GetMapping(path="{id}")
    public User getUserById(@PathVariable("id") Long id )
    {

        List<User> s= userService.getUsers();
        return s.stream()
                .filter(user -> id.equals(user.getUserId()))
                .findFirst()
                .orElseThrow(
                        ()-> new IllegalStateException("User "+id+"does not exists"));


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
