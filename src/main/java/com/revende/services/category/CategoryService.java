package com.revende.services.category;

import com.revende.rest.endpoints.dto.request.TicketDTO;
import com.revende.rest.builder.CategoryDTOBuilder;
import com.revende.domain.entities.Category;
import com.revende.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public Category saveCategory(TicketDTO ticketDTO) {
        Category category = CategoryDTOBuilder.toEntity(ticketDTO);

        return categoryRepository.save(category);
    }
}
