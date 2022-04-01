package com.example.processus_backend.user;

import com.example.processus_backend.Structure.Structure;
import com.example.processus_backend.Structure.StructureRepository;
import com.example.processus_backend.security.PasswordEncoder;
import com.example.processus_backend.security.config.AppPermission.AppPermission;
import com.example.processus_backend.security.config.AppPermission.AppPermissionService;

import com.example.processus_backend.user.emailSender.EmailSenderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins= "http://localhost:3000")
@RestController
@RequestMapping(path = "api/v1/user")
public class UserController {
    private final UserService userService;
    private  final PasswordEncoder passwordEncoder;
   private  final AppPermissionService appPermissionService;
    private  final StructureRepository structureRepository;
    private final EmailSenderService emailSenderService;
    @Autowired
    public UserController(UserService userService, PasswordEncoder passwordEncoder, AppPermissionService appPermissionService, StructureRepository structureRepository, EmailSenderService emailSenderService) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.appPermissionService = appPermissionService;

        this.structureRepository = structureRepository;
        this.emailSenderService = emailSenderService;
    }
    @GetMapping
    public List<UserTableRow> getUsers()
    {

        List<User> users =userService.getUsers();
       List<UserTableRow> userTableRows= users.stream().map(user -> {
            return UserTableRow.builder().id(user.getUserId())
                    .firstName(user.getFirstName())
                    .lastName(user.getLastName())
                    .email(user.getEmail())
                    .cin(user.getCin())
                    .locked(user.getLocked())
                    .post(user.getPost())
                    .structureName(user.getStructure().getName())
                    .build();
        }).collect(Collectors.toList());
       return userTableRows ;
    }
    @GetMapping(path = "getRole")
    public void getRoles(@RequestParam String email){
       // userService.getUserByEmail(email);

    }

   /*@GetMapping(path = "userRows")
   public List<UserTableRow> getUserTableRow(){
       userService.getUsersRows();
    }*/
    @PostMapping(path = "/addUser")
    public void addUser(@RequestBody UserRequest userRequest)
    {
        //check email
        List<AppPermission> appPermissions=appPermissionService.getAllById(userRequest.getPrivelages());
        Structure s = structureRepository.findBySturctureId(userRequest.getStructureID());
        User user= User.builder()
                .cin(userRequest.getCin())
                .email(userRequest.getEmail())
                .post(userRequest.getPost())
                .appPermission(appPermissions)
                .firstName(userRequest.getFirstName())
                .lastName(userRequest.getLastName())
                .enabled(false)
                .locked(false)
                .password(passwordEncoder.bCryptPasswordEncoder().encode("admin"))
                .structure(s)
                .build();
        String token = userService.signUpUser(user);
        String link = "http://localhost:8080/api/v1/user/confirm?token=" + token;

        System.out.print("sendin mail");
        emailSenderService.sendSimpleEmail(user.getEmail(),link,"please confirm your app");

        //send mail
    }
    @GetMapping(path = "confirm")
    public String confirm(@RequestParam("token") String token) {
        return userService.confirm(token);
    }
    @DeleteMapping(path="{id}")
    public void deleteUser(@PathVariable("id") Long id)
    {
        userService.deleteUser(id);


    }
    @GetMapping(path = "AllMails")
    public  List<String> getMails(){
        return  userService.getAllMails();
    }

    @GetMapping(path="{id}")
    public User getUserById(@PathVariable("id") Long id )
    {
         return userService.getUserById(id);
    }
    @PutMapping(path="{id}")
    public void updateStudent(
            @PathVariable("id") Long id,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String firstName,
            @RequestParam(required = false) String lastName,
            @RequestParam(required = false) String post,
            @RequestParam(required = false) String cin

    )
    {
        userService.updateUser(id,email,firstName,lastName,post,cin);
    }
    @PutMapping("/update")
    public  boolean  update(@RequestBody UserTableRow userTableRow){
        return userService.update(userTableRow);
    }
    @GetMapping(path = "setLockUser/{id}")
    public Boolean setLockUser(@PathVariable("id") Long id ,@RequestParam boolean lock ){
        return  userService.setLockedUser(id,lock);
    }
    @GetMapping(path = "getLoggedInUser")
    public UserAuth get__(Authentication authentication){
            List<String> privelages = authentication.getAuthorities().stream().map(a ->{
            return  a.getAuthority();
        }).collect(Collectors.toList());
       UserAuth user=UserAuth.builder()
                .email(authentication.getName())
                .privelages(privelages)
                .build();
       return  user ;
    }

}
