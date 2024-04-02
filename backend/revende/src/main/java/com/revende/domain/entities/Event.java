package com.revende.domain.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.UUID;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "event_id")
    private Long id;
    @Column(name = "title", nullable = false)
    private String title;
    @Column(name = "event_banner_url")
    private String image;
    @Column(name = "address", nullable = false)
    private String address;
    @Column(name = "description", nullable = false)
    private String description;
    @Column(name = "date", nullable = false)
    private LocalDate date;
}
