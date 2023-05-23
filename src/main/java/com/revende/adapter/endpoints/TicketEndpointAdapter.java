package com.revende.adapter.endpoints;

import com.revende.adapter.persistence.TicketRepositoryAdapter;
import com.revende.application.entrypoint.builder.TicketDTOBuilder;
import com.revende.application.entrypoint.dto.request.TicketDTO;
import com.revende.application.entrypoint.dto.request.enums.CategoryIdentificationEnum;
import com.revende.domain.entities.CategoryTypeIdentification;
import com.revende.domain.entities.builder.TicketBuilder;
import com.revende.domain.service.TicketService;
import com.revende.infrastructure.annotations.Adapter;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.http.HttpSession;
import java.util.UUID;

@Adapter
public class TicketEndpointAdapter {

    @Autowired
    private TicketService ticketService;

    @Autowired
    private TicketRepositoryAdapter ticketRepositoryAdapter;

    public TicketDTO postRegistrationTicket(
            final TicketDTO ticketDTO, final HttpSession session
            ){

        UUID userId = (UUID) session.getAttribute("id");

        ticketDTO.setUserId(userId);

        final var categoryIdentification = new CategoryTypeIdentification()
                .setCategoryId(ticketDTO.getCategory().getId())
                .setCategoryName(ticketDTO.getCategory().getName());

        final var createTicket =
                ticketService.createTicket(categoryIdentification, ticketDTO);

        var ticketEntity = TicketBuilder.fromDomainToEntity(createTicket);

        ticketEntity = ticketRepositoryAdapter.save(ticketEntity);

        return ticketDTO;

    }
}
