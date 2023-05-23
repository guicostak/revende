package com.revende.application.entrypoint.api;

import com.revende.adapter.endpoints.TicketEndpointAdapter;
import com.revende.application.entrypoint.dto.request.TicketDTO;
import com.revende.application.entrypoint.builder.CategoryDTOBuilder;
import com.revende.application.entrypoint.dto.response.CustomResponseBodyDTO;
import com.revende.domain.service.CategoryService;
import com.revende.adapter.persistence.entities.Category;
import com.revende.adapter.persistence.entities.Ticket;
import com.revende.domain.service.TicketService;
import com.revende.adapter.persistence.repositories.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/ticket")
public class TicketController {

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private TicketService ticketService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private TicketEndpointAdapter ticketEndpointAdapter;

    @PostMapping("/sell")
    public ResponseEntity<?> cadastrarIngresso(@RequestBody TicketDTO ticketDTO, HttpSession session) throws IOException {


        Ticket ticket = new Ticket(ticketDTO);

        categoryService.saveCategory(ticketDTO);

        Category category = CategoryDTOBuilder.toEntity(ticketDTO);
        ticket.setCategory(category);

        var result = ticketEndpointAdapter.postRegistrationTicket(ticketDTO, session);

        var response = new CustomResponseBodyDTO<TicketDTO>()
                .setData(result);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/latest")
    public ResponseEntity<List<TicketDTO>> getLatestTickets() {
        List<TicketDTO> latestTickets = ticketService.findLatestTickets();
        return ResponseEntity.ok(latestTickets);
    }
}
