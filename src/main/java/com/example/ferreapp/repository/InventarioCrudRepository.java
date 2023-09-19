package com.example.ferreapp.repository;

import com.example.ferreapp.entity.Inventario;
import org.springframework.data.repository.CrudRepository;

public interface InventarioCrudRepository extends CrudRepository<Inventario, Long> {
}
