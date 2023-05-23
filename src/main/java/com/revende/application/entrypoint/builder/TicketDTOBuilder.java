package com.revende.application.entrypoint.builder;

import com.revende.application.entrypoint.dto.request.TicketDTO;
import com.revende.adapter.persistence.entities.Ticket;
import com.revende.application.entrypoint.dto.request.enums.CategoryIdentificationEnum;
import com.revende.domain.entities.TicketEntity;
import com.revende.domain.entities.builder.CategoryBuilder;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class TicketDTOBuilder {

    public static TicketDTO toDTO(Ticket ticket) {
        TicketDTO ticketDTO = new TicketDTO();
        BeanUtils.copyProperties(ticket, ticketDTO);
        ticketDTO.setImage(Arrays.toString(ticket.getImage()));
        return ticketDTO;
    }

    public static Ticket toEntity(TicketDTO ticketDTO) {
        Ticket ticket = new Ticket();
        BeanUtils.copyProperties(ticketDTO, ticket);
        ticket.setImage(ticketDTO.getImage().getBytes());
        return ticket;
    }

    public static TicketDTO fromDomainToDTO
            (final TicketEntity domain)
    {
        var dto = new TicketDTO();

        BeanUtils.copyProperties(domain, dto);

        CategoryIdentificationEnum categoryEnum = CategoryIdentificationEnum.valueOf(domain.getCategory().getCategoryName());
        dto.setCategory(categoryEnum);

        return dto;
    }
}

