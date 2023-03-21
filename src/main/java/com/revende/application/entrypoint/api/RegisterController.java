package com.revende.application.entrypoint.api;


import com.revende.model.entities.Client;
import com.revende.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/register")
public class RegisterController {

    @Autowired
    private ClientRepository clientRepository;

    @PostMapping
    public ResponseEntity<Client> saveClient(@RequestBody Client client){
        clientRepository.save(client);

        return ResponseEntity.ok(client);
    }
}
