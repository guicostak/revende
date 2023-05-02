package com.revende.model.entities;

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
@Table(name="ticket")
@Accessors(chain = true)
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    @Column(name="title", nullable = false)
    private String title;
    @Column(name="date", nullable = false)
    private LocalDate date;
    @Column(name ="price", nullable = false)
    private BigDecimal price;
    @Column(name="description", nullable = false)
    private String description;
    @Column(name="contact", nullable = false, unique = true)
    private String contact;
    @Column(name="type", nullable = false)
    private String type;
    @Lob
    @Column(name="image", nullable = false)
    private Byte [] image;
}
