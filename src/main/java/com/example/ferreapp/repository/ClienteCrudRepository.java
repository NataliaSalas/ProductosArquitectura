package com.example.ferreapp.repository;

import com.example.ferreapp.entity.Cliente;
import org.springframework.data.repository.CrudRepository;

public interface ClienteCrudRepository extends CrudRepository<Cliente, Long> {
}
