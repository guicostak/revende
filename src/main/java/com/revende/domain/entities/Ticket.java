package com.revende.domain.entities;

import com.revende.rest.endpoints.dto.request.TicketDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import javax.persistence.*;
import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Base64;
import java.util.UUID;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "ticket")
@Accessors(chain = true)
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ticket_id")
    private UUID ticketId;
    @Column(name = "user_id", nullable = false)
    private UUID userId;
    @Column(name = "title", nullable = false)
    private String title;
    @Column(name = "date", nullable = false)
    private LocalDate date;
    @Column(name = "price", nullable = false)
    private BigDecimal price;
    @Column(name = "description", nullable = false)
    private String description;
    @Column(name = "contact", nullable = false)
    private String contact;
    @Column(name = "type", nullable = false)
    private String type;
    @ManyToOne
    private Category category;
    @Column(name = "image", columnDefinition = "bytea")
    private byte[] image;

    public Ticket(TicketDTO ticketDTO) throws IOException {
        this.userId = ticketDTO.getUserId();
        this.ticketId = getTicketId();
        this.title = ticketDTO.getTitle();
        this.date = ticketDTO.getDate();
        this.price = ticketDTO.getPrice();
        this.description = ticketDTO.getDescription();
        this.contact = ticketDTO.getContact();
        this.type = ticketDTO.getType();
        this.image = Base64.getDecoder().decode(ticketDTO.getImage().split(",")[1]);
    }
}
