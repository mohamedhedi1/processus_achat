package com.example.processus_backend.dossierAchat.file;

public class FileResponse {

    private String filename;
    private String fileDownloadUri;
    private String fileType;
    private long size;
    private String titre;
    private String objet;
    public FileResponse(String filename, String fileDownloadUri, String fileType, long size) {
        super();
        this.filename = filename;
        this.fileDownloadUri = fileDownloadUri;
        this.fileType = fileType;
        this.size = size;
    }
    public String getFilename() {
        return filename;
    }
    public void setFilename(String filename) {
        this.filename = filename;
    }
    public String getFileDownloadUri() {
        return fileDownloadUri;
    }
    public void setFileDownloadUri(String fileDownloadUri) {
        this.fileDownloadUri = fileDownloadUri;
    }
    public String getFileType() {
        return fileType;
    }
    public void setFileType(String fileType) {
        this.fileType = fileType;
    }
    public long getSize() {
        return size;
    }
    public void setSize(long size) {
        this.size = size;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public void setObjet(String objet) {
        this.objet = objet;
    }

    public String getTitre() {
        return titre;
    }

    public String getObjet() {
        return objet;
    }

    public FileResponse(String filename, String fileDownloadUri, String fileType, long size, String titre, String objet) {
        this.filename = filename;
        this.fileDownloadUri = fileDownloadUri;
        this.fileType = fileType;
        this.size = size;
        this.titre = titre;
        this.objet = objet;
    }
}