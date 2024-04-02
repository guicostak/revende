package com.revende.domain.entities.user;


import com.revende.rest.dto.request.RegisterDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Users")
@Accessors(chain = true)
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    @Column(name = "name", nullable = false)
    private String name;
    @Column(name = "email", nullable = false)
    private String email;
    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;
    @Column(name = "senha", nullable = false)
    private String password;
    @Column(name = "cpf", nullable = false, unique = true)
    private String cpf;
    @Column(name = "confirmation_token", nullable = false, unique = true)
    private String confirmationToken;
    @Column(name = "email_confirmed", nullable = false, unique = true)
    private boolean emailConfirmed;

    private UserRole role;

    public User(RegisterDTO registerDTO, String password, String confirmationToken) {
        this.email = registerDTO.getEmail();
        this.phoneNumber = registerDTO.getPhoneNumber();
        this.password = password;
        this.role = registerDTO.getRole();
        this.name = registerDTO.getName();
        this.cpf = registerDTO.getCpf();
        this.confirmationToken = confirmationToken;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (this.role == UserRole.ADMIN) {
            return List.of(new SimpleGrantedAuthority("ROLE_ADMIN"),
                    new SimpleGrantedAuthority("ROLE_USER"));
        } else return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
