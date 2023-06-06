package com.revende.rest.builder;

import com.revende.rest.endpoints.dto.request.TicketDTO;
import com.revende.domain.entities.Ticket;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class TicketDTOBuilder {

    public TicketDTO toDTO(Ticket ticket) {
        TicketDTO ticketDTO = new TicketDTO();
        BeanUtils.copyProperties(ticket, ticketDTO);
        ticketDTO.setImage(Arrays.toString(ticket.getImage()));
        return ticketDTO;
    }

    public Ticket toEntity(TicketDTO ticketDTO) {
        Ticket ticket = new Ticket();
        BeanUtils.copyProperties(ticketDTO, ticket);
        ticket.setImage(ticketDTO.getImage().getBytes());
        return ticket;
    }
}

