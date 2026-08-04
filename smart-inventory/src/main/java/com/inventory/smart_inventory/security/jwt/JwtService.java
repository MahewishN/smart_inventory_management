package com.inventory.smart_inventory.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    @Value("${app.jwt.secret}")
    private String secretKey;

    @Value("${app.jwt.expiration}")
    private long jwtExpiration;

    //Generate JWT token
    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    //Generate JWT token with additional claims

    public String generateToken(
            Map<String, Object> extraClaims,
            UserDetails userDetails
    ) {

        return Jwts.builder()
                .claims(extraClaims)
                .subject(userDetails.getUsername())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + jwtExpiration))
                .signWith(getSigningKey())
                .compact();

    }

    //Extract email (username)
     public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    //Extract expiration date
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    //Generic claim extractor
    public <T> T extractClaim(
            String token,
            Function<Claims, T> claimsResolver
    ) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    //Validate JWT token
    public boolean isTokenValid(
            String token,
            UserDetails userDetails
    ) {

        final String username = extractUsername(token);

        return username.equals(userDetails.getUsername())
                && !isTokenExpired(token);
    }

    //Check if token expired
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    //Read all JWT claims
    private Claims extractAllClaims(String token) {

        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }


    //Create signing key
    private SecretKey getSigningKey() {

        return Keys.hmacShaKeyFor(secretKey.getBytes());

//        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
//        return Keys.hmacShaKeyFor(keyBytes);

    }
}