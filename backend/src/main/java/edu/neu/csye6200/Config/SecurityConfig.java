package edu.neu.csye6200.Config;

import edu.neu.csye6200.Services.ClientService;
import edu.neu.csye6200.Services.TherapistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private ClientService clientService;

    @Autowired
    private TherapistService therapistService;

    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(clientService);
        auth.userDetailsService(therapistService);
    }

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .cors() // Enable CORS configuration from WebMvcConfigurer
                .and()
                .csrf().disable()
                .authorizeRequests()
                // Public Endpoints
                .antMatchers("/api/clients/register", "/api/clients/login", "/api/therapists/register", "/api/therapists/login").permitAll()
                // Authenticated Endpoints
                .antMatchers(HttpMethod.GET, "/api/clients/**", "/api/therapists/**").authenticated()
                .antMatchers(HttpMethod.PUT, "/api/therapists/**").permitAll()
                // All other requests require authentication
                .anyRequest().authenticated()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        // Add JWT Request Filter
        httpSecurity.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}
