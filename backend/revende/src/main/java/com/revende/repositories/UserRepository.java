package com.revende.repositories;

import com.revende.domain.entities.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    Optional<User> findByEmail(String email);
    boolean existsUserByEmailOrCpf(String email, String cpf);

    Optional<User> findByConfirmationToken(String confirmationToken);
}
