package com.example.processus_backend.Structure;

import com.example.processus_backend.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

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
    private String role ;
    private  String abrivation ;
    @OneToMany(
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER
    )
    @JoinColumn(
            name="structureId",
            referencedColumnName = "structureId"
    )
    private List<User> userList;
    public void addUserToStructure(User user){
        userList.add(user);
    }

    public void addUsersToStructure(List<User> users) {
        userList.addAll(users);
    }

    public void deleteUsers(List<User> users) {
        userList.removeAll(users);
    }
}
