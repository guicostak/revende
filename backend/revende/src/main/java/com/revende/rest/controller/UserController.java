package com.revende.rest.controller;

import com.revende.exception.BusinessException;
import com.revende.repositories.UserRepository;
import com.revende.rest.dto.request.RegisterDTO;
import com.revende.rest.dto.request.UserRequestDTO;
import com.revende.rest.dto.response.MessageDTO;
import com.revende.services.email.EmailService;
import com.revende.services.email.enums.EmailType;
import com.revende.services.user.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.io.IOException;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    private final EmailService emailService;

    private final UserRepository userRepository;

    public UserController(UserService userService, EmailService emailService, UserRepository userRepository) {
        this.userService = userService;
        this.emailService = emailService;
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid final RegisterDTO registerDTO)
            throws MessagingException, IOException {

        final var confirmationToken = UUID.randomUUID().toString();

        try {
            final var response = userService.registerUser(registerDTO, confirmationToken);

            return ResponseEntity.ok(response);

        } catch (BusinessException e) {

            return ResponseEntity.status(HttpStatus.CONFLICT).body(new MessageDTO(e.toString()));
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> updateUser(@RequestBody @Valid final UserRequestDTO userRequestDTO,
                                        @PathVariable final String id) {

        try {
            final var userUpdate = userService.updateUser(userRequestDTO, id);

            if (userUpdate == null) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok("Usuário atualizado com sucesso");
        } catch (BusinessException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUser(@PathVariable final UUID id) {

        try {
            final var response = userService.findUser(id);

            if (response == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado");
            }

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e);
        }
    }

    @GetMapping("/confirm/{token}")
    public ResponseEntity<String> confirmEmail(@PathVariable("token") final String token) {

        try {
            if (userService.confirmEmail(token)) {
                return ResponseEntity.status(HttpStatus.OK).body("Email confirmado com sucesso");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Token inválido");
            }
        } catch (BusinessException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.toString());
        }
    }

    @GetMapping("/resend_confirmation")
    public ResponseEntity<String> resendConfirmationEmail(@RequestParam("email") final String email) {
        final var user = userRepository.findByEmail(email);

        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("E-mail não encontrado.");
        }

        final var confirmationToken = UUID.randomUUID().toString();

        userRepository.save(user.get().setConfirmationToken(confirmationToken));

        try {
            emailService.sendEmail(email, EmailType.EMAIL_CONFIRMATION.toString());
            return ResponseEntity.ok("Novo link de confirmação enviado com sucesso.");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Erro ao enviar o novo link de confirmação");
        }
    }
}
