package com.revende.application.entrypoint.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginDTO {

    @JsonProperty("email")
    private String email;
    @JsonProperty("password")
    private String password;
}
