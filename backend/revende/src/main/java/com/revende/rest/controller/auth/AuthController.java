package com.revende.rest.controller.auth;

import com.fasterxml.uuid.Generators;
import com.revende.infrastructure.config.security.JwtTokenProvider;
import com.revende.repositories.UserRepository;
import com.revende.rest.dto.request.LoginRequestDTO;
import com.revende.rest.dto.request.RefreshTokenRequestDTO;
import com.revende.rest.dto.response.MessageDTO;
import com.revende.rest.dto.response.TokenResponseDTO;
import com.revende.services.user.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final HashMap<String, String> refreshTokens = new HashMap<String, String>();
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository users;

    private final UserService userService;

    public AuthController(AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider, UserRepository users, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.users = users;
        this.userService = userService;
    }

    @PostMapping("/token")
    public ResponseEntity<?> getRefreshToken(@RequestBody @Valid RefreshTokenRequestDTO data) {

        Map<Object, Object> model = new HashMap<>();
        String username = data.getEmail();
        String refreshToken = data.getRefreshToken();

        if (refreshTokens.get(refreshToken) == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        if (refreshTokens.get(refreshToken).equals(username)) {
            String token = jwtTokenProvider.createToken(username, this.users.findByEmail(username).orElseThrow(() ->
                    new UsernameNotFoundException("Usuário " + username + "não encontrado")).getAuthorities());

            model.put("token", token);
            model.put("expires", jwtTokenProvider.getExpirationDate(token));
            return ok(model);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid LoginRequestDTO data) {

        try {

            final var userData = userService.findByEmail(data.getEmail());

            if(userData == null){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado");
            }

            if(!userService.isEmailConfirmed(data.getEmail())){
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Confirme o email antes de seguir com o login");
            }

            final var name = userData.getName();
            final var id = userData.getId();
            final var username = data.getEmail();

            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, data.getPassword()));
            String token = jwtTokenProvider.createToken(username, this.users.findByEmail(username)
                    .orElseThrow(() ->
                            new UsernameNotFoundException("Usuário " + username + "não encontrado")).getAuthorities());

            UUID refreshToken = Generators.randomBasedGenerator().generate();

            refreshTokens.put(refreshToken.toString(), username);

            final var responseToken = new TokenResponseDTO(
                    token, name, id, refreshToken, username, jwtTokenProvider.getExpirationDate(token));

            return ResponseEntity.ok(responseToken);
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new MessageDTO("E-mail ou senha inválidos"));
        }
    }
}
