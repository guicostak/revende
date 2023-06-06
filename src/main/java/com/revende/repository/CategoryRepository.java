package com.revende.repository;

import com.revende.domain.entities.Category;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;


@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer>{
}
