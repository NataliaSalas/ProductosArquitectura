package com.example.ferreapp.controller;

import com.example.ferreapp.entity.Inventario;
import com.example.ferreapp.service.InventarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // Siempre va en el controlador esta etiqueta
@RequestMapping("/api/inventario") //esta apuntando a la direccion api/inventario
public class InventarioController {
    @Autowired //Lo inicializa el Game Service
    private InventarioService inventarioService;

    //Que me extariga todos en un archivo json
    @GetMapping("/all")
    public List<Inventario> getAll(){
        return inventarioService.getAll();
    }

    //Recibe un game via json y nos lo va a guardar
    @PostMapping("/save")
    public Inventario save(@RequestBody Inventario g){
        return inventarioService.save(g);
    }

    @DeleteMapping("/delete/{id}")
    public boolean delete(@PathVariable("id") Long myID) {return inventarioService.delete(myID);}

    @GetMapping("/findById/{id}")
    public Inventario findById(@PathVariable("id") Long myID){
        return inventarioService.get(myID);
    }

}
