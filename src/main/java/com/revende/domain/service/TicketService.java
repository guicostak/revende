package com.revende.domain.service;

import com.revende.adapter.persistence.entities.Ticket;
import com.revende.adapter.persistence.repositories.TicketRepository;
import com.revende.application.entrypoint.builder.TicketDTOBuilder;
import com.revende.application.entrypoint.dto.request.TicketDTO;
import com.revende.domain.entities.CategoryTypeIdentification;
import com.revende.domain.entities.TicketEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;

    @Autowired
    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    public TicketEntity createTicket(
            CategoryTypeIdentification categoryTypeIdentification,
            TicketDTO ticketDTO
    ){
        final var ticket = new TicketEntity();

        ticket
                .setTicketId(ticketDTO.getTicketId())
                .setUserId(ticketDTO.getUserId())
                .setTitle(ticketDTO.getTitle())
                .setDate(ticketDTO.getDate())
                .setPrice(ticketDTO.getPrice())
                .setDescription(ticketDTO.getDescription())
                .setContact(ticketDTO.getContact())
                .setType(ticketDTO.getType())
                .setCategory(categoryTypeIdentification)
                .setImage(ticketDTO.getImage().getBytes());

        return ticket;
    }

    public List<TicketDTO> findLatestTickets() {
        List<Ticket> tickets = ticketRepository.findTop10ByOrderByDateDesc();
        return tickets.stream().map(TicketDTOBuilder::toDTO).collect(Collectors.toList());
    }
}

