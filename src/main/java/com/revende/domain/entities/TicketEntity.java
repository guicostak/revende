package com.revende.domain.entities;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
@Accessors(chain = true)
public class TicketEntity {
    private UUID ticketId;
    private UUID userId;
    private String title;

    private LocalDate date;

    private BigDecimal price;

    private String description;

    private String contact;

    private String type;

    private CategoryTypeIdentification category;

    private byte[] image;

}
