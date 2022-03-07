package com.example.processus_backend.security.config;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

@Configuration
@EnableWebSecurity
public class AppSecurityConfig extends WebSecurityConfigurerAdapter {
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AppSecurityConfig(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }
    @Override
    protected void configure(HttpSecurity http) throws Exception{
        http
                .csrf().disable()
                .authorizeRequests()
                //.antMatchers(HttpMethod.POST,"/api/v1/course").hasRole("ADMIN")
                .antMatchers(HttpMethod.POST,"/api/v1/user/default")
                .permitAll()
                //.antMatchers(HttpMethod.POST,"/api/v1/student").hasRole("ADMIN")
                .anyRequest()
                .authenticated()
                .and()
                .formLogin();
    }

  /*  @Override
    @Bean
    protected UserDetailsService userDetailsService()
    {
        UserDetails hedi = User.builder()
                .username("hedi")
                .password(passwordEncoder.encode("0000"))
                .roles("ADMIN")
                .build();
        System.out.println("Hedi= "+hedi.getUsername()+" "+hedi.getPassword());
        return new InMemoryUserDetailsManager(
                hedi
        );
    }*/



}
