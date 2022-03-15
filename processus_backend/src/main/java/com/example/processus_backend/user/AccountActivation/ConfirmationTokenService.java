package com.example.processus_backend.user.AccountActivation;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@AllArgsConstructor
public class ConfirmationTokenService {
    private final ConfirmationTokenRepository confirmationTokenRepository;

    public void saveConfirmationToken(ConfirmationToken token) {


        confirmationTokenRepository.save(token);
    }

    public ConfirmationToken getToken(String token) {
        ConfirmationToken token1= confirmationTokenRepository.findByToken(token);
        System.out.print(token1);
        return  token1;
    }

    public int setConfirmedAt(String token) {
        return confirmationTokenRepository.updateConfirmedAt(
                token, LocalDateTime.now());
    }
}