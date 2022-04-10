package com.example.processus_backend.dossierAchat.approuvation.file;

import com.example.processus_backend.dossierAchat.approuvation.dossier.Approuvation_dossier_Request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("approuvationFile")
@CrossOrigin("*")
public class ApprouvationFileController {

    private  final ApprouvationFileService approuvationFileService;
     @Autowired
    public ApprouvationFileController(ApprouvationFileService approuvationFileService) {
        this.approuvationFileService = approuvationFileService;
    }

    @PostMapping(path = "add")
        public void add(@RequestBody  Approuvation_file_Request approuvation_file_request){
            approuvationFileService.add(approuvation_file_request);
        }


}
