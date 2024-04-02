package com.revende.services.user;

import com.revende.domain.entities.user.User;
import com.revende.exception.BusinessException;
import com.revende.repositories.UserRepository;
import com.revende.rest.dto.request.RegisterDTO;
import com.revende.rest.dto.request.UserRequestDTO;
import com.revende.rest.dto.response.UserResponseDTO;
import com.revende.services.email.EmailService;
import com.revende.services.email.enums.EmailType;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.io.IOException;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final EmailService emailService;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, EmailService emailService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }

    @Override
    public User registerUser(RegisterDTO registerDTO, String confirmationToken) throws MessagingException, IOException {

        if (this.userRepository.existsUserByEmailOrCpf(registerDTO.getEmail(), registerDTO.getCpf())) {
            throw new BusinessException("Usuário já está cadastrado");
        }

        final var encryptedPassword = new BCryptPasswordEncoder().encode(registerDTO.getPassword());
        final var user = new User(registerDTO, encryptedPassword, confirmationToken);
        final var saveUser = userRepository.save(user);

        emailService.sendEmail(registerDTO.getEmail(), EmailType.EMAIL_CONFIRMATION.toString());

        return saveUser;
    }

    @Override
    public User updateUser(final UserRequestDTO data, final String id) {

        final var user = userRepository.findById(UUID.fromString(id));

        if (user.isEmpty()) {
            return null;
        }

        if (data.getCurrentPassword() != null && !passwordEncoder.matches(data.getCurrentPassword(), user.get().getPassword())) {
            throw new BusinessException("A senha informada é diferente da senha atual");
        }

        data.applyTo(user.get());

        return userRepository.save(user.get());
    }

    @Override
    public UserResponseDTO findUser(UUID id) {

        final var user = userRepository.findById(id);

        return user.map(value -> new UserResponseDTO()
                .setName(value.getName())
                .setEmail(value.getEmail())
                .setCpf(value.getCpf())
                .setPhoneNumber(value.getPhoneNumber())).orElse(null);

    }

    @Override
    public User findByEmail(String email) {
        final var user = userRepository.findByEmail(email);

        return user.orElse(null);
    }

    @Override
    public boolean confirmEmail(String confirmationToken) {
        final var user = userRepository.findByConfirmationToken(confirmationToken);

        if (user.isEmpty()) {
            throw new BusinessException("Usuário não encontrado");
        }

        if (this.isEmailConfirmed(user.get().getEmail())) {
            throw new BusinessException("Email já foi confirmado anteriormente");
        }

        user.get().setEmailConfirmed(true);
        userRepository.save(user.get());

        return true;
    }

    @Override
    public boolean isEmailConfirmed(String email) {

        final var user = userRepository.findByEmail(email);

        return user.get().isEmailConfirmed();
    }
}
