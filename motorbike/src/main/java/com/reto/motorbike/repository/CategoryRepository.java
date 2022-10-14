package com.reto.motorbike.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.reto.motorbike.model.Category;
import com.reto.motorbike.repository.crud.CategoryCrudRepositoryInterfaz;

@Repository
public class CategoryRepository {

    @Autowired
    private CategoryCrudRepositoryInterfaz categoryCrudRepositoryInterfaz;

    public List<Category> obtenerCategoryCompleta() {
        return (List<Category>) categoryCrudRepositoryInterfaz.findAll();
    }

    public Optional<Category> obtenerCategoryId(Integer id) {
        return categoryCrudRepositoryInterfaz.findById(id);
    }

    public Category salvarCategory(Category category) {
        return categoryCrudRepositoryInterfaz.save(category);
    }

    public void delete(Category category) {
        categoryCrudRepositoryInterfaz.delete(category);
    }
}
