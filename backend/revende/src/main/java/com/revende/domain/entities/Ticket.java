package com.revende.domain.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tickets")
@Accessors(chain = true)
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ticket_id")
    private Integer ticketId;
    @Column(name = "user_id", nullable = false)
    private UUID userId;
    @Column(name = "title", nullable = false)
    private String title;
    @Column(name = "date", nullable = false)
    private LocalDate date;
    @Column(name = "event_place", nullable = false)
    private String eventPlace;
    @Column(name = "price", nullable = false)
    private BigDecimal price;
    @Column(name = "description", nullable = false)
    private String description;
    @Column(name = "seller_phone_number", nullable = false)
    private String sellerPhoneNumber;
    @Column(name = "seller_email", nullable = false)
    private String sellerEmail;
    @Column(name = "type", nullable = false)
    private String type;
    @Column(name = "category", nullable = false)
    private String category;
    @Column(name = "image", columnDefinition = "bytea")
    private byte[] image;
}
