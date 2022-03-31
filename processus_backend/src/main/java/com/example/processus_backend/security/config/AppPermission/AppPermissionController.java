package com.example.processus_backend.security.config.AppPermission;

import com.example.processus_backend.Structure.Structure;
import com.example.processus_backend.Structure.StructureRepository;
import com.example.processus_backend.commission.Commission;
import com.example.processus_backend.commission.CommissionRepository;
import com.example.processus_backend.user.User;
import com.example.processus_backend.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins= "http://localhost:3000")
@RestController
@RequestMapping(path = "api/v1/appPermission")
public class AppPermissionController {
    private  final  AppPermissionService appPermissionService;
    private  final AppPermissionRepository appPermissionRepository;
    private final StructureRepository structureRepository;
    private final UserRepository userRepository ;
    private  final CommissionRepository commissionRepository;
    @Autowired

    public AppPermissionController(AppPermissionService appPermissionService, AppPermissionRepository appPermissionRepository, StructureRepository structureRepository, UserRepository userRepository, CommissionRepository commissionRepository) {
        this.appPermissionService = appPermissionService;
        this.appPermissionRepository = appPermissionRepository;
        this.structureRepository = structureRepository;
        this.userRepository = userRepository;
        this.commissionRepository = commissionRepository;
    }
    @GetMapping
    public List<AppPermission> getAll(){
        return  appPermissionService.getAll();
    }
    @GetMapping(path = "structure/{Id}")
    public List<Long> getPermissionStructure(@PathVariable  Long Id){
        return  appPermissionRepository.findIdPermissionBYIdStructure(Id);

    }
    @GetMapping(path = "commission/{Id}")
    public List<Long> getPermissionCommission(@PathVariable  Long Id){
          return appPermissionRepository.findIdPermissionBYIdcomission(Id);

    }
    @GetMapping(path = "user/{Id}")
    public List<Long> getPermissionUser(@PathVariable  Long Id){
          return  appPermissionRepository.findIdPermissionBYIdUser(Id);
    }

    @PutMapping(path = "structure/{Id}")
    public void updatePermissionStructure(@PathVariable  Long Id,@RequestBody List<Long> ids){
        Structure s =structureRepository.findBySturctureId(Id);
        List<AppPermission> allById = appPermissionRepository.findAllById(ids);
        s.setAppPermissions(allById);
        structureRepository.save(s);


    }
    @PutMapping(path = "commission/{Id}")
    public void updatePermissionCommission(@PathVariable  Long Id,@RequestBody List<Long> ids){
        Commission s =commissionRepository.getById(Id);
        List<AppPermission> allById = appPermissionRepository.findAllById(ids);
        s.setAppPermissions(allById);
        commissionRepository.save(s);

    }
    @PutMapping(path = "user/{Id}")
    public void updatePermissionUser(@PathVariable  Long Id,@RequestBody List<Long> ids){
            User s =userRepository.getById(Id);
            List<AppPermission> allById = appPermissionRepository.findAllById(ids);
            s.setAppPermissions(allById);
            userRepository.save(s);
    }
}
