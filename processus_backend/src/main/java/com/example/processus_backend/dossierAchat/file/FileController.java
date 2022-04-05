package com.example.processus_backend.dossierAchat.file;


import java.io.IOException;
import java.time.LocalDate;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping("files")
@CrossOrigin("*")
public class FileController {
    @Autowired
    private final FileRepository fileRepository;

    @Autowired
    private FileStorageService fileStorageService;

    public FileController(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }

    /*
    @PutMapping
    public ResponseEntity<FileResponse> uploadFile(@RequestParam("file") MultipartFile file){
        String fileName = fileStorageService.storeFile(file);
        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/files/")
                .path(fileName)
                .toUriString();

        FileResponse fileResponse = new FileResponse(fileName, fileDownloadUri, file.getContentType(), file.getSize());
        // added the post database file
        File file1 = new File();
        BeanUtils.copyProperties(fileResponse,file1);
        fileRepository.save(file1);



        return new ResponseEntity<FileResponse>(fileResponse,HttpStatus.OK);
    }*/

    @GetMapping("/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName,HttpServletRequest request){

        Resource resource = fileStorageService.loadFileAsResource(fileName);

        String contentType = null;

        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        }catch(IOException ex) {
            System.out.println("Could not determine fileType");
        }

        if(contentType==null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .body(resource);
    }
    @PostMapping
    public ResponseEntity<FileResponse> uploadFile(@RequestParam("file") MultipartFile file, @RequestParam("titre") String titre,@RequestParam("objet") String objet){

        String fileName = fileStorageService.storeFile(file);
        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/files/")
                .path(fileName)
                .toUriString();

        FileResponse fileResponse = new FileResponse(fileName, fileDownloadUri, file.getContentType(), file.getSize(),titre,objet);
        // added the post database file
        File file1 = new File();
        BeanUtils.copyProperties(fileResponse,file1);

        fileRepository.save(file1);



        return new ResponseEntity<FileResponse>(fileResponse,HttpStatus.OK);
    }





}