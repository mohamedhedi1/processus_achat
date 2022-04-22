package com.example.processus_backend.notification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@CrossOrigin(origins= "http://localhost:3000")
@RestController
@RequestMapping(path="/notification")
public class NotificationController {
    private  final NotificationRepository notificationRepository;
    @Autowired
    public NotificationController(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }
    @GetMapping(path = "{email}")
    public boolean get_notificaiton(@PathVariable("email") String email){

        Notificaiton t= notificationRepository.findByuser(email);

        if(t==null){

            return false ;
        }
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
        Date date = new Date();
        String d=new SimpleDateFormat("dd/MM/yyyy").format(date);
        Date date1= null;
        Date date2= null;
        try {
            date1 = new SimpleDateFormat("dd/MM/yyyy").parse(t.getDate());
            date2= new SimpleDateFormat("dd/MM/yyyy").parse(d);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        if(date2.after(date1)){
            notificationRepository.delete(t);
            return true;
        }
        System.out.print("test");
        notificationRepository.delete(t);
        return false ;

    }


}
