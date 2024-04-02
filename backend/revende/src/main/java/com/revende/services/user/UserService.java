package com.revende.services.user;

import com.revende.domain.entities.user.User;
import com.revende.rest.dto.request.RegisterDTO;
import com.revende.rest.dto.request.UserRequestDTO;
import com.revende.rest.dto.response.UserResponseDTO;

import javax.mail.MessagingException;
import java.io.IOException;
import java.util.UUID;

public interface UserService {

    User registerUser(final RegisterDTO registerDTO, final String confirmationToken) throws MessagingException, IOException;

    User updateUser(final UserRequestDTO userRequestDTO, final String id);

    UserResponseDTO findUser(final UUID id);

    User findByEmail(final String email);

    boolean confirmEmail(final String confirmationToken);

    boolean isEmailConfirmed(final String confirmationToken);
}
