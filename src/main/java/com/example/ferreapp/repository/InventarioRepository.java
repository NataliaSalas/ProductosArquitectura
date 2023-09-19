package com.example.ferreapp.repository;

import com.example.ferreapp.entity.Cliente;
import com.example.ferreapp.entity.Inventario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class InventarioRepository {
    @Autowired
    private InventarioCrudRepository inventarioCrudRepository;

    public List<Inventario> findAll() {
        return (List<Inventario>) inventarioCrudRepository.findAll();
    }

    public Optional<Inventario> findById(Long id) {
        return inventarioCrudRepository.findById(id);
    }

    public <S extends Inventario> S save(S inventario) {
        return inventarioCrudRepository.save(inventario);
    }

    public boolean deleteById(Long id) {
        Optional<Inventario> c=findById(id);
        if (c.isPresent()){
            inventarioCrudRepository.deleteById(id);
            return true;
        }

        return false;
    }
}
