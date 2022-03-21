package com.example.processus_backend.Structure;

import com.example.processus_backend.security.config.AppRole.AppRole;
import com.example.processus_backend.security.config.AppRole.AppRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.util.List;
@CrossOrigin(origins= "http://localhost:3000")
@RestController
@RequestMapping(path = "api/structure")
public class StructureController {
    @Autowired
    private final StructureService structureService;
    private final AppRoleService appRoleService;
    public StructureController(StructureService structureService, AppRoleService appRoleService) {
        this.structureService = structureService;
        this.appRoleService = appRoleService;
    }
    @GetMapping
    public List<StructureTableRow> getAllStructure(){

        List<Structure> structures = structureService.getAllStructures();
        List<StructureTableRow> structureTableRows=structures.stream().map(structure -> {
            List<String> e=structure.getUserList().stream().map(user -> {
                return  user.getEmail();}).toList();
            return StructureTableRow.builder()
                    .id(structure.getStructureId())
                    .abrivation(structure.getAbrivation())
                    .role(structure.getRole().getName())
                    .name(structure.getName())
                    .emails(e)
                    .build();

        }).toList();
       return  structureTableRows ;
    }
    @PostMapping(path = "addStructure")
    public void addStructure(@RequestBody StructureRequest structureRequest){
        AppRole appRole=appRoleService.getByName(structureRequest.getRole());
        Structure structure= Structure.builder()
                .name(structureRequest.getName())
                .role(appRole)
                .abrivation(structureRequest.getAbrivation())
                .build();
        structureService.addStructure(structure,structureRequest.getEmails());

    }
    @PutMapping(path= "updateStructure")
    public void updateStructure(@RequestBody StructureTableRow s){
        structureService.updateStructure(s);

    }
    @PutMapping(path = "addUsersToStructure/")
    public void addUsersToStructure(@RequestParam List<String> emails,@RequestParam("name")String name){
        structureService.addUsersToStructure(emails,name);

    }
    @DeleteMapping(path = "deleteUsersFromStructure/")
    public void deleteUsersToStructure(@RequestParam List<String> emails,@PathParam("name")String name) {
       structureService.deleteUsersFromStructure(name,emails);
    }
    @DeleteMapping(path = "/{id}")
    public void deleteUsersToStructure(@PathVariable("id")Long id) {
        structureService.deleteStructure(id);
    }
    @GetMapping(path="structureAndId")
    public List<StructureNameAndID> getAllStructureIdAndName(){

        return structureService.getStructureNameAndId();
    }


}
