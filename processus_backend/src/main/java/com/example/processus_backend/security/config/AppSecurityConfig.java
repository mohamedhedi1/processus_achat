package com.example.processus_backend.security.config;

import com.example.processus_backend.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins= "http://localhost:3000")
@Configuration
@EnableWebSecurity
public class AppSecurityConfig extends WebSecurityConfigurerAdapter {
    private final PasswordEncoder passwordEncoder;
    private  final UserService userService;
    @Autowired
    public AppSecurityConfig(PasswordEncoder passwordEncoder, UserService userService) {
        this.passwordEncoder = passwordEncoder;
        this.userService = userService;
    }
    @Override
    protected void configure(HttpSecurity http) throws Exception{
        http
                .cors()
                .and()
                .csrf().disable()
                .authorizeRequests()
                //.antMatchers(HttpMethod.POST,"/api/v1/course").hasRole("ADMIN")
                .antMatchers(HttpMethod.POST,"/api/v1/user/default")
                .permitAll()
                .antMatchers("/**")
                .permitAll()
                //.antMatchers(HttpMethod.POST,"/api/v1/student").hasRole("ADMIN")
                .anyRequest()
                .authenticated()
                .and()
                .formLogin()
                .defaultSuccessUrl("/yes")

        ;
    }
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(daoAuthenticationProvider());
    }
    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider() {
        DaoAuthenticationProvider provider =
                new DaoAuthenticationProvider();
        provider.setPasswordEncoder(passwordEncoder);
        provider.setUserDetailsService(userService);
        return provider;
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
