package com.example.processus_backend.commission;

import com.example.processus_backend.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

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
    private String role ;
    private LocalDate dateOfCreation;
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
    private List<User> userList;
    public void addUser(User user) {
        if(this.userList==null){
            this.userList=new ArrayList<User>();
        }
        this.userList.add(user);
    }
    public void addUsers(List<User> userList) {
        if(this.userList==null){
            this.userList=new ArrayList<User>();
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
