package com.revende.application.entrypoint.dto.ticket;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TicketDTO {

    @JsonProperty("user_id")
    private UUID userId;
    @JsonProperty("title")
    private String title;
    @JsonProperty("date")
    private LocalDate date;
    @JsonProperty("price")
    private BigDecimal price;
    @JsonProperty("description")
    private String description;
    @JsonProperty("contact")
    private String contact;
    @JsonProperty("type")
    private String type;
    @JsonProperty("image")
    private String image;
}
