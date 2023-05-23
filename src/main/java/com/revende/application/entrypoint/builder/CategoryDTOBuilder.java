package com.revende.application.entrypoint.builder;

import com.revende.application.entrypoint.dto.request.TicketDTO;
import com.revende.adapter.persistence.entities.Category;
import org.springframework.stereotype.Component;

@Component
public class CategoryDTOBuilder {

    public static Category toEntity(TicketDTO ticketDTO) {

        return Category.builder()
                .categoryId(ticketDTO.getCategory().getId())
                .categoryName(ticketDTO.getCategory().getName())
                .build();
    }
}
