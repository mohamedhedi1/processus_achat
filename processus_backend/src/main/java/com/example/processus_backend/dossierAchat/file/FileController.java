package com.example.processus_backend.dossierAchat.file;


import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
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
    @GetMapping("/filename/{fileId}")
    public String getFileName(@PathVariable Long fileId)
    {
        File file= fileRepository.getById(fileId);
        String fileName= file.getFilename();
        return fileName;
    }
    @GetMapping("/allFiles")
    public List<File> getAllFiles()
    {
        List<File> files = fileRepository.findAll();
        return files;
    }

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



    @PostMapping("/verif")
    public ResponseEntity<FileResponse> uploadFilewithVerif(@RequestParam("file") MultipartFile file, @RequestParam("titre") String titre,@RequestParam("objet") String objet,@RequestParam("type")String type){

        String fileName = fileStorageService.storeFile(file);
        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/files/")
                .path(fileName)
                .toUriString();
        System.out.println("Working Directory = " + System.getProperty("user.dir"));


        FileResponse fileResponse = new FileResponse(fileName, fileDownloadUri, file.getContentType(), file.getSize(),titre,objet);
        // added the post database file
        File file1 = new File();
        BeanUtils.copyProperties(fileResponse,file1);
        System.out.println("Working Directory = " + System.getProperty("user.dir"));

        fileRepository.save(file1);
        Boolean b=false ;
        System.out.println(type);
        if(type.equals("AED")){
            System.out.println("testing");
            b = file_verif_AED(fileName);
            System.out.println(b);
        }
        if(type.equals("CC")){
            System.out.println("testing");
            b = file_verif_CC(fileName);
            System.out.println(b);}
        if(type.equals("PROJET")){
            System.out.println("testing");
            b = file_verif_Projet(fileName);
            System.out.println(b);
        }
        if(b==false){
            fileResponse.setTitre("faux");
            return new ResponseEntity<FileResponse>(fileResponse,HttpStatus.OK);
        }


        return new ResponseEntity<FileResponse>(fileResponse,HttpStatus.OK);
    }
    public Boolean file_verif_CC(String fileName){
        int f= 0 ;
        String filepath="C:/uploads/"+fileName;
        try {
            java.io.File file_test= new java.io.File(filepath);

            PDDocument document = PDDocument.load(file_test);
            System.out.println(file_test);

            //Instantiate PDFTextStripper class



            PDFTextStripper pdfStripper = new PDFTextStripper();

            //Retrieving text from PDF document
            String text = pdfStripper.getText(document);
            List<String> check = List.of("SOMMAIRE", "HISTORIQUE DU DOSSIER",  "Réception Semestrielle", "ESTIMATION DU BUDGET ", "CONTENU DE L’OFFRE TECHNIQUE ", "CAHIER DES PRESCRIPTIONS TECHNIQUES");
            String cout = "Coût annuel";
            for(int i=0 ;i<check.size();i++) {
                System.out.println(i);
                if(text.contains(check.get(i))){

                    f+=1;
                };

            }
            //System.out.println(text);
            //Closing the document
            // document.save("src/main/resources/t.pdf");
            document.close();}
        catch (IOException e) {
            e.printStackTrace();

        }
        if (f==6 ){
            return  true ;
        }

        else {
            return  false ;
        }

    }
    public Boolean file_verif_AED(String fileName){
        int f= 0 ;
        String filepath="C:/uploads/"+fileName;
        try {
            java.io.File file_test= new java.io.File(filepath);

            PDDocument document = PDDocument.load(file_test);
            System.out.println(file_test);

            //Instantiate PDFTextStripper class



            PDFTextStripper pdfStripper = new PDFTextStripper();

            //Retrieving text from PDF document
            String text = pdfStripper.getText(document);
            List<String> check = List.of("Budget d'investissement", "Numéro " ,"d’investissement:",  "Sujet ","d’investissement", "Somme Total");
            String cout = "Coût annuel";
            for(int i=0 ;i<check.size();i++) {
                System.out.println(i);
                if(text.contains(check.get(i))){

                    f+=1;
                };

            }
            //System.out.println(text);
            //Closing the document
            // document.save("src/main/resources/t.pdf");
            document.close();}
        catch (IOException e) {
            e.printStackTrace();

        }
        if (f==6 ){
            return  true ;
        }

        else {
            return  false ;
        }

    }
    public Boolean file_verif_Projet(String fileName){
        int f= 0 ;
        String filepath="C:/uploads/"+fileName;
        try {
            java.io.File file_test= new java.io.File(filepath);

            PDDocument document = PDDocument.load(file_test);
            System.out.println(file_test);

            //Instantiate PDFTextStripper class



            PDFTextStripper pdfStripper = new PDFTextStripper();

            //Retrieving text from PDF document
            String text = pdfStripper.getText(document);
            List<String> check = List.of("Fiche du projet : "," Intitulé :",  "Cout estimatif :","Opportunité :", "Type d’investissement :","Composantes du projet :");
            String cout = "Coût annuel";
            for(int i=0 ;i<check.size();i++) {
                System.out.println(i);
                if(text.contains(check.get(i))){

                    f+=1;
                };

            }
            //System.out.println(text);
            //Closing the document
            // document.save("src/main/resources/t.pdf");
            document.close();}
        catch (IOException e) {
            e.printStackTrace();

        }
        if (f==6 ){
            return  true ;
        }

        else {
            return  false ;
        }

    }



}