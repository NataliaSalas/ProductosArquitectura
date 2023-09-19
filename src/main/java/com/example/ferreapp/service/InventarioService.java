package com.example.ferreapp.service;

import com.example.ferreapp.entity.Inventario;
import com.example.ferreapp.repository.InventarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InventarioService {
    @Autowired
    private InventarioRepository inventarioRepository;
    public List<Inventario> getAll(){
        return inventarioRepository.findAll();
    }

    public Inventario save(Inventario inventario){
        return inventarioRepository.save(inventario);
    }

    public boolean delete(Long id){return inventarioRepository.deleteById(id);}

    public Inventario get(Long id){
        Optional<Inventario> g=inventarioRepository.findById(id);
        if(g.isPresent()){
            return g.get();
        }else{
            Inventario rta=new Inventario();
            rta.setNombre("Paila!");
            return rta;
        }

    }
}
