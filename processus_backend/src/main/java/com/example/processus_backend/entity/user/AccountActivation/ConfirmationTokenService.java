package com.example.processus_backend.entity.user.AccountActivation;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ConfirmationTokenService {
    private final ConfirmationTokenRepository confirmationTokenRepository;

    public void saveConfirmationToken(ConfirmationToken token) {
        confirmationTokenRepository.save(token);
    }

    public Long getToken(String token) {
        ConfirmationToken token1= confirmationTokenRepository.findByToken(token);
        System.out.print(token1);
        Long n= token1.getUser().getUserId();
        System.out.print(n);
        return n;
    }

    public int setConfirmedAt(String token) {
        return confirmationTokenRepository.updateConfirmedAt(
                token, LocalDateTime.now());
    }
}