package com.revende.services.ticket;

import com.revende.domain.entities.Ticket;
import com.revende.repositories.TicketRepository;
import com.revende.repositories.UserRepository;
import com.revende.rest.dto.request.TicketRequestDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class TicketServiceImpl implements TicketService {

    private final TicketRepository ticketRepository;

    private final UserRepository userRepository;

    private TicketServiceImpl(TicketRepository ticketRepository, UserRepository userRepository) {
        this.ticketRepository = ticketRepository;
        this.userRepository = userRepository;
    }

    @Override
    public TicketRequestDTO saveTicket(
            final TicketRequestDTO ticketRequestDTO, final UUID id) {

        final var ticket = createTicket(ticketRequestDTO, id);

        if (ticket == null) {
            return null;
        }

        ticketRepository.save(ticket);

        return ticketRequestDTO;
    }

    private Ticket createTicket(final TicketRequestDTO ticketRequestDTO, final UUID id) {

        final var user = userRepository.findById(id);

        if (user.isEmpty()) {
            return null;
        }

        ticketRequestDTO.setUserId(id);

        return new Ticket()
                .setTitle(ticketRequestDTO.getTitle())
                .setUserId(ticketRequestDTO.getUserId())
                .setDate(ticketRequestDTO.getDate())
                .setEventPlace(ticketRequestDTO.getEventPlace())
                .setSellerEmail(user.get().getEmail())
                .setSellerPhoneNumber(user.get().getPhoneNumber())
                .setPrice(ticketRequestDTO.getPrice())
                .setDescription(ticketRequestDTO.getDescription())
                .setType(ticketRequestDTO.getType().toString())
                .setCategory(ticketRequestDTO.getCategory().getName())
                .setImage(ticketRequestDTO.getImage().getBytes());
    }

    @Override
    public Page<Ticket> getTickets(String title, Pageable pageable) {

        return ticketRepository.findByTitleContaining(title, pageable);
    }
}

