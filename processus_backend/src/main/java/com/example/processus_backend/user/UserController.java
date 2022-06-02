package com.example.processus_backend.user;

import com.example.processus_backend.Structure.Structure;
import com.example.processus_backend.Structure.StructureRepository;
import com.example.processus_backend.Structure.StructureService;
import com.example.processus_backend.commission.Commission;
import com.example.processus_backend.commission.CommissionRepository;
import com.example.processus_backend.security.PasswordEncoder;
import com.example.processus_backend.security.config.AppPermission.AppPermission;
import com.example.processus_backend.security.config.AppPermission.AppPermissionService;

import com.example.processus_backend.user.AccountReset.PasswordResetService;
import com.example.processus_backend.user.delteledUser.DuserRepository;
import com.example.processus_backend.user.emailSender.EmailSenderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins= "http://localhost:3000")
@RestController
@RequestMapping(path = "api/v1/user")
public class UserController {
    private  final PasswordResetService passwordResetService;
    private  final  UserRepository userRepository;
    private final DuserRepository duserRepository ;
    private final StructureService structureService ;
    private final UserService userService;
    private  final CommissionRepository commissionRepository ;
    private  final PasswordEncoder passwordEncoder;
   private  final AppPermissionService appPermissionService;
    private  final StructureRepository structureRepository;
    private final EmailSenderService emailSenderService;
    @Autowired
    public UserController(PasswordResetService passwordResetService, UserRepository userRepository, DuserRepository duserRepository, StructureService structureService, UserService userService, CommissionRepository commissionRepository, PasswordEncoder passwordEncoder, AppPermissionService appPermissionService, StructureRepository structureRepository, EmailSenderService emailSenderService) {
        this.passwordResetService = passwordResetService;
        this.userRepository = userRepository;
        this.duserRepository = duserRepository;
        this.structureService = structureService;
        this.userService = userService;
        this.commissionRepository = commissionRepository;
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
                .enabled(true)
                .locked(false)
                .password(passwordEncoder.bCryptPasswordEncoder().encode("admin"))
                .structure(s)
                .build();
        String token = userService.signUpUser(user);
        String link = "http://localhost:8080/api/v1/user/confirm?token=" + token;
        String n=userRequest.getFirstName()+" "+userRequest.getLastName();
        System.out.print("sendin mail");
        try {
            emailSenderService.sendSimpleEmail("jihed.garaouch@istic.ucar.tn",link,n,"f");
        } catch (MessagingException e) {
            e.printStackTrace();
        }

        //send mail
    }
    @GetMapping(path="/reset/{email}")
    public  void reset(@PathVariable("email")String email) throws MessagingException {
        String token = passwordResetService.save(email);
        String s=email+"&token="+token;
        emailSenderService.sendResetEmail("jihed.garaouch@istic.ucar.tn","",s,"f");

    }
    @GetMapping(path="/newpass/{email}/{token}/{p}")
    public  void reset(@PathVariable("email")String email,@PathVariable("token") String token,@PathVariable("p")String p) {
       Boolean b =passwordResetService.find(email,token)  ;

       User u=userRepository.getByEmail(email);
       u.setPassword(passwordEncoder.bCryptPasswordEncoder().encode(p));
       userRepository.save(u);



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
    @Transactional
    public UserAuth get__(Authentication authentication){
        User u =userRepository.getByEmail(authentication.getName());
        Structure s =structureRepository.findByname(u.getStructure().getName());
        List<Long> privelages2 = s.getAppPermission().stream().map(a ->{
            return  a.getAppPermissionId();
        }).collect(Collectors.toList());
        List<Long> privelages = u.getAppPermission().stream().map(a ->{
            return  a.getAppPermissionId();
        }).collect(Collectors.toList());
        privelages.addAll(privelages2);

       UserAuth user=UserAuth.builder()
                .email(authentication.getName())
                .privelages(privelages)
                .build();

       return  user ;
    }
    @GetMapping(path = "navbar")
    public List<NavbarItem> getStructurePrivelageByemail(Authentication authentication){
        User u =userRepository.getByEmail(authentication.getName());
        Structure s =structureRepository.findByname(u.getStructure().getName());
        List<PrivelageObjet> permisssion=s.getAppPermission().stream().map(
                appPermission -> {
                    PrivelageObjet p=PrivelageObjet.builder()
                            .link("/activite"+ appPermission.getAppPermissionId().toString())
                            .privelages(appPermission.getPermission())
                            .build();
                    return p;
                }
        ).collect(Collectors.toList());

        List<NavbarItem> navbarItems=new ArrayList<NavbarItem>();
        NavbarItem navbarItem= NavbarItem.builder()
                .name(s.getName())
                .privelages(permisssion)
                .build();
        List<PrivelageObjet> permisssion1=u.getAppPermission().stream().map(
                appPermission -> {
                    PrivelageObjet p=PrivelageObjet.builder()
                            .link("/activite"+ appPermission.getAppPermissionId().toString())
                            .privelages(appPermission.getPermission())
                            .build();
                    return p;
                }
        ).collect(Collectors.toList());
        int size=permisssion1.size();
        Boolean t=false;

        for( int i=0 ;i<size;i++){
             String f=permisssion1.get(i).getPrivelages();
             System.out.print(f);
            if(f.equals("administrateur")){

                permisssion1.remove(i);
                PrivelageObjet p3=PrivelageObjet.builder()
                        .link("/users")
                        .privelages("utilisateurs")
                        .build();
                permisssion1.add(p3);
                PrivelageObjet p=PrivelageObjet.builder()
                        .link("/structure")
                        .privelages("structures")
                        .build();
                PrivelageObjet p1=PrivelageObjet.builder()
                        .link("/commission")
                        .privelages("commissions")
                        .build();
                permisssion1.add(p);
                permisssion1.add(p1);
                break;

            }

        }
        int size1=permisssion1.size();
        for( int i=0 ;i<size1;i++){
            String f=permisssion1.get(i).getPrivelages();
            System.out.print(f);
            if(f.equals("demandeur")){

                permisssion1.remove(i);
                PrivelageObjet p3=PrivelageObjet.builder()
                        .link("/demandeachatenregister")
                        .privelages("demandes achats enregistre")
                        .build();
                permisssion1.add(p3);
                PrivelageObjet p=PrivelageObjet.builder()
                        .link("/demandeachatenvoye")
                        .privelages("demandes achat envoyés")
                        .build();

                permisssion1.add(p);

                break;

            }

        }
        NavbarItem navbarItem0= NavbarItem.builder()
                .name(u.getFirstName() +' '+ u.getLastName())
                .privelages(permisssion1)
                .build();
        navbarItems.add(navbarItem0);
        navbarItems.add(navbarItem);
        List<Long> ids=commissionRepository.getALLCommissionByemail(u.getUserId());
        List<Commission> commissions=commissionRepository.findAllById(ids);
        List<NavbarItem> n= commissions.stream().map(commission -> {
            List<PrivelageObjet> permisssion_commission=commission.getAppPermission().stream().map(
                    appPermission -> {
                        PrivelageObjet p=PrivelageObjet.builder()
                                .link("/activite"+ appPermission.getAppPermissionId().toString())
                                .privelages(appPermission.getPermission())
                                .build();
                        return p;
                    }
            ).collect(Collectors.toList());

              NavbarItem navbarItem_commission= NavbarItem.builder()
                    .name(commission.getName())
                    .privelages(permisssion_commission)
                    .build();
              return navbarItem_commission;
                }
        ).collect(Collectors.toList());
        navbarItems.addAll(n);

        return  navbarItems;




    }
    @GetMapping(path = "structureDachat")
    public List<String> getUserinStructureAchat(){
        Structure s= structureRepository.findByname("Structure d'achat");
        if(s!=null){
        List<String> userList=s.getUserList().stream().map(u ->{
            return u.getEmail();
        }).collect(Collectors.toList());
        return  userList;
        }
        else{
            return null ;
        }
    }
    public List<String> getMembreDevaluation(){
       Commission s=commissionRepository.findByName("");
        List<String> userList=s.getUserList().stream().map(u ->{
            return u.getEmail();
        }).collect(Collectors.toList());
        return  userList;
    }
    @GetMapping(path = "navbar/{email}")
    public List<NavbarItem> getStructurePrivelageByemail(@PathVariable("email") String email){
        User u =userRepository.getByEmail(email);
        Structure s =structureRepository.findByname(u.getStructure().getName());
        List<PrivelageObjet> permisssion=s.getAppPermission().stream().map(
                appPermission -> {
                    PrivelageObjet p=PrivelageObjet.builder()
                            .link("/activite"+ appPermission.getAppPermissionId().toString())
                            .privelages(appPermission.getPermission())
                            .icon("feather icon-user")
                            .build();
                    return p;
                }
        ).collect(Collectors.toList());
        if(s.getName().equals("Structure d'achat")){
            PrivelageObjet p10=PrivelageObjet.builder()
                    .link("/stat")
                    .privelages("statistique")
                    .icon("feather icon-user")
                    .build();
            permisssion.add(p10);

        }

        List<NavbarItem> navbarItems=new ArrayList<NavbarItem>();
        NavbarItem navbarItem= NavbarItem.builder()
                .name(s.getName())
                .privelages(permisssion)
                .build();
        List<PrivelageObjet> permisssion1=u.getAppPermission().stream().map(
                appPermission -> {
                    PrivelageObjet p=PrivelageObjet.builder()
                            .link("/activite"+ appPermission.getAppPermissionId().toString())
                            .privelages(appPermission.getPermission())
                            .icon("feather icon-arrow-right")
                            .build();
                    return p;
                }
        ).collect(Collectors.toList());
        int size=permisssion1.size();
        Boolean t=false;

        for( int i=0 ;i<size;i++){
            String f=permisssion1.get(i).getPrivelages();
            System.out.print(f);
            if(f.equals("administrateur")){

                permisssion1.remove(i);
                PrivelageObjet p3=PrivelageObjet.builder()
                        .link("/users")
                        .privelages("utilisateurs")
                        .icon("feather icon-user")
                        .build();
                permisssion1.add(p3);
                PrivelageObjet p=PrivelageObjet.builder()
                        .link("/structure")
                        .privelages("structures")
                        .icon("feather icon-users")
                        .build();
                PrivelageObjet p1=PrivelageObjet.builder()
                        .link("/commission")
                        .privelages("commissions")
                        .icon("feather icon-briefcase")
                        .build();
                permisssion1.add(p);
                permisssion1.add(p1);
                break;

            }

        }
        int size1=permisssion1.size();
        for( int i=0 ;i<size1;i++){
            String f=permisssion1.get(i).getPrivelages();
            System.out.print(f);
            if(f.equals("demandeur")){

                permisssion1.remove(i);
                PrivelageObjet p3=PrivelageObjet.builder()
                        .link("/demandeachatenregister")
                        .privelages("demandes achats enregistre")
                        .icon("feather icon-save")
                        .build();
                permisssion1.add(p3);
                PrivelageObjet p=PrivelageObjet.builder()
                        .link("/demandeachatenvoye")
                        .privelages("demandes achat envoyés")
                        .icon("feather icon-upload")
                        .build();

                permisssion1.add(p);

                break;

            }

        }
        NavbarItem navbarItem0= NavbarItem.builder()
                .name(u.getFirstName() +' '+ u.getLastName())
                .privelages(permisssion1)
                .build();
        navbarItems.add(navbarItem0);
        navbarItems.add(navbarItem);
        List<Long> ids=commissionRepository.getALLCommissionByemail(u.getUserId());
        List<Commission> commissions=commissionRepository.findAllById(ids);
        List<NavbarItem> n= commissions.stream().map(commission -> {
                    List<PrivelageObjet> permisssion_commission=commission.getAppPermission().stream().map(
                            appPermission -> {
                                PrivelageObjet p=PrivelageObjet.builder()
                                        .link("/activite"+ appPermission.getAppPermissionId().toString())
                                        .privelages(appPermission.getPermission())
                                        .build();
                                return p;
                            }
                    ).collect(Collectors.toList());

                    NavbarItem navbarItem_commission= NavbarItem.builder()
                            .name(commission.getName())
                            .privelages(permisssion_commission)
                            .build();
                    return navbarItem_commission;
                }
        ).collect(Collectors.toList());
        navbarItems.addAll(n);

        return  navbarItems;




    }




}
