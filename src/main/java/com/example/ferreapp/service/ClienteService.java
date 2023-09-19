package com.example.ferreapp.service;

import com.example.ferreapp.entity.Cliente;
import com.example.ferreapp.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {
    @Autowired
    private ClienteRepository clienteRepository;
    public List<Cliente> getAll(){
        return clienteRepository.findAll();
    }

    public Cliente save(Cliente cliente){
        return clienteRepository.save(cliente);
    }

    public boolean delete(Long id){return clienteRepository.deleteById(id);}

    public Cliente get(Long id){
        Optional<Cliente> g=clienteRepository.findById(id);
        if(g.isPresent()){
            return g.get();
        }else{
            Cliente rta=new Cliente();
            rta.setNombreEmpresa("Paila!");
            return rta;
        }

    }
}
