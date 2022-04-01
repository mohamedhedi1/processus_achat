package com.example.processus_backend.Structure;

import com.example.processus_backend.security.config.AppPermission.AppPermission;

import com.example.processus_backend.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Structure {
    @Id
    @SequenceGenerator(
            name = "structure_sequence",
            sequenceName = "structure_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "structure_sequence"
    )

    private Long structureId;
    private String name  ;
    @ManyToMany(
            fetch = FetchType.LAZY
    )
    @JoinTable(
            name="app_permission_structure_map",
            joinColumns = @JoinColumn(
                    name = "structureId",
                    referencedColumnName = "structureId"
            ),
            inverseJoinColumns = @JoinColumn(
                    name = "appPermissionId",
                    referencedColumnName = "appPermissionId"
            )

    )
    private List<AppPermission> appPermission;
    private String abrivation ;
    @OneToMany(
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER
    )
    @JoinColumn(
            name="structureId",
            referencedColumnName = "structureId"
    )

    private Set<User> userList=new HashSet<User>();

    public void addUserToStructure(User user){

        if(this.userList==null){
            this.userList=new HashSet<User>();
        }
        this.userList.add(user);
    }

    public void addUsersToStructure(List<User> users) {
        if(this.userList==null){
            this.userList=new HashSet<User>();
        }
        this.userList.addAll(userList);
    }

    public void deleteUsers(List<User> users) {
        userList.removeAll(users);
    }
}
