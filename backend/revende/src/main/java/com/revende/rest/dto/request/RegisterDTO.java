package com.revende.rest.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.revende.domain.entities.user.UserRole;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class RegisterDTO {

    @JsonProperty("name")
    private String name;
    @JsonProperty("email")
    private String email;
    @JsonProperty("phone_number")
    private String phoneNumber;
    @JsonProperty("password")
    private String password;
    @JsonProperty("cpf")
    private String cpf;
    @JsonProperty("role")
    private UserRole role;
}
