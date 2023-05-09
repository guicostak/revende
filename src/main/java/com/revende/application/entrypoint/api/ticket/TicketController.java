package com.revende.application.entrypoint.api.ticket;

import com.revende.application.entrypoint.dto.ticket.TicketDTO;
import com.revende.model.entities.Ticket;
import com.revende.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.UUID;

@RestController
@RequestMapping("/ticket")
public class TicketController {

    @Autowired
    private TicketRepository ticketRepository;

    @PostMapping("/sell")
    public ResponseEntity<Void> cadastrarIngresso(@RequestBody TicketDTO ticketDTO, HttpSession session) throws IOException {

        UUID userId = (UUID) session.getAttribute("id");

        ticketDTO.setUserId(userId);

        Ticket ticket = new Ticket(ticketDTO);

        ticketRepository.save(ticket);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
