package com.revende.services.ticket;

import com.revende.domain.entities.Ticket;
import com.revende.rest.dto.request.TicketRequestDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface TicketService {

    TicketRequestDTO saveTicket(final TicketRequestDTO ticketRequestDTO, final UUID id);
    Page<Ticket> getTickets(final String title, final Pageable pageable);

}
