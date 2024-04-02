package com.revende.rest.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.revende.domain.entities.user.User;
import lombok.Data;

@Data
public class UserRequestDTO {

    @JsonProperty("name")
    private String name;
    @JsonProperty("email")
    private String email;

    @JsonProperty("cpf")
    private String cpf;

    @JsonProperty("phone_number")
    private String phoneNumber;
    @JsonProperty("current_password")
    private String currentPassword;

    @JsonProperty("new_password")
    private String newPassword;

    public void applyTo(User usuario) {
        if (cpf != null) {
            usuario.setCpf(cpf);
        }

        if (name != null) {
            usuario.setName(name);
        }

        if (email != null) {
            usuario.setEmail(email);
        }

        if (newPassword != null) {
            usuario.setPassword(newPassword);
        }

        if (phoneNumber != null) {
            usuario.setPhoneNumber(phoneNumber);
        }
    }
}
