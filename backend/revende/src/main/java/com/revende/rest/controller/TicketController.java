package com.revende.rest.controller;

import com.revende.domain.entities.user.User;
import com.revende.rest.dto.request.TicketRequestDTO;
import com.revende.rest.dto.response.CustomResponseBodyDTO;
import com.revende.services.ticket.TicketService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    private final TicketService ticketService;
    private static final Logger logger = LoggerFactory.getLogger(TicketController.class);

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerTicket(@RequestBody TicketRequestDTO ticketRequestDTO) {

        logger.info("m=registerTicket stg=init. Iniciando processo de cadastro de ingressos");

        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            final var userId = ((User) authentication.getPrincipal()).getId();

            final var result = ticketService.saveTicket(ticketRequestDTO, userId);

            final var response = new CustomResponseBodyDTO<TicketRequestDTO>()
                    .setData(result);

            logger.info("m=cadastrarIngresso stg=sucess. Ingresso cadastrado com sucesso");

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (RuntimeException e) {
            logger.error("m=registerTicket stg=error Error ao tentar cadastrar ingresso. Error {}", e);
            return ResponseEntity.internalServerError().body(e);
        }
    }

    @GetMapping("/tickets")
    public ResponseEntity<?> findTickets(@RequestParam final String title,
                                         @RequestParam(defaultValue = "0") final int page,
                                         @RequestParam(defaultValue = "10") final int size
    ) {

        logger.info("m=findTicketsByTitle stg=init. Iniciando processo de cadastro de ingressos");

        try {
            Pageable pageable = PageRequest.of(page, size);

            final var tickets = ticketService.getTickets(title, pageable);

            final var response = new CustomResponseBodyDTO<>().setData(tickets);

            logger.info("m=findTicketsByTitle stg=sucess. Lista de ingressos relacionados por nome retornada");

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("m=findTicketsByTitle stg=error Error ao tentar recuperar a lista de ingressos. Error {}", e);
            return ResponseEntity.internalServerError().body(e);
        }
    }
}
