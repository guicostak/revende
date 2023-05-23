package com.revende.domain.entities.builder;

import com.revende.adapter.persistence.entities.Ticket;
import com.revende.domain.entities.TicketEntity;

public class TicketBuilder {

    public static TicketEntity fromEntityToDomain(
            final Ticket entity
    ){
        if(entity == null) return null;

        return new TicketEntity()
                .setTicketId(entity.getTicketId())
                .setUserId(entity.getUserId())
                .setTitle(entity.getTitle())
                .setDate(entity.getDate())
                .setPrice(entity.getPrice())
                .setDescription(entity.getDescription())
                .setContact(entity.getContact())
                .setType(entity.getType())
                .setCategory(
                        CategoryBuilder.fromEntityToDomain(entity.getCategory())
                )
                .setImage(entity.getImage());
    }

    public static Ticket fromDomainToEntity(
            final TicketEntity domain
    ){
        if(domain == null) return null;

        return new Ticket()
                .setTicketId(domain.getTicketId())
                .setUserId(domain.getUserId())
                .setTitle(domain.getTitle())
                .setDate(domain.getDate())
                .setPrice(domain.getPrice())
                .setDescription(domain.getDescription())
                .setContact(domain.getContact())
                .setType(domain.getType())
                .setCategory(
                        CategoryBuilder.fromDomainToEntity(domain.getCategory())
                )
                .setImage(domain.getImage());
    }

}
