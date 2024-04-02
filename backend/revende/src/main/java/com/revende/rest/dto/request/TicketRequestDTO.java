package com.revende.rest.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.revende.domain.enums.CategoryEnum;
import com.revende.domain.enums.TicketTypeEnum;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TicketRequestDTO {
    @JsonProperty("category")
    private CategoryEnum category;
    @JsonProperty("user_id")
    private UUID userId;
    @JsonProperty("ticket_id")
    private Integer ticketId;
    @JsonProperty("title")
    private String title;
    @JsonProperty("date")
    private LocalDate date;
    @JsonProperty("event_place")
    private String eventPlace;
    @JsonProperty("type")
    private TicketTypeEnum type;
    @JsonProperty("image")
    private String image;
    @JsonProperty("description")
    private String description;
    @JsonProperty("price")
    private BigDecimal price;
}
