package edu.neu.csye6200.Config;

import edu.neu.csye6200.Services.ClientService;
import edu.neu.csye6200.Services.TherapistService;
import edu.neu.csye6200.enums.UserType;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private ClientService clientService;

    @Autowired
    private TherapistService therapistService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        String jwt = null;
        String username = null;

        // Extract JWT token from cookies
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("token".equals(cookie.getName())) {
                    jwt = cookie.getValue();
                    break;
                }
            }
        }

        // Allow public paths without authentication
        String requestPath = request.getRequestURI();
        if (requestPath.equals("/api/clients/register") || requestPath.equals("/api/clients/login") ||
                requestPath.equals("/api/therapists/register") || requestPath.equals("/api/therapists/login")) {
            chain.doFilter(request, response);
            return;
        }

        // Process JWT if found in cookies
        if (jwt != null) {
            try {
                username = jwtUtil.extractUsername(jwt);
            } catch (ExpiredJwtException e) {
                System.out.println("JWT Token has expired");
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // Return 401 if token is expired
                return;
            } catch (MalformedJwtException e) {
                System.out.println("Invalid JWT token");
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // Return 401 for invalid token
                return;
            }
        }

        // If username is valid and security context is not yet authenticated
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            // extracting name and role type from format sh:client
            String extractedUsername= jwtUtil.extractUsernameFromToken(username);
            String extractedUserType=jwtUtil.extractRoleFromToken(username);;
            UserDetails userDetails ;
            // check if the role type
            if(UserType.THERAPIST.toString().equals(extractedUserType)){
                userDetails=this.therapistService.loadUserByUsername(extractedUsername);
            }else{
                userDetails = this.clientService.loadUserByUsername(extractedUsername);
                //(UserType.CLIENT.toString().equals(extractedUserType))
            }



            // Validate the JWT token against the user details
            if (jwtUtil.validateToken(jwt, userDetails)) {
                UsernamePasswordAuthenticationToken authenticationToken =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }
        }

        chain.doFilter(request, response);
    }
}
