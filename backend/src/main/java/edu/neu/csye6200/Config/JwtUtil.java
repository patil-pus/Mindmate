package edu.neu.csye6200.Config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

//generate tokens after registration
@Component
public class JwtUtil {

    //private SecretKey SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private SecretKey SECRET_KEY;

    @Value("${jwt.secret}")
    public void setSecretKey(String secret) {
        byte[] decodedKey = Base64.getDecoder().decode(secret);
        this.SECRET_KEY = Keys.hmacShaKeyFor(decodedKey);
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
    }
    public Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public String generateToken(String username) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, username);
    }

    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // Token validity 10 hours
                .signWith(SECRET_KEY)
                .compact();
    }
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username =extractUsernameFromToken( extractUsername(token) );

        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
    public String extractUsernameFromToken(String user){
        if(user.isEmpty() || user.isBlank()) return null;
        return user.split("::")[0];
    }

    public String extractRoleFromToken(String user){
        if(user.isEmpty() || user.isBlank()) return null;
        return user.split("::")[1];
    }
}