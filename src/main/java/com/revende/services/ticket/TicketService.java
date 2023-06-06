package com.revende.services.ticket;

import com.revende.domain.entities.Ticket;
import com.revende.repository.TicketRepository;
import com.revende.rest.builder.TicketDTOBuilder;
import com.revende.rest.endpoints.dto.request.TicketDTO;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;

    @Autowired
    private TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    @Autowired
    private TicketDTOBuilder ticketDTOBuilder;

    public List<TicketDTO> findLatestTickets() {
        List<Ticket> tickets = ticketRepository.findTop10ByOrderByDateDesc();
        return tickets.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public List<TicketDTO> getRelatedTickets(UUID ticketId) {
        Ticket selectedTicket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new NoSuchElementException("Ticket not found"));

        String category = selectedTicket.getCategory().getCategoryName();
        LocalDate date = selectedTicket.getDate();
        String eventType = selectedTicket.getType();

        List<Ticket> relatedTicketEntities = ticketRepository.findRelatedTicketsByCategoryAndDateAndType(category, date, eventType);

        List<TicketDTO> relatedTickets = relatedTicketEntities.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());

        return relatedTickets;
    }

    public TicketDTO postRegistrationTicket(
            final TicketDTO ticketDTO, final HttpSession session
    ){

        UUID userId = (UUID) session.getAttribute("id");

        ticketDTO.setUserId(userId);

        var ticketEntity = ticketDTOBuilder.toEntity(ticketDTO);

        ticketRepository.save(ticketEntity);

        return ticketDTO;

    }

    private TicketDTO convertToDto(Ticket ticket) {
        TicketDTO ticketDTO = new TicketDTO();
        BeanUtils.copyProperties(ticket, ticketDTO);
        ticketDTO.setImage(Arrays.toString(ticket.getImage()));
        return ticketDTO;
    }

}

