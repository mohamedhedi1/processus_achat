package com.example.processus_backend.commission;


import com.example.processus_backend.security.config.AppPermission.AppPermission;
import com.example.processus_backend.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Commission {
    @Id
    @SequenceGenerator(
            name = "commission_sequence",
            sequenceName = "commission_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "commission_sequence"
    )
    private Long commissionId;
    private String name  ;
    @ManyToMany(
            fetch = FetchType.EAGER
    )
    @JoinTable(
            name="app_permission_commission_map",
            joinColumns = @JoinColumn(
                    name = "commissionId",
                    referencedColumnName = "commissionId"
            ),
            inverseJoinColumns = @JoinColumn(
                    name = "appPermissionId",
                    referencedColumnName = "appPermissionId"
            )

    )
    private List<AppPermission> appPermission;
    private LocalDate dateOfCreation;
    private String type;
    private  String abrivation ;
    @ManyToMany(
            fetch = FetchType.EAGER
    )
    @JoinTable(
            name="commission_user_map",
            joinColumns = @JoinColumn(
                    name = "commissionId",
                    referencedColumnName = "commissionId"
            ),
            inverseJoinColumns = @JoinColumn(
                    name = "userId",
                    referencedColumnName = "userId"
            )

    )
    private Set<User> userList=new HashSet<User>();
    public void addUser(User user) {
        if(this.userList==null){
            this.userList=new HashSet<User>();
        }
        this.userList.add(user);
    }
    public void addUsers(List<User> userList) {
        if(this.userList==null){
            this.userList=new HashSet<User>();
        }
        this.userList.addAll(userList);
    }
    public void deleteUser(User user) {
        this.userList.remove(user);
    }
    public void deleteUsers(List<User> userList) {
        this.userList.removeAll(userList);
    }
}
