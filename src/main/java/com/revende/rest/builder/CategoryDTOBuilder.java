package com.revende.rest.builder;

import com.revende.rest.endpoints.dto.request.TicketDTO;
import com.revende.domain.entities.Category;
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
