package com.example.processus_backend.notification;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Notificaiton {
   @Id
   @SequenceGenerator(
           name = "notification_sequence",
           sequenceName = "notification_sequence",
           allocationSize = 1
   )
   @GeneratedValue(
           strategy = GenerationType.SEQUENCE,
           generator = "notification_sequence"
   )
   private Long idNotification ;
   private String message ;
   private String userEmail ;
   private String date ;
}
