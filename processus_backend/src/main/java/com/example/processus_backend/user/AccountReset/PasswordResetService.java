package com.example.processus_backend.user.AccountReset;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;
@Service
public class PasswordResetService {
    private final PasswordResetRepository passwordResetRepository;
    @Autowired
    public PasswordResetService(PasswordResetRepository passwordResetRepository) {
        this.passwordResetRepository = passwordResetRepository;
    }
    public String  save(String email ){
        int leftLimit = 97; // letter 'a'
        int rightLimit = 122; // letter 'z'
        int targetStringLength = 10;
        Random random = new Random();

        String generatedString = random.ints(leftLimit, rightLimit + 1)
                .limit(targetStringLength)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();
        PasswordReset p =PasswordReset.builder()
                .email(email)
                .Token(generatedString)
                .build();
        passwordResetRepository.save(p);
        return  generatedString ;

    }
    public Boolean  find(String email,String token ){
       List<PasswordReset> all= passwordResetRepository.findAll();
       int index_delete= 0 ;
        int s = all.size();
        for (int i = 0 ;i<s;i++){
            PasswordReset p=all.get(i);
            if((p.getToken().equals(token))&&(p.getEmail()==email)){
                return true;
            }
        }
        return false ;
    }
}
