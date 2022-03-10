package com.example.processus_backend.entity.user;

import com.example.processus_backend.entity.user.AccountActivation.ConfirmationToken;
import com.example.processus_backend.entity.user.AccountActivation.ConfirmationTokenService;
import com.example.processus_backend.entity.user.emailSender.EmailSenderService;
import com.example.processus_backend.security.PasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.websocket.server.PathParam;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@CrossOrigin(origins= "http://localhost:3000")
@RestController
@RequestMapping(path = "api/v1/user")
public class UserController {
    private final EmailSenderService emailSenderService;
    private final UserService userService;
    private  final PasswordEncoder passwordEncoder;
    private final ConfirmationTokenService confirmationTokenService;
    @Autowired
    public UserController(EmailSenderService emailSenderService, UserService userService, PasswordEncoder passwordEncoder, ConfirmationTokenService confirmationTokenService) {
        this.emailSenderService = emailSenderService;
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.confirmationTokenService = confirmationTokenService;
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
                .enabled(false)
                .locked(false)
                .password(passwordEncoder.bCryptPasswordEncoder().encode(userRequest.getPassword()))
                .build();
        userService.addUsers(user);
        String token = UUID.randomUUID().toString();
        ConfirmationToken confirmationToken = new ConfirmationToken(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(15),
                user
        );
        confirmationTokenService.saveConfirmationToken(confirmationToken);
        emailSenderService.sendSimpleEmail("mohamedhedi1hamdi@gmail.com",
                "click me /n " +
                        "http://www.localhost:8080.com/api/v1/user/confirmation?token="
                       +token,
                "this is the email subject");




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


    @GetMapping(path = "confirm")
    public void confirm(@RequestParam("token") String token) {
        Long id= confirmationTokenService.getToken(token);
      //  userService.setEnabled(id);
    }

    @GetMapping(path="email")
    public void triggerMail() throws MessagingException {
        emailSenderService.sendSimpleEmail("mohamedhedi1hamdi@gmail.com",
                "this is the email body",
                "this is the email subject");

        emailSenderService.sendEmailwithAttachment("mohamedhedi1hamdi@gmail.com","this is the email body","this is the email subject","C:/Users/Mohamed/Downloads/Espacecitoyen.pdf");
    }
    @GetMapping(path = "confirmation")
    public void confirmToken(@RequestBody String a){

       userService.confirmUser(a);
    }



}
