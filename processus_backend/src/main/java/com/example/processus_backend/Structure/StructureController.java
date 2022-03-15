package com.example.processus_backend.Structure;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.util.List;

@RestController
@RequestMapping(path = "api/structure")
public class StructureController {
    @Autowired
    private final StructureService structureService;
    public StructureController(StructureService structureService) {
        this.structureService = structureService;
    }
    @GetMapping
    public List<Structure> getAllStructure(){
        return structureService.getAllStructures();
    }
    @PostMapping(path = "addStructure")
    public void addStructure(@RequestBody StructureRequest structureRequest){
        Structure structure= Structure.builder()
                .name(structureRequest.getName())
                .role(structureRequest.getRole())
                .abrivation(structureRequest.getAbrivation())
                .build();
        structureService.addStructure(structure,structureRequest.getEmails());

    }
    @PutMapping(path= "updateStructure/{id}")
    public void updateStructure(@RequestBody StructureRequest structureRequest, @PathVariable("id") Long id){
        structureService.updateStructure(structureRequest,id);

    }
    @PutMapping(path = "addUsersToStructure/")
    public void addUsersToStructure(@RequestParam List<String> emails,@RequestParam("name")String name){
        structureService.addUsersToStructure(emails,name);

    }
    @DeleteMapping(path = "deleteUsersFromStructure/")
    public void deleteUsersToStructure(@RequestParam List<String> emails,@PathParam("name")String name) {
       structureService.deleteUsersFromStructure(name,emails);
    }
    @DeleteMapping(path = "deleteStructure/")
    public void deleteUsersToStructure(@PathParam("id")Long id) {
        structureService.deleteStructure(id);
    }
    @GetMapping(path="structureAndId")
    public List<StructureNameAndID> getAllStructureIdAndName(){

        return structureService.getStructureNameAndId();
    }


}
