package com.example.ferreapp.controller;

import com.example.ferreapp.entity.Cliente;
import com.example.ferreapp.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // Siempre va en el controlador esta etiqueta
@RequestMapping("/api/cliente") //esta apuntando a la direccion api/games
public class ClienteController {
    @Autowired //Lo inicializa el Game Service
    private ClienteService clienteService;

    //Que me extariga todos en un archivo json
    @GetMapping("/all")
    public List<Cliente> getAll(){
        return clienteService.getAll();
    }

    //Recibe un game via json y nos lo va a guardar
    @PostMapping("/save")
    public Cliente save(@RequestBody Cliente g){
        return clienteService.save(g);
    }

    @DeleteMapping("/delete/{id}")
    public boolean delete(@PathVariable("id") Long myID) {return clienteService.delete(myID);}

}
