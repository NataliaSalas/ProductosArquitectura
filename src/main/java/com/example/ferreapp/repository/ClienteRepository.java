package com.example.ferreapp.repository;

import com.example.ferreapp.entity.Cliente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class ClienteRepository {
    @Autowired
    private ClienteCrudRepository clienteCrudRepository;

    public List<Cliente> findAll() {
        return (List<Cliente>) clienteCrudRepository.findAll();
    }

    public Optional<Cliente> findById(Long id) {
        return clienteCrudRepository.findById(id);
    }

    public <S extends Cliente> S save(S cliente) {
        return clienteCrudRepository.save(cliente);
    }

    public boolean deleteById(Long id) {
        Optional<Cliente> c=findById(id);
        if (c.isPresent()){
            clienteCrudRepository.deleteById(id);
            return true;
        }

        return false;
    }

}
